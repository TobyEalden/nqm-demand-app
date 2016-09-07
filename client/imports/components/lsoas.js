import React from "react";
import {Meteor} from "meteor/meteor";
import {composeWithTracker} from 'react-komposer';
import {composeAll} from 'react-komposer';

import Panel from "./panel";
import Pyramid from "./pyramid-wgt";
import Map from "./map-wgt";
import loadData from "../composers/load-resource-data";
import loadMapData from "../composers/load-map-data";
import ProgressIndicator from "./progress-indicator";

let PyramidWidget = composeWithTracker(loadData, ProgressIndicator)(Pyramid);
let MapWidget = composeAll(composeWithTracker(loadMapData, ProgressIndicator), composeWithTracker(loadData, ProgressIndicator))(Map);

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

  _updateSettings(wgtId, _options, _filter) {
    let widgets = this.props.widgets;
    widgets[wgtId] = widgets[wgtId] ? widgets[wgtId] : {};
    widgets[wgtId].options = _options;
    widgets[wgtId].filter = _filter;

    FlowRouter.go("demand", {region: this.props.region, lsoa: this.props.lsoa}, {widgets: JSON.stringify(widgets)}); 
  }

  popDensity(feature) {

    // let population = _.find(this.data, function (poplet) {
    //   if (poplet.area_id == feature.properties.LSOA11CD) return true;
    //   else return false;
    // });
    
    // let d = population.persons/feature.properties.area;
    // let heat =  d > 0.014   ? "#800026" : 
    //             d > 0.01    ? "#bd0026" :    
    //             d > 0.005   ? "#e31a1c" :
    //             d > 0.001   ? "#fc4e2a" :
    //             d > 0.0005  ? "#fd8d3c" :
    //             d > 0.0001  ? "#feb24c" :
    //             d > 0.00008 ? "#fed976" :
    //             d > 0.00005 ? "#4292c6":
    //             d > 0.00003 ? "#2171b5" :
    //             d > 0.00001 ? "#08519c" :
    //                         "#08306b";
    // return {fillColor: heat, color: '#FF0000', weight: 1, fillOpacity: 0.5};

    return {fillColor: "#e31a1c", color: '#FF0000', weight: 1, fillOpacity: 0.5};
  }

  render() {
    let defaultFilter = {"area_id":{"$eq":this.props.lsoa}};
    let widgets = this.props.widgets;

    /* Put some logic here to determine what is passed
    to the map for colour coding it */
    let mapDataId = "SkxbDChh_";
    let mapDataFilter = {"area_id":{"$in":this.props.lsoas}, "year":{"$eq":"2015"}, "age_band":{"$eq":"All Ages"}};
    console.log("map filter: ",mapDataFilter);
    if (mapDataFilter._d) {
      debugger;
    }
    return (
      <div>
        <Panel>
          <MapWidget 
            wgtId="map" 
            mapId="HklvK8y5q" 
            resourceId={widgets.map.resourceId ? widgets.map.resourceId : mapDataId} 
            mapFilter={{"properties.LSOA11CD":{"$in":this.props.lsoas}}}
            filter={widgets.map.filter ? widgets.map.filter : mapDataFilter} 
            options={widgets.map ? widgets.map.options : {limit: 1000}} 
            centre={widgets.map.centre} 
            updateRegion={this._updateLsoa} 
            update={this._updateSettings} 
            heat={this.popDensity}/>      
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
