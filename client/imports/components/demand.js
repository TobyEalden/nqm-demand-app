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
              "$in":props.lsoas
            },
            "age_band": {
              "$in": [
                "All Ages"
              ]
            },
          },
          options: {
            sort: {area_id:-1, year: -1},
            limit: 2500
          },
          settings: {
            delta: false,
            year: [
              new Date().getFullYear().toString(),
              new Date().getFullYear().toString()
            ],
            "age_band": {
              "$in": [
                "All Ages"
              ]
            },
            "gender": {
              "$in": [
                "male", "female"
              ]
            }
          }
        },
        pyramid: {
          filter: {
            "area_id": {
              "$eq": props.lsoas[0]
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
              "$eq": props.lsoas[0]
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
    widgets.map.settings.year[1] = year.toString();
    widgets.pyramid.filter.year["$eq"] = year.toString();
    this.setState({
      widgets: widgets
    });
  }

  setLsoa(id, name, population, area) {
    let widgets = _.cloneDeep(this.state.widgets);
    widgets.pyramid.filter.area_id["$eq"] = id;
    widgets.timeline.filter.area_id["$eq"] = id;
    let lsoa = _.clone(this.state.lsoa);
    lsoa.id = id;
    lsoa.name = name;
    lsoa.population = population;
    lsoa.area = area;
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
      if(filters["0-4"]) age_bands.push("0-4"); //logic for each individual age band
      if(filters["5-9"]) age_bands.push("5-9");
      if(filters["10-14"]) age_bands.push("10-14");
      if(filters["15-19"]) age_bands.push("15-19");
      if(filters["20-24"]) age_bands.push("20-24");
      if(filters["25-29"]) age_bands.push("25-29");
      if(filters["30-34"]) age_bands.push("30-34");
      if(filters["35-39"]) age_bands.push("35-39");
      if(filters["40-44"]) age_bands.push("40-44");
      if(filters["45-49"]) age_bands.push("45-49");
      if(filters["50-54"]) age_bands.push("50-54");
      if(filters["55-59"]) age_bands.push("55-59");
      if(filters["60-64"]) age_bands.push("60-64");
      if(filters["65-69"]) age_bands.push("65-69");
      if(filters["70-74"]) age_bands.push("70-74");
      if(filters["75-79"]) age_bands.push("75-79");
      if(filters["80-84"]) age_bands.push("80-84");
      if(filters["85-89"]) age_bands.push("85-89");
      if(filters["90+"]) age_bands.push("90+");
    }

    let widgets = _.cloneDeep(this.state.widgets);

    //widgets.map.filter.gender["$in"] = gender;
    //widgets.map.filter.age_band["$in"] = age_bands;

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
    
    return (
      <div>
        <Panel className="panel">
          <MapWidget wgtId="map" mapId={Meteor.settings.public.lsoaGeo} resourceId={Meteor.settings.public.populationData} mapFilter={{"properties.LSOA11CD":{"$in":this.props.lsoas}}} filter={widgets.map.filter} options={widgets.map.options} centre={this.props.centre} update={this.setLsoa} settings={widgets.map.settings} />
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
  lsoas: React.PropTypes.array.isRequired,
  centre: React.PropTypes.object.isRequired
}

export default Demand;
