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
    this._metaOptions = this._metaOptions.bind(this);
    this._updateRegion = this._updateRegion.bind(this);

  }


  _updateRegion(_region) {
    FlowRouter.go("demand", {region: _region});
  }

  _metaOptions(wgtId, _options) {
    let widgets = this.props.widgets;
    widgets[wgtId] = widgets[wgtId] ? widgets[wgtId] : {};
    widgets[wgtId] = _options;
    console.log(widgets);
    FlowRouter.go("demand", {}, {widgets: JSON.stringify(widgets)}); 
  }

  render() {
    
    let widgets = this.props.widgets;
    return (
      <div>
        <MapWidget wgtId="map" mapId="HyxysZ1ic" filter={{}} options={widgets.map ? widgets.map : {}} updateRegion={this._updateRegion} update={this._metaOptions} />     
      </div>
    );
  }
}

Counties.propTypes = {
  widgets: React.PropTypes.object,
}

export default Counties;
