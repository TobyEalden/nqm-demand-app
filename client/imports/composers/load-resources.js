import connectionManager from "../tdx-connection";

function loadResource({resourceId, filter}, onData) {
  const sub = connectionManager.subscribe("resources",{}, {
    onError(err) {
      console.log("error subscribing to resources: " + err.message);
    },
    onReady() {
      if (connectionManager.authenticated.get()) {
        const resources = connectionManager.resourceCollection.find({}, filter).fetch();      
        onData(null, {resources: resources});
      }
    }
  });
}

export default loadResource;
