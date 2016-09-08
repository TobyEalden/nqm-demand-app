import React from "react";
import {Meteor} from "meteor/meteor";

import LsoasDisplay from "../containers/lsoa-display-container";

class Demand extends React.Component {

  render() {
    // Get a list of all LSOA IDs for our region.
    let pipeline='[{"$match":{"parent_id":"' + this.props.region + '"}},{"$group":{"_id":null,"id_array":{"$push":"$child_id"}}}]';
    
    return (
      <div>
        <LsoasDisplay resourceId={Meteor.settings.public.lsoaMapping} pipeline={pipeline} widgets={this.props.widgets} region={this.props.region} lsoa={this.props.lsoa}/>     
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
