import React from "react";
import ReactDOM from 'react-dom';
import { Meteor } from "meteor/meteor";
import connectionManager from "../../connection-manager";

import TextField from 'material-ui/TextField';
import {List, ListItem} from 'material-ui/List';
import Add from 'material-ui/svg-icons/content/add';
import Checkbox from 'material-ui/Checkbox';

class ScenarioEditor extends React.Component {

  constructor(props) {
    super(props);
    this.createBuild = this.createBuild.bind(this);
    this.newName = this.newName.bind(this);
    this.openBuild = this.openBuild.bind(this);
    this.state = {
      newName: ""
    }
  }

  createBuild() {
    const postData = { name: this.state.newName, parentId: this.props.folder, basedOnSchema: "PlanningPoplet"};
    const headers = { authorization: "Bearer " + connectionManager.authToken };
    const url = "https://cmd.nqminds.com/commandSync/resource/create";
    HTTP.call("POST", url, { headers: headers, data: postData }, (err, response) => {
      if (err) {
        console.log("Failed to create build: ", err);
      } 
      else {
        console.log("Created build");
        this.setState({
          newName: ""
        });
      }
    });
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