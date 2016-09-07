import React from "react";
import {Meteor} from "meteor/meteor";
import {composeWithTracker} from 'react-komposer';

import loadAggregate from "../composers/aggregate";
import ProgressIndicator from "./progress-indicator";
import Lsoas from "./lsoas";

let LsoasDisplay = composeWithTracker(loadAggregate, ProgressIndicator)(Lsoas);


class Demand extends React.Component {

 

  render() {
    let pipeline='[{"$match":{"parent_id":"' + this.props.region + '"}},{"$group":{"_id":null,"id_array":{"$push":"$child_id"}}}]';
    
    return (
      <div>
        <LsoasDisplay resourceId="BkWqQQuBo" pipeline={pipeline} widgets={this.props.widgets} region={this.props.region} lsoa={this.props.lsoa}/>     
      </div>
    );
  }
}

Demand.propTypes = {
  widgets: React.PropTypes.object,
  region: React.PropTypes.string,
  lsoa: React.PropTypes.string
}

export default Demand;
