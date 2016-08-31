import {Meteor} from "meteor/meteor";
import injectTapEventPlugin from "react-tap-event-plugin";
import connectionManager from "./imports/tdx-connection";

Meteor.startup(function() {  
  injectTapEventPlugin();
  connectionManager.connect();
});

