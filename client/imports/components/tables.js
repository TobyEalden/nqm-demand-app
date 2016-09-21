import React from "react";
import { Meteor } from "meteor/meteor"

import TableData from "../containers/table-data-container";
import TableFilters from "./table-filters";

_ = lodash;

class Tables extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      filter: {
        "area_id": {
          "$in":[props.data[0]]
        },
        "age_band": {
          "$in": [
            "All Ages"
          ]
        },
        "gender": {
            "$in": [
              "male", "female"
            ]
        },
        "year": {
          "$in": [
            new Date().getFullYear().toString()
          ]
        }
          
      },
      headers: [{label:"Persons", key: "persons"}, {label:"Year", key:"year"}, {label:"Area Name", key:"area_name"}, {label:"LSOA ID", key:"_id"}],
      pipeline: ""
    }
    this.state.pipeline = '[{"$match":{"area_id":' + JSON.stringify(this.state.filter.area_id) + ',"gender":' + JSON.stringify(this.state.filter.gender) + ',"age_band":' + JSON.stringify(this.state.filter.age_band) + ',"year":' + JSON.stringify(this.state.filter.year) + '}},{"$group":{"_id":{"area_id":"$area_id","year":"$year"},"year":{"$push":"$year"},"area_name":{"$push":"$area_name"},"persons":{"$sum":"$persons"}}}]';

    this.setFilters = this.setFilters.bind(this);
  }

   setFilters(newFilter) {

    let headers = [{label:"Persons", key: "persons"}, {label:"Year", key: newFilter.aggregates._id.selected ? "_id" : "year"}];

    headers = _.concat(headers, _.map(_.pickBy(newFilter.aggregates, (o) => {

      return !o.selected;
    }), (val, key) =>{
      return {label: val.label, key: key};
    }));
    if (!newFilter.aggregates._id.selected) headers.push({label:"Area Name", key:"area_name"});

    let filter = _.cloneDeep(this.state.filter);
    filter.gender["$in"] = newFilter.gender.split(",");
    filter.age_band["$in"] = newFilter.bands.split(",");
    filter.area_id["$in"] = newFilter.lsoas.split(",");
    filter.year["$in"] = newFilter.years.split(",");

    let pipeline = '[{"$match":{"area_id":' + JSON.stringify(filter.area_id) + ',"gender":' + JSON.stringify(filter.gender) + ',"age_band":' + JSON.stringify(filter.age_band) + ',"year":' + JSON.stringify(filter.year) + '}},{"$group":{"_id":';
    pipeline += newFilter.aggregates._id.selected ? '{"year":"$year"' : '{"area_id":"$area_id","year":"$year"';
    pipeline += newFilter.aggregates.age_band.selected ? "" : ',"age_band":"$age_band"';
    pipeline += newFilter.aggregates.gender.selected ? "" : ',"gender":"$gender"';
    pipeline += "},";
    pipeline += newFilter.aggregates._id.selected ? '"area_id":{"$push":"$area_id"},' : '"year":{"$push":"$year"},';
    pipeline += '"area_name":{"$push":"$area_name"},';
    pipeline += '"gender":{"$push":"$gender"},';
    pipeline += '"age_band":{"$push":"$age_band"},';
    pipeline += '"persons":{"$sum":"$persons"}}}]';

    this.setState({
      filter: filter,
      pipeline: pipeline,
      headers: headers
    });

  }


  render() {

    return (
      <div id="main-container">
        <TableFilters lsoas={this.props.data} update={this.setFilters} />
        <TableData headers={this.state.headers} resourceId={Meteor.settings.public.populationData} pipeline={this.state.pipeline}  />
      </div>
    )
  }
}

Tables.propTypes = {
  data: React.PropTypes.array.isRequired
};

export default Tables;