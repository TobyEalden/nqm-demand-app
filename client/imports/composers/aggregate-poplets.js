import connectionManager from "../connection-manager";
import { HTTP } from "meteor/http";
import {Meteor} from "meteor/meteor";

function loadAggregate({resourceId, pipeline}, onData) {
  const headers = { authorization: "Bearer " + connectionManager.authToken };
  const url = Meteor.settings.public.queryURL + "datasets/" + resourceId + "/aggregate";
  const queryOptions = { limit: 5000};
    
  HTTP.call("GET", url, { headers: headers, params: { opts: JSON.stringify(queryOptions), pipeline: pipeline }}, function(err, response) {
    if (err) {
      console.log("Failed to get data: ",err);
    } else {
      console.log("Getting poplets");
      onData(null, {data: response.data.data});
    }
  });
}

export default loadAggregate;