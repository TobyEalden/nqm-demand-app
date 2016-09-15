import React from "react";
import {Meteor} from "meteor/meteor";

import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import MapWidget from "../containers/map-container";
import PyramidWidget from "../containers/pyramid-container";
import TimelineWidget from "../containers/timeline-container";
import LsoaDetails from "./lsoa-details";
import YearSlider from "./year-slider";
import MapToggle from "./map-toggle";
import Filter from "./filters";
import Panel from "./panel";

_ = lodash;

class Demand extends React.Component {

  constructor(props) {
    super(props);

    this.setYear = this.setYear.bind(this);
    this.setLsoa = this.setLsoa.bind(this);
    this.toggleMapMode = this.toggleMapMode.bind(this);
    this.setFilters = this.setFilters.bind(this);

    this.state = {
      widgets: {
        map: {
          filter: {
            "area_id": {
              "$in": props.data
            },
            "age_band": {
              "$in": [
                "All Ages"
              ]
            },
            year: {
              "$in": [
              new Date().getFullYear().toString(),
              new Date().getFullYear().toString()
             ]
            },
            "gender": {
              "$in": [
                "male", "female"
              ]
            }
          },
          options: {
            sort: {area_id:-1, year: -1},
            limit: 2500
          },
          settings: {
            delta: false,
          }
        },
        pyramid: {
          filter: {
            "area_id": {
              "$eq": props.data[0]
            },
            "year": {
              "$eq": new Date().getFullYear().toString()
            }
          },
          options: {
            limit: 1000
          },
          settings: {
            "age_band": {
              "$in": Meteor.settings.public.allAgeBands
            },
            "gender": {
              "$in": [
                "male", "female"
              ]
            }
          }
        },
        timeline: {
          filter: {
            "area_id": {
              "$eq": props.data[0]
            }
          },          
          options: {
            limit: 1000
          },
          settings: {
            "age_band": {
              "$in": Meteor.settings.public.allAgeBands
            }, 
            "gender": {
              "$in": [
                "male", "female"
              ]
            }
          }
        }
      },
      lsoa: {
        id: "",
        name: "",
        population: 0,
        area: 0
      }
    };

  }

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
    this.setState({
      widgets: widgets,
      lsoa: lsoa
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

    let age_bands = [];
    if(filters.all_ages) age_bands.push("All Ages")
    else {
      age_bands = _.map(filters.bands, (enabled, band) => {
        if (enabled) return band;
      });
    }

    let widgets = _.cloneDeep(this.state.widgets);

    widgets.map.filter.gender["$in"] = gender;
    widgets.map.filter.age_band["$in"] = age_bands;

    widgets.timeline.settings.gender["$in"] = gender;
    widgets.timeline.settings.age_band["$in"] = age_bands;

    if (filters.all_ages) widgets.pyramid.settings.age_band["$in"] = Meteor.settings.public.allAgeBands;
    else widgets.pyramid.settings.age_band["$in"] = age_bands;
    widgets.pyramid.settings.gender["$in"] = gender;

    this.setState({
      widgets: widgets
    });

  }

  render() {    
    let widgets = this.state.widgets;

    const pipeline = '[{"$match":{"area_id":{"$in":' + JSON.stringify(this.props.data) + '},"year":' + JSON.stringify(widgets.map.filter.year) + ',"gender":' + JSON.stringify(widgets.map.filter.gender) + ',"age_band":' + JSON.stringify(widgets.map.filter.age_band) + '}},{"$group":{"_id":"$area_id","persons":{"$sum":"$persons"}, "year":{"$push": "$year"}}}]';
    
    return (
      <div>
        <Panel className="panel">
          <MapWidget wgtId="map" mapId={Meteor.settings.public.lsoaGeo} resourceId={Meteor.settings.public.populationData} mapFilter={{"properties.LSOA11CD":{"$in":this.props.data}}} pipeline={pipeline} filter={widgets.map.filter} options={widgets.map.options} centre={this.props.centre} update={this.setLsoa} settings={widgets.map.settings} />
          <Card className="control-card">
            <YearSlider update={this.setYear}/>
            <MapToggle update={this.toggleMapMode} />
            <Filter update={this.setFilters}/>
          </Card>
        </Panel>
        <Panel className="panel">
          <LsoaDetails name={this.state.lsoa.name} id={this.state.lsoa.id} population={this.state.lsoa.population} area={this.state.lsoa.area} />
          <PyramidWidget wgtId="pyramid" resourceId={Meteor.settings.public.populationData} filter={widgets.pyramid.filter} options={widgets.pyramid.options} settings={widgets.pyramid.settings} />
          <TimelineWidget wgtId="timeline" resourceId={Meteor.settings.public.populationData} filter={widgets.timeline.filter} options={widgets.timeline.options} settings={widgets.timeline.settings} />
        </Panel>
      </div>
    );
  }
}

Demand.propTypes = {
  data: React.PropTypes.array.isRequired,
  centre: React.PropTypes.object.isRequired
}

export default Demand;
