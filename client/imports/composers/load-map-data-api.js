import connectionManager from "../connection-manager";
import { HTTP } from "meteor/http";
import {Meteor} from "meteor/meteor";

function loadMapData({mapId, filter, options}, onData) {
  const headers = { authorization: "Bearer " + connectionManager.authToken };
  const url = Meteor.settings.public.queryURL + "datasets/" + mapId + "/data";
  const x = Date.now();

    
  HTTP.call("GET", url, { headers: headers, params: { opts: JSON.stringify(options), filter: JSON.stringify(filter) }}, function(err, response) {
    if (err) {
      console.log("Failed to get data: ",err);
    } else {
      onData(null, {geoData: response.data.data})
      console.log(Date.now() - x);
    }
  });
}

export default loadMapData;