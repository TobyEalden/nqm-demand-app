import connectionManager from "../connection-manager";
import { HTTP } from "meteor/http";
import {Meteor} from "meteor/meteor";

function loadResourceData({resourceId, filter, options}, onData) {
  const headers = { authorization: "Bearer " + connectionManager.authToken };
  const url = Meteor.settings.public.queryURL + "datasets/" + resourceId + "/data";
   
  HTTP.call("GET", url, { headers: headers, params: { opts: JSON.stringify(options), filter: JSON.stringify(filter) }}, function(err, response) {
    if (err) {
      console.log("Failed to get data: ",err);
    } else {
      onData(null, {data: response.data.data});
    }
  });
}

export default loadResourceData;



