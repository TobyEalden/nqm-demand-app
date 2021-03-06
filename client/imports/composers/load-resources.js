import connectionManager from "../connection-manager";

// Loads resources from the TDX.
// filter - an optional query filter to refine the returned data, e.g. {name: "my resource"}
// options - options to tweak the returned data, e.g. { sort: { name: -1 }, limit: 1, fields: {name: 1}} will sort by name descending, limit the result to 1 item, and only return the name field in each document, i.e. return the last resource when sorted alphabetically by name
function loadResource({filter, options}, onData) {

  // Subscribe to the resources publication using the given filter and options.
  // The subscription will automatically re-run if any of the parameters change (i.e. filter or options).
  const sub = connectionManager.subscribe("resources",filter, options, {
    onError(err) {
      console.log("error subscribing to resources: " + err.message);
    },
    onReady() {
      filter = filter || {};
      // The subscription is ready - fetch the local results.
      let clientFilter = _.extend({}, filter);
      const resources = connectionManager.resourceCollection.find(clientFilter,options).fetch();

      // Pass on to the component via the resources property
      onData(null, {data: resources});
    }
  });
}

export default loadResource;
