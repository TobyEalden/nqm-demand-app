import React from "react";
import {Meteor} from "meteor/meteor";
import {composeWithTracker} from 'react-komposer';

import Pyramid from "./pyramid-wgt";
import Map from "./map-wgt";
import loadData from "../composers/load-resource-data";
import loadMapData from "../composers/load-map-data";

let PyramidWidget = composeWithTracker(loadData)(Pyramid);
let MapWidget = composeWithTracker(loadMapData)(Map);

class Lsoa extends React.Component {

  constructor(props) {
    super(props);

    // Bind event handlers to "this"
    this._metaOptions = this._metaOptions.bind(this);
    this._updateRegion = this._updateRegion.bind(this);

  }

  _updateRegion(_region) {
    console.log(_region);
  }

  _metaOptions(wgtId, _options) {
    let widgets = this.props.widgets;
    widgets[wgtId] = widgets[wgtId] ? widgets[wgtId] : {};
    widgets[wgtId] = _options;
    console.log(widgets);
    FlowRouter.go("demand", {region: this.props.region}, {widgets: JSON.stringify(widgets)}); 
  }

  render() {
    
    let widgets = this.props.widgets;
    return (
      <div>
        <PyramidWidget wgtId="pyramid" resourceId="Ske2zpaGj" filter={{}} options={widgets.pyramid ? widgets.pyramid : {}} update={this._metaOptions}/>
        <MapWidget wgtId="map" mapId="HklvK8y5q" filter={{"properties.LSOA11CD":{"$in":this.props.lsoas}}} options={widgets.map ? widgets.map : {}} updateRegion={this._updateRegion} update={this._metaOptions}/>        
      </div>
    );
  }
}

Lsoa.propTypes = {
  widgets: React.PropTypes.object,
  lsoas: React.PropTypes.array,
  region: React.PropTypes.string
}

export default Lsoa;
