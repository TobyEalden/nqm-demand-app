import {composeWithTracker} from "react-komposer";
import connectionManager from "../tdx-connection";

function checkAuthenticated(props, onData) {
  if (connectionManager.authenticated.get()) {
    onData(null, { authenticated: true });
  } else {
    onData(null, { authenticated: false});
  }
}

export default checkAuthenticated;