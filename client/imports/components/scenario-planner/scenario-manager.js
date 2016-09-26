import React from "react";
import { Meteor } from "meteor/meteor";

import { HTTP } from "meteor/http";

import TextField from 'material-ui/TextField';
import {List, ListItem} from 'material-ui/List';
import Add from 'material-ui/svg-icons/content/add';

import ScenarioEditor from "../../containers/scenario-container";

_ = lodash;

class ScenarioManager extends React.Component {

  constructor(props) {
    super(props);
    this.changeScenario = this.changeScenario.bind(this);
    this.state = {
      scenario: 0
    }
  }

  changeScenario(event, menu) {
    console.log(menu);
  }

  render() {
    const scenarios = _.map(this.props.data, (scenario, index) => {
      return (
         <ListItem
          key={scenario.scenario_name}
          onTouchTap={this.changeScenario}
          value={index}
          primaryText={scenario.scenario_name}
          />
      );
    });
    const filter = {
      "schemaDefinition.basedOn": "PlanningPoplet",
      "parents": {"$eq":this.props.data[this.state.scenario].scenario_folder}
    };
    return( 
      <div id="main-container">
        <div id="widget-container">
          <List>
            {scenarios}
            <ListItem
              rightIcon={<Add />}
              primaryText={<TextField id="scenario-name" hintText="Add New Scenario"/>}
            />
          </List>
        </div>

        <ScenarioEditor options={{limit: 1000}} filter={filter} access={this.props.access} folder={this.props.data[this.state.scenario].scenario_folder} name={this.props.data[this.state.scenario].scenario_name} region={this.props.data[this.state.scenario].parent_area_code}/>

     
      </div>
    );
  }

}

ScenarioManager.propTypes = {
  data: React.PropTypes.array.isRequired,
  access: React.PropTypes.string.isRequired
};

export default ScenarioManager;