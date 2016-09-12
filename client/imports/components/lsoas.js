import React from "react";
import {Meteor} from "meteor/meteor";

import Panel from "./panel";
import PyramidWidget from "../containers/pyramid-container";
import TimelineWidget from "../containers/timeline-container";
import MapWidget from "../containers/map-container";
import YearSlider from "./year-slider";

import { popDensity, popDelta } from "../functions/heat-maps";

class Lsoa extends React.Component {

  constructor(props) {
    super(props);
    // Bind event handlers to "this"
    this.updateSettings = this.updateSettings.bind(this);
    this.updateLsoa = this.updateLsoa.bind(this);
    this.updateMapMode = this.updateMapMode.bind(this);
    this.setYear = this.setYear.bind(this);
  }


  updateLsoa(lsoa) {
    let widgets = _.clone(this.props.widgets);
    _.forEach(widgets, function(wgt) { // Ensure each widget gets correct lsoa data
      if (wgt != widgets.map) wgt.filter.area_id = {"$eq":lsoa};
    });
    FlowRouter.go("demand", {region: this.props.region, lsoa: lsoa}, {widgets: JSON.stringify(widgets)});
  }

  setYear(year) {
    let widgets = _.clone(this.props.widgets);
    widgets.map.filter.year["$in"][1] = year.toString();
    widgets.pyramid.filter.year[$eq] = year.toString();
    FlowRouter.go("demand", {region: this.props.region, lsoa: this.props.lsoa}, {widgets: JSON.stringify(widgets)});
  }

  updateSettings(wgtId, options, filter) { // Basic function to update widget settings
    let widgets = _.clone(this.props.widgets);
    widgets[wgtId] = widgets[wgtId] ? widgets[wgtId] : {};
    widgets[wgtId].options = options;
    widgets[wgtId].filter = filter;
    FlowRouter.go("demand", {region: this.props.region, lsoa: this.props.lsoa}, {widgets: JSON.stringify(widgets)}); 
  }

  updateMapMode(wgtId, deltaEnable, filter) {
    let widgets = _.clone(this.props.widgets);
    widgets[wgtId] = widgets[wgtId] ? widgets[wgtId] : {};
    widgets[wgtId].delta = deltaEnable;
    widgets[wgtId].filter = filter;
    FlowRouter.go("demand", {region: this.props.region, lsoa: this.props.lsoa}, {widgets: JSON.stringify(widgets)}); 
  }

  render() {
    // Some default filters


    const widgets = this.props.widgets;

    return (
      <div>
        <Panel>
          <MapWidget wgtId="map" mapId={Meteor.settings.public.lsoaGeo} resourceId={Meteor.settings.public.populationData} mapFilter={{"properties.LSOA11CD":{"$in":this.props.lsoas}}} filter={widgets.map.filter} options={widgets.map.options} centre={widgets.map.centre} updateRegion={this.updateLsoa} update={this.updateSettings} delta={widgets.map.delta} heat={widgets.map.delta ? popDelta : popDensity} setMode={this.updateMapMode}/>      
          <YearSlider update={this.setYear}/>
        </Panel>  
        <Panel>

          <PyramidWidget wgtId="pyramid" resourceId={Meteor.settings.public.populationData} filter={widgets.pyramid.filter} options={widgets.pyramid.options} update={this.updateSettings} />
          <TimelineWidget wgtId="timeline" resourceId={Meteor.settings.public.populationData} filter={widgets.timeline.filter} options={widgets.timeline.options} update={this.updateSettings} />
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
