import React from "react";
import {Meteor} from "meteor/meteor";
import {composeWithTracker} from 'react-komposer';

import Map from "./counties-map-wgt";
import CircularProgress from 'material-ui/CircularProgress';
import loadData from "../composers/load-resource-data";
import loadMapData from "../composers/load-map-data";

let MapWidget = composeWithTracker(loadMapData, CircularProgress)(Map);

class Counties extends React.Component {

  constructor(props) {
    super(props);

    // Bind event handlers to "this"
    this._updateRegion = this._updateRegion.bind(this);

  }


  _updateRegion(_region, _centre) {
    let widgets = {};
    widgets.map = { 
      centre: _centre,
      options: {limit: 2500}
    }
    FlowRouter.go("demand", {region: _region}, {widgets: JSON.stringify(widgets)});
  }


  render() {
    
    let widgets = this.props.widgets;
    return (
      <div>
        <MapWidget wgtId="map" mapId="BylaGzys9" options={{limit: 1000}} mapFilter={{}} updateRegion={this._updateRegion}  />     
      </div>
    );
  }
}


export default Counties;
