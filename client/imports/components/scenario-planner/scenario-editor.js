import React from "react";
import ReactDOM from 'react-dom';
import { Meteor } from "meteor/meteor";
import connectionManager from "../../connection-manager";

import TextField from 'material-ui/TextField';
import {List, ListItem} from 'material-ui/List';
import Add from 'material-ui/svg-icons/content/add';
import Checkbox from 'material-ui/Checkbox';
import Snackbar from 'material-ui/Snackbar';

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
      message: "Scenario Added"
    }
  }

  createBuild() {
    if (this.state.newName === "") {
      this.setState({
        open: true,
        message: "Not a valid scenario name"
      });
    }
    else {
      const postData = { name: this.state.newName, parentId: this.props.folder, basedOnSchema: "PlanningPoplet"};
      const headers = { authorization: "Bearer " + connectionManager.authToken };
      const url = "https://cmd.nqminds.com/commandSync/resource/create";
      HTTP.call("POST", url, { headers: headers, data: postData }, (err, response) => {
        if (err) {
          this.setState({
            open: true,
            message: "Failed to create build: " + err
          });
        } 
        else {
          this.setState({
            newName: "",
            open: true,
            message: "Created build"
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
      <div id="scenario-container">
        <p>{this.props.name}</p><br />
        <p>Region: {this.props.region}</p>
        <List>
          {builds}
        </List>
        <TextField ref="buildName" hintText="Add New Build" value={this.state.newName} onChange={this.newName}/>
        <Add onClick={this.createBuild}/>
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