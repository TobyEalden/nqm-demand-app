import React from "react";
import {Meteor} from "meteor/meteor";
import connectionManager from "../tdx-connection";
import Login from "./login";

import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import AppBar from "material-ui/AppBar";

class Layout extends React.Component{
  constructor(props) {
    super(props);   
  }
  _onPassword(password) {
    connectionManager.authorise(password);
  }  
  render() {
    var content;

    if (this.props.authenticated) {
      content = this.props.content();
    } else {
      content = <Login onEnter={this._onPassword} />;
    }

    return (
      <MuiThemeProvider>
        <div>
          <AppBar title="minimal app" />
          <div style={{padding: 5}}>
            {content}
          </div>
        </div>
      </MuiThemeProvider>
    );    
  }
}

export default Layout;