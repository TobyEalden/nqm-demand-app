import { Meteor } from "meteor/meteor";
import connectionManager from "../connection-manager";
import TDXApi from "nqm-api-tdx/client-api";

function loadScenario({folderId, basePopId}, onData) {
  const config = {
    commandHost: Meteor.settings.public.commandHost,
    queryHost: Meteor.settings.public.queryHost,
    accessToken: connectionManager.authToken
  };
  const api = new TDXApi(config);
  api.getDatasetData(basePopId, {year: {"$eq":"2016"}, age_band: {"$ne": "All Ages"}}, null, {limit: 50000}, (err, response) => {
    if (err) console.log("Failed to get base poplets: ", err);
    else {
      const initial = response.data;
      api.getDatasets({
        "parents": {
          "$in": [
            folderId
          ]
        },
        "schemaDefinition.basedOn": "PlanningPoplet"
      }, null, {limit: 1000}, (err, response) => {
        if (err) console.log(err);
        else {
          let builds = response;
          let planning = [];
          const loadBuild = (build) => {
            if (build) {
              api.getDatasetData(build.id, {age_band: {"$ne": "All Ages"}}, null, {limit: 5000}, (err, response) => {
                if (err) console.log("Failed to get build: ", err);
                else {
                  planning = planning.concat(response.data);
                  return loadBuild(builds.shift());
                }
              });
            }
            else {
              onData(null, {planning: planning, initial: initial});
            }
          };
          loadBuild(builds.shift());    
        }
      });
    }
  });
}

export default loadScenario;