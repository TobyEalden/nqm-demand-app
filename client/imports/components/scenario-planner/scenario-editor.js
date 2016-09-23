import React from "react";
import { Meteor } from "meteor/meteor";
import TDXApi from "nqm-api-tdx";

import TextField from 'material-ui/TextField';
import {List, ListItem} from 'material-ui/List';
import Add from 'material-ui/svg-icons/content/add';
import Checkbox from 'material-ui/Checkbox';

class ScenarioEditor extends React.Component {

  render() {

    return (
      <div id="main-container">
        <TextField
          id="name"
          defaultValue={this.props.data.name}
        /><br />
        <p>Region: {this.props.data.region}</p>
        <List>
          <ListItem
          leftCheckbox={<Checkbox />}
          primaryText="Hospital Build"
          />
          <ListItem
          leftCheckbox={<Checkbox />}
          primaryText="Car Park"
          />
          <ListItem
          leftCheckbox={<Checkbox />}
          primaryText="Mystical Emporium"
          />
          <ListItem
            rightIcon={<Add />}
            primaryText={<TextField id="build-name" hintText="Add New Build"/>}
          />
        </List>

      </div>

    );
  }


}

ScenarioEditor.propTypes = {
  data: React.PropTypes.object.isRequired
};

export default ScenarioEditor;