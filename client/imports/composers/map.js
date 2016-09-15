import connectionManager from "../connection-manager";
import { HTTP } from "meteor/http";
import {Meteor} from "meteor/meteor";


function loadMapData({mapId, mapFilter, options, filter, pipeline, resourceId, centre, wgtId, settings, update}, onData) {
  const headers = { authorization: "Bearer " + connectionManager.authToken };
  const url = Meteor.settings.public.queryURL + "datasets/" + mapId + "/data";


  HTTP.call("GET", url, { headers: headers, params: { opts: JSON.stringify(options), filter: JSON.stringify(mapFilter) }}, (err, response) => {
    if (err) {
      console.log("Failed to get data: ", err);
    } else {
      const agUrl = Meteor.settings.public.queryURL + "datasets/" + resourceId + "/aggregate";
      const queryOptions = { limit: 5000};
      const geoData = response.data.data;
        
      HTTP.call("GET", agUrl, { headers: headers, params: { opts: JSON.stringify(queryOptions), pipeline: pipeline }}, (err, response) => {
        if (err) {
          console.log("Failed to get data: ",err);
        } else {

          onData(null, {data: response.data.data, geoData: geoData});
        }
      });

    }
  });
}

export default loadMapData;