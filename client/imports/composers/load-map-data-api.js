import connectionManager from "../connection-manager";
import { HTTP } from "meteor/http";
import {Meteor} from "meteor/meteor";

function loadMapData({mapId, mapFilter, options}, onData) {
  console.log(mapId);
  const headers = { authorization: "Bearer " + connectionManager.authToken };
  const url = Meteor.settings.public.queryURL + "datasets/" + mapId + "/data";
  HTTP.call("GET", url, { headers: headers, params: { opts: JSON.stringify(options), filter: JSON.stringify(mapFilter) }}, function(err, response) {
    if (err) {
      console.log("Failed to get data: ", err);
    } else {
      onData(null, {geoData: response.data.data});
    }
  });
}

export default loadMapData;