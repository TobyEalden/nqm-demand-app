import React from "react";
import {Meteor} from "meteor/meteor";
import {composeWithTracker} from 'react-komposer';

import Map from "./counties-map-wgt";
import loadData from "../composers/load-resource-data";
import loadMapData from "../composers/load-map-data";

let MapWidget = composeWithTracker(loadMapData)(Map);

class Counties extends React.Component {

  constructor(props) {
    super(props);

    // Bind event handlers to "this"
    this._updateRegion = this._updateRegion.bind(this);

  }


  _updateRegion(_region, _centre) {
    let widgets = {};
    widgets.map = { 
      options: {
        centre: _centre
      }
    }
    FlowRouter.go("demand", {region: _region}, {widgets: JSON.stringify(widgets)});
  }


  render() {
    
    let widgets = this.props.widgets;
    return (
      <div>
        <MapWidget wgtId="map" mapId="HyxysZ1ic"  updateRegion={this._updateRegion}  />     
      </div>
    );
  }
}


export default Counties;
