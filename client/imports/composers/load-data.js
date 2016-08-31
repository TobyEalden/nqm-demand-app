import connectionManager from "../tdx-connection";

function loadData({resourceId}, onData) {
  const sub = connectionManager.subscribe("datasetData",resourceId, {
    onError(err) {
      console.log("error subscribing to data: " + err.message);
    },
    onReady() {
      if (connectionManager.authenticated.get()) {
        const resources = connectionManager.resourceCollection.find().fetch();      
        onData(null, {resources: resources});
      }
    }
  });
}

export default loadData;
