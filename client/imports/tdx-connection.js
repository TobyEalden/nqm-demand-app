import {DDP} from "meteor/ddp";
import {HTTP} from "meteor/http";
import {ReactiveVar} from "meteor/reactive-var";

const TDX_DDP_SERVER = "https://tbx.nqminds.com/";

class TDXConnection {
  constructor() {
    this.connected = false;
    this.authenticated = new ReactiveVar(false);
  }
  connect() {
    if (this.connected) {
      return true;
    }
    this._connection = DDP.connect(TDX_DDP_SERVER);
    if (this._connection) {
      console.log("connected");
      if (!this.resourceCollection) {
        this.resourceCollection = new Mongo.Collection("AS.Resource", { connection: this._connection });
      }
      return true;
    } else {
      return false;
    }
  }
  authorise(password) {
    var self = this;
    var options = {
      headers: { 
        authorization: "Basic " + Meteor.settings.public.shareId + ":" + password },
        data: {
          grant_type: "client_credentials",          
        }
    };
    HTTP.post(Meteor.settings.public.authEndPoint, options, function(err, result) {
      if (err) {
        console.log("failed to get auth token: " + err.message);
      } else {
        console.log(result);
        self._connection.call("/app/jwtAuth", result.data.access_token, function (err, result) {
          if (err) {
            console.log("ddpConnection auth error: " + err.message);
          } else {
            console.log("ddpConnection auth result: " + result);
            self.authenticated.set(true);
          }                
        });    
      }
    });
  }
  subscribe() {
    return this._connection.subscribe.apply(this._connection, arguments);
  }
}

const singleton = new TDXConnection();
export default singleton;