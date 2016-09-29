import React from "react";
import {Meteor} from "meteor/meteor";

import connectionManager from "../connection-manager";
import Login from "./login";

import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import AppBar from "material-ui/AppBar";
import IconButton from "material-ui/IconButton";
import {List, ListItem} from 'material-ui/List';
import Divider from 'material-ui/Divider';
import GP from 'material-ui/svg-icons/maps/local-hospital';
import School from 'material-ui/svg-icons/maps/local-library';
import ZoomOut from 'material-ui/svg-icons/maps/zoom-out-map';
import TableIcon from "material-ui/svg-icons/action/view-list";
import Scenarios from "material-ui/svg-icons/social/group-add";

class Layout extends React.Component{
  constructor(props) {
    super(props);   

    // Bind event handlers to "this"
    this._onLogout = this._onLogout.bind(this);
    this._onUserPassword = this._onUserPassword.bind(this);
    this.tableView = this.tableView.bind(this);
  }
  _onUserPassword(user, password) {
    // Pass share credentials on to the connection manager.
    connectionManager.authorise(user, password);
  }  
  _onLogout() {
    FlowRouter.go("logout");
  }

  tableView() {
    FlowRouter.go("tables", {region: this.props.region});
  }

  regionView() {
    FlowRouter.go("/");
  }

  scenarioView() {
    FlowRouter.go("/scenarios");
  }

  render() {
    var styles = {
      appBar: {
        position: "fixed"
      },
      layoutContent: {
        padding: "68px 0px 0px 5px"
      }
    };
    var content;
    var logoutButton;

    // Render different content depending on whether authenticated or not.
    if (this.props.authenticated) {
      // Authenticated => render the layout content provided by the router.
      content = this.props.content();
      // Add a logout button to the toolbar.
      logoutButton = <IconButton onTouchTap={this._onLogout} iconClassName="material-icons" tooltip="logout">exit_to_app</IconButton>;
    } else {
      // Not authenticated => render the login component.
      content = <Login onEnter={this._onUserPassword} />;
    }

    return (
      <MuiThemeProvider>
        <div>
          <AppBar style={styles.appBar} title="nqm demand app" showMenuIconButton={false} iconElementRight={logoutButton} />
          <div id="side-menu" style={styles.layoutContent}>
            <List>
                <ListItem key="demandPack" primaryText="Demand Packs" 
                  initiallyOpen={true}
                  nestedItems={[<ListItem key="school" primaryText="School Data Pack" rightIcon={<School />} />,<ListItem key="GP" primaryText="GP Data Pack" rightIcon={<GP />} />]}/>
              <Divider />
                <ListItem key="regionView" onTouchTap={this.regionView} primaryText="Region View" rightIcon={<ZoomOut />} />
                <ListItem key="tableView" onTouchTap={this.tableView} primaryText="Table View" rightIcon={<TableIcon />} />
                <ListItem key="scenarioView" onTouchTap={this.scenarioView} primaryText="Scenario Planner" rightIcon={<Scenarios />} />
            </List>
          </div>
          <div style={styles.layoutContent}>
            {content}
          </div>
        </div>
      </MuiThemeProvider>
    );    
  }
}

export default Layout;