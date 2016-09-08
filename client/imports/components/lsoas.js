import React from "react";
import {Meteor} from "meteor/meteor";

import Panel from "./panel";
import PyramidWidget from "../containers/pyramid-container";
import TimelineWidget from "../containers/timeline-container";
import MapWidget from "../containers/map-container";

class Lsoa extends React.Component {

  constructor(props) {
    super(props);
    // Bind event handlers to "this"
    this.updateSettings = this.updateSettings.bind(this);
    this.updateLsoa = this.updateLsoa.bind(this);
  }

  updateLsoa(lsoa) {
    let widgets = _.clone(this.props.widgets);
    _.forEach(widgets, function(wgt) { // Ensure each widget gets correct lsoa data
      if (wgt != widgets.map) wgt.filter.area_id = {"$eq":lsoa};
    });
    FlowRouter.go("demand", {region: this.props.region, lsoa: lsoa}, {widgets: JSON.stringify(widgets)});
  }

  updateSettings(wgtId, options, filter) { // Basic function to update widget settings
    let widgets = _.clone(this.props.widgets);
    widgets[wgtId] = widgets[wgtId] ? widgets[wgtId] : {};
    widgets[wgtId].options = options;
    widgets[wgtId].filter = filter;
    FlowRouter.go("demand", {region: this.props.region, lsoa: this.props.lsoa}, {widgets: JSON.stringify(widgets)}); 
  }

  popDensity(feature) { // Styling function, can this be moved externally

    let population = _.find(this.data, function (poplet) {
      if (poplet.area_id == feature.properties.LSOA11CD) return true;
      else return false;
    });
    
    let d = population.persons/feature.properties.area;
    let heat =  d > 0.014   ? "#800026" : 
                d > 0.01    ? "#bd0026" :    
                d > 0.005   ? "#e31a1c" :
                d > 0.001   ? "#fc4e2a" :
                d > 0.0005  ? "#fd8d3c" :
                d > 0.0001  ? "#feb24c" :
                d > 0.00008 ? "#fed976" :
                d > 0.00005 ? "#4292c6":
                d > 0.00003 ? "#2171b5" :
                d > 0.00001 ? "#08519c" :
                            "#08306b";
    return {fillColor: heat, color: '#FF0000', weight: 1, fillOpacity: 0.5};

  }

  render() {
    const pyramidFilter = {"area_id":{"$eq":this.props.lsoa}, "year":{"$eq":"2015"}};
    const timelineFilter = {"area_id":{"$eq":this.props.lsoa}, "age_band":{"$eq":"All Ages"}}; 
    const widgets = this.props.widgets;

    /* Put some logic here to determine what is passed
    to the map for colour coding it */
    const mapFilter = {"properties.LSOA11CD":{"$in":this.props.lsoas}};
    const mapDataFilter = {"area_id":{"$in":this.props.lsoas}, "year":{"$eq":"2015"}, "age_band":{"$eq":"All Ages"}};

    return (
      <div>
        <Panel>
          <MapWidget wgtId="map" mapId={Meteor.settings.public.lsoaGeo} resourceId={widgets.map.dataId} mapFilter={mapFilter} filter={widgets.map.filter ? widgets.map.filter : mapDataFilter} options={widgets.map ? widgets.map.options : {limit: 1000}} centre={widgets.map.centre} updateRegion={this.updateLsoa} update={this.updateSettings} heat={this.popDensity}/>      
        </Panel>  
        <Panel>

          <PyramidWidget wgtId="pyramid" resourceId={Meteor.settings.public.populationData} filter={widgets.pyramid ? widgets.pyramid.filter : pyramidFilter} options={widgets.pyramid ? widgets.pyramid.options : {limit: 1000}} update={this.updateSettings} />
          <TimelineWidget wgtId="timeline" resourceId={Meteor.settings.public.populationData} filter={widgets.timeline ? widgets.timeline.filter : timelineFilter} options={widgets.timeline ? widgets.timeline.options : {limit: 1000}} update={this.updateSettings} />
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
