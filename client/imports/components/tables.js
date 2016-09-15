import React from "react";
import { Meteor } from "meteor/meteor"

import TableData from "../containers/table-data-container";
import TableFilters from "./table-filters";

class Tables extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      filter: {
        "area_id": {
          "$in":props.lsoas
        },
        "age_band": {
          "$in": Meteor.settings.public.allAgeBands
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
      }
    }

    this.setFilters = this.setFilters.bind(this);
  }

   setFilters(filters) {
    let gender = [];
    if(filters.male) gender.push("male");
    if(filters.female) gender.push("female");

    let age_bands = _.map(filters.bands, (enabled, band) => {
        if (enabled) return band;
      });


    let settings = _.cloneDeep(this.state.settings);

    settings.gender["$in"] = gender;
    settings.age_band["$in"] = age_bands;

    this.setState({
      settings: settings
    });

  }


  render() {
    const pipeline = '[{"$match":{"area_id":{"$in":' + JSON.stringify(this.props.data) + '},"gender":' + JSON.stringify(this.state.filter.gender) + ',"age_band":' + JSON.stringify(this.state.filter.age_band) + '}}]';

    let headers = [{label:"area id", key: "area_id"}, {label:"area name", key: "area_name"}, {label:"persons", key: "persons"}, {label:"gender", key: "gender"}, {label:"age band", key: "age_band"}];
    return (
      <div>
        <TableFilters update={this.setFilters} />
        <TableData headers={headers} resourceId={Meteor.settings.public.populationData} pipeline={this.state.filter} settings={this.state.settings} />
      </div>
    )
  }
}

Tables.propTypes = {
  data: React.PropTypes.array.isRequired
};

export default Tables;