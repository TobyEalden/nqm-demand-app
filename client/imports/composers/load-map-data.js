import connectionManager from "../connection-manager";

function loadMapData({mapId, mapFilter, options}, onData) {
  const sub = connectionManager.subscribe("datasetData",mapId, mapFilter, options, {
    onError(err) {
      console.log("error subscribing to datasetData: " + err.message);
    },
    onReady() {
      mapFilter = mapFilter || {};
      let clientFilter = _.extend({}, mapFilter,{_d: mapId});
      const datasetData = connectionManager.datasetDataCollection.find(clientFilter,options).fetch();
      onData(null, {geoData: datasetData});
    }
  });
}

export default loadMapData;

