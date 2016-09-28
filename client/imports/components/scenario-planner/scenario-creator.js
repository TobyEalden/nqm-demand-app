import React from "react";
import { Meteor } from "meteor/meteor";
import connectionManager from "../../connection-manager";
import TDXApi from "nqm-api-tdx/client-api";

import { generateScenario } from "../../functions/scenario-generator";

class ScenarioCreator extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      poplets: generateScenario(props.initial, props.planning, "2016")
    }
  }

  render() {
    console.log(this.state.poplets);
    return (<div></div>);
  }

}

ScenarioCreator.propTypes = {
  planning: React.PropTypes.array.isRequired,
  initial: React.PropTypes.array.isRequired
};

export default ScenarioCreator;