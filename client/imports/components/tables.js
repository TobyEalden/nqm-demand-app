import React from "react";

import TableData from "../containers/table-data-container";
import Filters from "./filters";

class Tables extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      filter: {
        "area_id": {
              "$in":props.lsoas
            }
      },
      options: {
        sort: {area_id:-1, year: -1},
        limit: 2500
      },
      settings: {
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
    }

    this.setFilters = this.setFilters.bind(this);
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

    let settings = _.cloneDeep(this.state.settings);

    settings.gender["$in"] = gender;
    settings.age_band["$in"] = age_bands;

    this.setState({
      settings: settings
    });

  }


  render() {
    let headers = ["area id", "area name", "population"];
    return (
      <div>
        <Filters update={this.setFilters} />
        <TableData headers={headers} resourceId={Meteor.settings.public.populationData} filter={this.state.filter} options={this.state.options} settings={this.state.settings} />
      </div>
    )
  }
}

Tables.propTypes = {
  lsoas: React.PropTypes.array.isRequired
};

export default Tables;