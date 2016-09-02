import connectionManager from "../connection-manager";
import { HTTP } from 'meteor/http'

function loadAggregate({resourceId, pipeline}, onData) {
  const headers = { authorization: "Bearer " + connectionManager.authToken };
  const url = Meteor.settings.public.queryURL + "datasets/" + resourceId + "/aggregate";
  const queryOptions = { limit: 5000};
    
HTTP.call("GET", url, { headers: headers, params: { opts: JSON.stringify(queryOptions), pipeline: pipeline }}, function(err, response) {
  if (err) {
    console.log("Failed to get data: ",err);
  } else {
    onData(null, {lsoas: response.data.data[0].id_array})
  }
});
}

export default loadAggregate;