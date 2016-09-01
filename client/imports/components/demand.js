import React from "react";
import {Meteor} from "meteor/meteor";
import {composeWithTracker} from 'react-komposer';

import Pyramid from "./pyramid-wgt";
import Map from "./map-wgt";
import loadData from "../composers/load-resource-data";
import loadMapData from "../composers/load-map-data";

let PyramidWidget = composeWithTracker(loadData)(Pyramid);
let MapWidget = composeWithTracker(loadMapData)(Map);

class Demand extends React.Component {

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
    FlowRouter.go("demand", {}, {widgets: JSON.stringify(widgets)}); 
  }

  render() {
    
    let widgets = this.props.widgets;
    return (
      <div>
        <PyramidWidget wgtId="pyramid" resourceId="Ske2zpaGj" filter={{}} options={widgets.pyramid ? widgets.pyramid : {}} update={this._metaoptions}/>
        <MapWidget wgtId="map" resourceId="HyxysZ1ic" filter={{}} options={widgets.map ? widgets.map : {}} updateRegion={this._updateRegion} />
        
      </div>
    );
  }
}

Demand.propTypes = {
  widgets: React.PropTypes.object
}

export default Demand;
