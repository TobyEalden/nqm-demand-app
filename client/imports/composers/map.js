import connectionManager from "../connection-manager";
import TDXApi from "nqm-api-tdx/client-api";
import {Meteor} from "meteor/meteor";


function loadMapData({mapId, mapFilter, options, filter, pipeline, resourceId, centre, wgtId, settings, update}, onData) {
  const config = {
    commandHost: Meteor.settings.public.commandHost,
    queryHost: Meteor.settings.public.queryHost,
    accessToken: connectionManager.authToken
  };
  const api = new TDXApi(config);
  api.getDatasetData(mapId, mapFilter, null, options, (err, response) => {
    if (err) console.log("Failed to get data: ", err);
    else {
      const geoData = response.data;
      api.getAggregateData(resourceId, pipeline, {limit: 5000}, (err, response) => {
        if (err) console.log("Failed to get data: ", err);
        else onData(null, {data: response.data, geoData: geoData});
      });
    }
  });
}

export default loadMapData;