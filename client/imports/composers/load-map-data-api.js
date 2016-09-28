import connectionManager from "../connection-manager";
import TDXApi from "nqm-api-tdx/client-api";
import {Meteor} from "meteor/meteor";

function loadMapData({mapId, mapFilter, options}, onData) {
  const config = {
    commandHost: Meteor.settings.public.commandHost,
    queryHost: Meteor.settings.public.queryHost,
    accessToken: connectionManager.authToken
  };
  const api = new TDXApi(config);

  api.getDatasetData(mapId, mapFilter, null, options, (err, response) => {
    onData(null, {data: response.data});
  });
}

export default loadMapData;