import React from "react";
import {Meteor} from "meteor/meteor";
import {composeWithTracker} from 'react-komposer';

import MapWidget from "../containers/county-map-container";

class Counties extends React.Component {

  constructor(props) {
    super(props);
    // Bind event handlers to "this"
    this.updateRegion = this.updateRegion.bind(this);

  }

  updateRegion(region, centre) {
    // Pass in the basic options to the demand app, such as region and map zoom location  
    FlowRouter.go("demand", {region: region}, {centre: JSON.stringify(centre)});
  }

  render() {

    let widgets = this.props.widgets;
    return (
      <div id="main-container">
        <div id="map-container">
          <MapWidget wgtId="map" mapId={Meteor.settings.public.countyGeo} options={{limit: 1000}} mapFilter={{}} updateRegion={this.updateRegion}  />     
        </div>
      </div>
    );
  }
}


export default Counties;
