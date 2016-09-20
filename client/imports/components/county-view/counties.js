import React from "react";
import {Meteor} from "meteor/meteor";
import {composeWithTracker} from 'react-komposer';

import MapWidget from "../../containers/county-map-container";

class Counties extends React.Component {

  constructor(props) {
    super(props);
    this.updateRegion = this.updateRegion.bind(this);
  }

  updateRegion(region, centre, name, area) {
    FlowRouter.go("demand", {region: region}, {centre: JSON.stringify(centre), name: name, area: area});
  }

  render() {
    return (
      <div id="main-container">
      
          <MapWidget wgtId="map" mapId={Meteor.settings.public.countyGeo} options={{limit: 1000}} mapFilter={{}} updateRegion={this.updateRegion}  />     

      </div>
    );
  }
}

export default Counties;
