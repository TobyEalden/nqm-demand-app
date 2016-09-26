import React from "react";
import { Meteor } from "meteor/meteor";
import connectionManager from "../../connection-manager";

import { HTTP } from "meteor/http";

import TextField from 'material-ui/TextField';
import {List, ListItem} from 'material-ui/List';
import Add from 'material-ui/svg-icons/content/add';
import AutoComplete from 'material-ui/AutoComplete';

import ScenarioEditor from "../../containers/scenario-container";

_ = lodash;

class ScenarioManager extends React.Component {

  constructor(props) {
    super(props);
    this.changeScenario = this.changeScenario.bind(this);
    this.addScenario = this.addScenario.bind(this);
    this.newName = this.newName.bind(this);
    this.state = {
      scenario: 0,
      newName: ""
    }
  }

  changeScenario(event) {
    let found = false;
    let elem = event.target.parentNode;
    while (!found) {
      if (elem.id != "") found = true;
      else elem = elem.parentNode;
    }
    this.setState({
      scenario: elem.id
    });
  }

  newName(event) {
    this.setState({
      newName: event.target.value
    });
  }

  addScenario() {
    let postData = { name: this.state.newName, parentId: "H1WOCJFUT", basedOnSchema: "resourceGroup"};
    const headers = { authorization: "Bearer " + connectionManager.authToken };
    let url = "https://cmd.nqminds.com/commandSync/resource/create";
    HTTP.call("POST", url, { headers: headers, data: postData }, (err, response) => {
      if (err) {
        console.log("Failed to create build: ", err);
      } 
      else {
        console.log(response);
        const data = {
          scenario_name: this.state.newName,
          scenario_folder: response.data.response.id,
          parent_area_code: "E10000014", // Dummy Data This is placeholder for Hampshire
          base_population_datasetId: ""
        };
        postData = {
          datasetId: this.props.resourceId,
          payload: [].concat(data)    
        };
        url = "https://cmd.nqminds.com/commandSync/dataset/data/createMany";
        HTTP.call("POST", url, { headers: headers, data: postData }, (err, response) => {
          if (err) {
            console.log("Failed to get data: ", err);
          } else {
            console.log("wrote to dataset");
            this.setState({
              newName: ""
            });
          }
        });     
      }
    });
  }

  render() {
    const scenarios = _.map(this.props.data, (scenario, index) => {
      return (
         <ListItem
          key={scenario.scenario_name}
          id={index}
          onTouchTap={this.changeScenario}
          primaryText={scenario.scenario_name}
          />
      );
    });
    const filter = {
      "schemaDefinition.basedOn": "PlanningPoplet",
      "parents": {"$eq":this.props.data[this.state.scenario].scenario_folder}
    };
    // Dummy Data
    const regionList = [{textKey: "Hampshire", valueKey: "SkxbDChh_"}];
    const dataSourceConfig = {
      text: 'textKey',
      value: 'valueKey',
    };
    return( 
      <div id="main-container">
        <div id="widget-container">
          <List>
            {scenarios}
          </List>
          <TextField id="scenario-name" hintText="New Scenario Name" value={this.state.newName} onChange={this.newName}/>
          <AutoComplete hintText="New Scenario Base Population"
            filter={AutoComplete.fuzzyFilter}
            dataSource={regionList}
            dataSourceConfig={dataSourceConfig}
          />
          <Add onClick={this.addScenario}/>
        </div>

        <ScenarioEditor options={{limit: 1000}} filter={filter} folder={this.props.data[this.state.scenario].scenario_folder} name={this.props.data[this.state.scenario].scenario_name} region={this.props.data[this.state.scenario].parent_area_code}/>

     
      </div>
    );
  }

}

ScenarioManager.propTypes = {
  data: React.PropTypes.array.isRequired,
  resourceId: React.PropTypes.string.isRequired
};

export default ScenarioManager;