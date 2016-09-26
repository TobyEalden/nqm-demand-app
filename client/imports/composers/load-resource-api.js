import connectionManager from "../connection-manager";
import { HTTP } from "meteor/http";
import {Meteor} from "meteor/meteor";

// Loads data for a given resource id from the TDX.
// filter - an optional query filter to refine the returned data, e.g. {temperature: {$gt: 20}}
// options - options to tweak the returned data, e.g. { sort: { timestamp: -1 }, limit: 10, fields: {temperature: 1}} will sort by timestamp descending, limit the result to 10 items, and only return the temperature field in each document.
function loadResourceData({filter, options}, onData) {
  const headers = { authorization: "Bearer " + connectionManager.authToken };
  const url = Meteor.settings.public.queryURL + "datasets";
   
  HTTP.call("GET", url, {headers: headers, params: {opts:JSON.stringify(options), filter: JSON.stringify(filter)}},  function(err, response) {
    if (err) {
      console.log("Failed to get data: ",err);
    } else {
      onData(null, {data: response.data});
    }
  });
}

export default loadResourceData;