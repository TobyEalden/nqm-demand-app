import React from "react";
import {Meteor} from "meteor/meteor";

import MapWidget from "../containers/map-container";
import PyramidWidget from "../containers/pyramid-container";
import TimelineWidget from "../containers/timeline-container";
import LsoaDetails from "./lsoa-details";
import YearSlider from "./year-slider";
import MapToggle from "./map-toggle";
import Panel from "./panel";

_ = lodash;

class Demand extends React.Component {

  constructor(props) {
    super(props);

    this.setYear = this.setYear.bind(this);
    this.setLsoa = this.setLsoa.bind(this);
    this.toggleMapMode = this.toggleMapMode.bind(this);

    this.state = {
      widgets: {
        map: {
          filter: {
            "area_id": {
              "$in":props.lsoas
            },
            "age_band": {
              "$eq":"All Ages"
            }
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
            ]
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
          }
        },
        timeline: {
          filter: {
            "area_id": {
              "$eq": props.lsoas[0]
            }, 
            "age_band": {
              "$eq":"All Ages"
            }
          },          
          options: {
            limit: 1000
          },
          settings: {
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

  render() {
    
    let widgets = this.state.widgets;
    
    return (
      <div>
        <Panel>
          <MapWidget wgtId="map" mapId={Meteor.settings.public.lsoaGeo} resourceId={Meteor.settings.public.populationData} mapFilter={{"properties.LSOA11CD":{"$in":this.props.lsoas}}} filter={widgets.map.filter} options={widgets.map.options} centre={this.props.centre} update={this.setLsoa} settings={widgets.map.settings} />
          <YearSlider update={this.setYear}/>
          <MapToggle update={this.toggleMapMode} />
        </Panel>
        <Panel>
          <LsoaDetails name={this.state.lsoa.name} id={this.state.lsoa.id} population={this.state.lsoa.population} area={this.state.lsoa.area} />
          <PyramidWidget wgtId="pyramid" resourceId={Meteor.settings.public.populationData} filter={widgets.pyramid.filter} options={widgets.pyramid.options}  />
          <TimelineWidget wgtId="timeline" resourceId={Meteor.settings.public.populationData} filter={widgets.timeline.filter} options={widgets.timeline.options} />
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
