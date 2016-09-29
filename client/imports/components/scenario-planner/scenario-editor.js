import React from "react";
import ReactDOM from 'react-dom';
import { Meteor } from "meteor/meteor";
import connectionManager from "../../connection-manager";
import TDXApi from "nqm-api-tdx/client-api";

import TextField from 'material-ui/TextField';
import {List, ListItem} from 'material-ui/List';
import Add from 'material-ui/svg-icons/content/add';
import Checkbox from 'material-ui/Checkbox';
import Snackbar from 'material-ui/Snackbar';
import Subheader from 'material-ui/Subheader';

class ScenarioEditor extends React.Component {

  constructor(props) {
    super(props);
    this.createBuild = this.createBuild.bind(this);
    this.newName = this.newName.bind(this);
    this.openBuild = this.openBuild.bind(this);
    this.handleRequestClose = this.handleRequestClose.bind(this);
    this.state = {
      newName: "",
      open: false,
      message: "Scenario Added",
      error: ""
    }
  }

  createBuild() {
    if (this.state.newName === "" || (this.state.newName.length < 6)) {
      this.setState({
        error: "Please enter at least six characters"
      });
    }
    else {
      const config = {
        commandHost: Meteor.settings.public.commandHost,
        queryHost: Meteor.settings.public.queryHost,
        accessToken: connectionManager.authToken
      };
      const api = new TDXApi(config);
      api.createDataset({ name: this.state.newName, parentId: this.props.folder, basedOnSchema: "PlanningPoplet"}, (err,id) => {
        if (err) {
          this.setState({
            open: true,
            message: "Failed to create build: " + err,
            error: ""
          });
        } 
        else {
          this.setState({
            newName: "",
            open: true,
            message: "Created build",
            error: ""
          });
        }
      });
    }
  }

  newName(event) {
    this.setState({
      newName: event.target.value
    });
  }

  openBuild(event) {
    let found = false;
    let elem = event.target.parentNode;
    while (!found) {
      if (elem.id != "") found = true;
      else elem = elem.parentNode;
    }
    FlowRouter.go("build", {region: this.props.region, id: elem.id});

  }
  handleRequestClose() {
    this.setState({
      open: false
    });
  };


  render() {
    const styles = {
      input: {
        maxWidth: "150px"
      }
    };

    const builds = _.map(this.props.data, (build) => {
      return (
         <ListItem
          key={build.id}
          id={build.id}
          onTouchTap={this.openBuild}
          primaryText={build.name}
          />
      );
    });
    return (
      <div id="build-list">
        <List>
          <Subheader>Region: {this.props.region}</Subheader>
          {builds}
        </List>
        <div className="textfield-add">
          <TextField ref="buildName" hintText="Add New Build" value={this.state.newName} onChange={this.newName} style={styles.input} errorText={this.state.error}/>
          <Add onClick={this.createBuild}/>
        </div>
        <Snackbar
          open={this.state.open}
          message={this.state.message}
          autoHideDuration={4000}
          onRequestClose={this.handleRequestClose}
        />
      </div>

    );
  }


}

ScenarioEditor.propTypes = {
  data: React.PropTypes.array.isRequired,
  folder: React.PropTypes.string.isRequired,
  name: React.PropTypes.string.isRequired,
  region: React.PropTypes.string.isRequired
};

export default ScenarioEditor;