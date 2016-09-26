import React from "react";
import ReactDOM from 'react-dom';
import { Meteor } from "meteor/meteor";
import TDXApi from "nqm-api-tdx";

import TextField from 'material-ui/TextField';
import {List, ListItem} from 'material-ui/List';
import Add from 'material-ui/svg-icons/content/add';
import Checkbox from 'material-ui/Checkbox';

class ScenarioEditor extends React.Component {

  constructor(props) {
    super(props);
    this.createBuild = this.createBuild.bind(this);
    this.newName = this.newName.bind(this);
    this.state = {
      newName: ""
    }
  }

  createBuild() {
    const postData = { name: this.state.newName, parentId: this.props.folder, basedOnSchema: "PlanningPoplet"};
    const headers = { authorization: "Bearer " + this.props.access };
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

  render() {

    const builds = _.map(this.props.data, (build) => {
      return (
         <ListItem
          key={build.name}
          leftCheckbox={<Checkbox />}
          primaryText={build.name}
          />
      );
    });

    return (
      <div id="scenario-container">
        <TextField
          id="name"
          defaultValue={this.props.name}
        /><br />
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