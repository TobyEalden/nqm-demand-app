import React from "react";
import {Meteor} from "meteor/meteor";
import {composeWithTracker} from 'react-komposer';

import Panel from "./panel";
import Pyramid from "./pyramid-wgt";
import Map from "./map-wgt";
import loadData from "../composers/load-resource-data";
import loadMapData from "../composers/load-map-data";
import CircularProgress from 'material-ui/CircularProgress';

let PyramidWidget = composeWithTracker(loadData, CircularProgress)(Pyramid);
let MapWidget = composeWithTracker(loadMapData, CircularProgress)(Map);

class Lsoa extends React.Component {

  constructor(props) {
    super(props);

    // Bind event handlers to "this"
    this._updateSettings = this._updateSettings.bind(this);
    this._updateLsoa = this._updateLsoa.bind(this);

  }

  _updateLsoa(_lsoa) {
    console.log(_lsoa);
    FlowRouter.go("demand", {region: this.props.region, lsoa: _lsoa}, {widgets: JSON.stringify(this.props.widgets)});
  }

  _updateSettings(wgtId, _options, _filters) {
    let widgets = this.props.widgets;
    widgets[wgtId] = widgets[wgtId] ? widgets[wgtId] : {};
    widgets[wgtId].options = _options;
    widgets[wgtId].filters = _filters;
    console.log(widgets);
    FlowRouter.go("demand", {region: this.props.region, lsoa: this.props.lsoa}, {widgets: JSON.stringify(widgets)}); 
  }

  render() {
    let defaultFilter = {"area_id":{"$eq":this.props.lsoa}};
    let widgets = this.props.widgets;
    return (
      <div>
        <Panel>
          <MapWidget wgtId="map" mapId="HklvK8y5q" filter={{"properties.LSOA11CD":{"$in":this.props.lsoas}}} settings={widgets.map ? widgets.map : {}} updateRegion={this._updateLsoa} update={this._updateSettings} />      
        </Panel>  
        <Panel>
          <PyramidWidget wgtId="pyramid" resourceId="HkgnNnueG" filter={widgets.pyramid ? widgets.pyramid.filter : defaultFilter} options={widgets.pyramid ? widgets.pyramid.options : {limit: 1000}} update={this._updateSettings}/>
        </Panel>
      </div>
    );
  }
}

Lsoa.propTypes = {
  widgets: React.PropTypes.object,
  lsoas: React.PropTypes.array,
  region: React.PropTypes.string,
  lsoa: React.PropTypes.string
}

export default Lsoa;
