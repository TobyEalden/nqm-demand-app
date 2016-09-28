import connectionManager from "../connection-manager";
import TDXApi from "nqm-api-tdx/client-api";
import {Meteor} from "meteor/meteor";

// Loads data for a given resource id from the TDX.
// filter - an optional query filter to refine the returned data, e.g. {temperature: {$gt: 20}}
// options - options to tweak the returned data, e.g. { sort: { timestamp: -1 }, limit: 10, fields: {temperature: 1}} will sort by timestamp descending, limit the result to 10 items, and only return the temperature field in each document.
function loadResourceData({filter, options}, onData) {
  const config = {
    commandHost: Meteor.settings.public.commandHost,
    queryHost: Meteor.settings.public.queryHost,
    accessToken: connectionManager.authToken
  };
  const api = new TDXApi(config);

  api.getAggregateData(filter, null, options, (err, response) => {
    onData(null, {data: response});
  });
}

export default loadResourceData;