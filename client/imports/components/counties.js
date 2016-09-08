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
    let widgets = {};
    widgets.map = { 
      centre: centre,
      options: {limit: 2500},
      dataId: Meteor.settings.public.populationData
    }
    FlowRouter.go("demand", {region: region}, {widgets: JSON.stringify(widgets)});
  }

  render() {

    let widgets = this.props.widgets;
    return (
      <div>
        <MapWidget wgtId="map" mapId={Meteor.settings.public.countyGeo} options={{limit: 1000}} mapFilter={{}} updateRegion={this.updateRegion}  />     
      </div>
    );
  }
}


export default Counties;
