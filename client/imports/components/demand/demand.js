import React from "react";
import {Meteor} from "meteor/meteor";

import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import Share from 'material-ui/svg-icons/social/share';
import { encode } from "../../functions/deep-links";
import MapWidget from "../../containers/map-container";
import PyramidWidget from "../../containers/pyramid-container";
import TimelineWidget from "../../containers/timeline-container";
import MinimapWidget from "../../containers/minimap-container";
import LsoaDetails from "./lsoa-details";
import YearSlider from "./year-slider";
import MapToggle from "./map-toggle";
import Filter from "./filters";


_ = lodash;

class Demand extends React.Component {

  constructor(props) {
    super(props);

    // Bind Context, we shouldn't need to do this but arrow notation on function declaration gives errors...
    this.setYear = this.setYear.bind(this);
    this.setLsoa = this.setLsoa.bind(this);
    this.toggleMapMode = this.toggleMapMode.bind(this);
    this.setFilters = this.setFilters.bind(this);
    this.share = this.share.bind(this);

    this.state = props.initialState;
    this.state.widgets.map.filter.area_id["$in"] = props.data;
  }

  /* Update functions, if you add a new widget check carefully whether it needs to be updated, it's possibly 
  worth adding a widget class as well as IDs if we will need many of the same widget within a single application */
  setYear(year) {
    let widgets = _.cloneDeep(this.state.widgets);
    widgets.map.filter.year["$in"][1] = year.toString();
    widgets.pyramid.filter.year["$eq"] = year.toString();
    this.setState({
      widgets: widgets
    });
  }

  setLsoa(lsoa) {
    let widgets = _.cloneDeep(this.state.widgets);
    widgets.pyramid.filter.area_id["$eq"] = lsoa.id;
    widgets.timeline.filter.area_id["$eq"] = lsoa.id;
    widgets.minimap.filter = {
      "properties.LSOA11CD": {
        "$eq": lsoa.id
      }
    };

    widgets.map.settings.area_id = lsoa.id;
    this.setState({
      widgets: widgets,
      lsoa: lsoa,
      zoomed: true
    });
  }

  toggleMapMode() {
    let widgets = _.cloneDeep(this.state.widgets);
    widgets.map.settings.delta = !widgets.map.settings.delta;
    this.setState({
      widgets: widgets
    });
  }

  setFilters(filters) {
    let gender = [];
    if(filters.male) gender.push("male");
    if(filters.female) gender.push("female");
    let age_bands =  filters.bands.split(",");

    let widgets = _.cloneDeep(this.state.widgets);
    widgets.map.filter.gender["$in"] = gender;
    widgets.map.filter.age_band["$in"] = age_bands;
    widgets.timeline.filter.gender["$in"] = gender;
    widgets.timeline.filter.age_band["$in"] = age_bands;

    // Pyramid must display all invididual bands when All Ages selected
    // Pyramid always uses same filter, just selective highlighting so assign to settings instead of filter
    if (age_bands.indexOf("All Ages") != -1) widgets.pyramid.settings.age_band["$in"] = Meteor.settings.public.allAgeBands; 
    else widgets.pyramid.settings.age_band["$in"] = age_bands;
    widgets.pyramid.settings.gender["$in"] = gender;

    this.setState({
      widgets: widgets
    });

  }

  share() {
    encode(this.props.region, this.state, this.props.centre);
  }

  render() {    
    let widgets = this.state.widgets;
    console.log(this.state);
    const pipeline = '[{"$match":{"area_id":{"$in":' + JSON.stringify(this.props.data) + '},"year":' + JSON.stringify(widgets.map.filter.year) + ',"gender":' + JSON.stringify(widgets.map.filter.gender) + ',"age_band":' + JSON.stringify(widgets.map.filter.age_band) + '}},{"$group":{"_id":"$area_id","year1":{"$sum":{"$cond":[{"$eq":["$year","' + widgets.map.filter.year["$in"][0] + '"]},"$persons",0]}},"year2":{"$sum":{"$cond":[{"$eq":["$year","' + widgets.map.filter.year["$in"][1] + '"]},"$persons",0]}}}}]';
    const timePipe = '[{"$match":{"area_id":' + JSON.stringify(widgets.timeline.filter.area_id) + ',"gender":' + JSON.stringify(widgets.timeline.filter.gender) + ',"age_band":' + JSON.stringify(widgets.timeline.filter.age_band) + '}},{"$group":{"_id":"$year","persons":{"$sum":"$persons"}}}]';
    
    // Widget IDs must be unique to each widget.
    return (
      <div id="main-container">
        <div id="map-container">
          <Card className="card controller-container">
            <MapToggle update={this.toggleMapMode} initial={this.state.widgets.map.settings.delta}/>
            <Filter update={this.setFilters} initial={this.state.widgets.map.filter}/>
            
          </Card>   
          <MapWidget wgtId="map" mapId={Meteor.settings.public.lsoaGeo} resourceId={Meteor.settings.public.populationData} mapFilter={{"properties.LSOA11CD":{"$in":this.props.data}}} pipeline={pipeline} filter={widgets.map.filter} options={widgets.map.options} centre={this.props.centre} update={this.setLsoa} settings={widgets.map.settings} />
          <Card className="card controller-container">
            <YearSlider update={this.setYear} initial={this.state.widgets.map.filter.year["$in"][1]}/>
          </Card> 
        </div>
        
        <div id="widget-container">
          <LsoaDetails lsoa={this.state.lsoa} />
          <PyramidWidget wgtId="pyramid" resourceId={this.state.zoomed ? Meteor.settings.public.populationData : Meteor.settings.public.regionData} filter={widgets.pyramid.filter} options={widgets.pyramid.options} settings={widgets.pyramid.settings} />
          <TimelineWidget wgtId="timeline" resourceId={this.state.zoomed ? Meteor.settings.public.populationData : Meteor.settings.public.regionData} pipeline={timePipe}  />
          <MinimapWidget wgtId="minimap" mapId={this.state.zoomed ? Meteor.settings.public.lsoaGeo : Meteor.settings.public.countyGeo} mapFilter={widgets.minimap.filter} options={widgets.minimap.options} key={this.state.lsoa.id} />
          <FloatingActionButton onClick={this.share}>
            <Share />
          </FloatingActionButton>
        </div>
        
      </div>
    );
  }
}

Demand.propTypes = {
  data: React.PropTypes.array.isRequired,
  centre: React.PropTypes.object.isRequired,
  region: React.PropTypes.string.isRequired,
  initialState: React.PropTypes.object.isRequired

}

export default Demand;
