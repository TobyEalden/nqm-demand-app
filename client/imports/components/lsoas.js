import React from "react";
import {Meteor} from "meteor/meteor";
import {composeWithTracker} from 'react-komposer';
import {composeAll} from 'react-komposer';

import Panel from "./panel";
import Pyramid from "./pyramid-wgt";
import Map from "./map-wgt";
import loadData from "../composers/load-resource-data";
import loadMapData from "../composers/load-map-data";
import CircularProgress from 'material-ui/CircularProgress';

let PyramidWidget = composeWithTracker(loadData, CircularProgress)(Pyramid);
let MapWidget = composeAll(composeWithTracker(loadMapData, CircularProgress), composeWithTracker(loadData, CircularProgress))(Map);

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

  popDensity(feature) {
     var maxDensity = 20000;
    var population = _.find(this.data, {age_band: "All Ages", year: 2013, area_id: feature.properties.LSOA11CD}).persons;
    var density = Math.floor(255*(1-(population/feature.properties.area)/maxDensity));
    var heat = '#ff' + density.toString(16) + density.toString(16); 
    console.log("Pop" + population);
    return {fillColor: heat, color: '#FF0000', weight: 1, opacity: 0.5};
  }

  render() {
    let defaultFilter = {"area_id":{"$eq":this.props.lsoa}};
    let widgets = this.props.widgets;
    return (
      <div>
        <Panel>
          <MapWidget wgtId="map" mapId="HklvK8y5q" resourceId="HkgnNnueG" filter={{"properties.LSOA11CD":{"$in":this.props.lsoas}}} options={widgets.map ? widgets.map.options : {limit: 1000}} centre={widgets.map.centre} updateRegion={this._updateLsoa} update={this._updateSettings} heat={this.popDensity}/>      
        </Panel>  
        <Panel>
          <PyramidWidget wgtId="pyramid" resourceId="HkgnNnueG" filter={widgets.pyramid ? widgets.pyramid.filter : defaultFilter} options={widgets.pyramid ? widgets.pyramid.options : {limit: 1000}} update={this._updateSettings} />
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
