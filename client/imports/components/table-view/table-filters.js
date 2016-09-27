import React from "react";
import {Meteor} from "meteor/meteor";

import Select from "react-select";
import Checkbox from "material-ui/Checkbox";
import RaisedButton from "material-ui/RaisedButton";
import Paper from 'material-ui/Paper';

// Be sure to include styles at some point, probably during your bootstrapping
import "react-select/dist/react-select.css";

import TableSelect from "./table-select";
import TableChips from "./table-chips";


class TableFilters extends React.Component {
  constructor(props) {
    super(props);
    this.updateAggregates = this.updateAggregates.bind(this);
    this.updateBand = this.updateBand.bind(this);
    this.updateGender = this.updateGender.bind(this);
    this.updateYears = this.updateYears.bind(this);
    this.updateLsoas = this.updateLsoas.bind(this);
    this.selectAllAges = this.selectAllAges.bind(this);
    this.selectAllLsoas = this.selectAllLsoas.bind(this);
    this.selectAllYears = this.selectAllYears.bind(this);
    this.state = {
      gender: ["male", "female"],
      bands: ["All Ages"],
      years: [new Date().getFullYear().toString()],
      lsoas: [props.lsoas[0]],
      bandOptions: _.map(Meteor.settings.public.allAgeBands, (val) => {
        return { value: val, primaryText: val};
      }),
      yearOptions: _.map(Meteor.settings.public.years, (val) => {
        return { value: val, primaryText: val};
      }),
      lsoaOptions: _.map(props.lsoas, (val) => {
        return { value: val, primaryText: val};
      }),
      genderOptions: [ {value: "male", primaryText: "Male"}, {value: "female", primaryText: "Female"}],
      aggregates: {age_band: {selected: true, label: "Age Bands"},gender: {selected: true, label: "Genders"},_id: {selected: false, label: "LSOA ID"}}

    }
    this.state.bandOptions.push({value: "All Ages", primaryText: "All Ages"});
  }

  updateAggregates(event, checked) {
    let state = _.clone(this.state);
    state.aggregates[event.target.id].selected = checked;
    this.props.update(state);
    this.setState(state); 
  }

  updateBand(value, remove) {
    let state = _.clone(this.state);
    if (this.state.aggregates.age_band.selected) { // Prevent all ages and other selections if we are not aggregating
      if (value === "All Ages") {
        if (remove) state.bands = [];
        else state.bands = ["All Ages"];
      }
      else {
        if (state.bands.indexOf("All Ages") != -1) state.bands = [value];
        else {
          if (remove) _.remove(state.bands, (band) => {
            if (band === value) return true;
            else return false;
          });
          else state.bands.push(value);
        }
      }
    }
    else {
      if (remove) _.remove(state.bands, (band) => {
        if (band === value) return true;
        else return false;
      });
      else state.bands.push(value);
    }
    this.props.update(state);
    this.setState(state);
    
  }

  updateGender(value, remove) {
    let state = _.clone(this.state);
    if (remove) {
      _.remove(state.gender, (gender) => {
        if (gender === value) return true;
        else return false;
      });
    }
    else state.gender.push(value);
    this.props.update(state);
    this.setState(state);
  }

  updateYears(value, remove) {
    let state = _.clone(this.state);
    if (remove) {
      _.remove(state.years, (year) => {
        if (year === value) return true;
        else return false;
      });
    }
    else state.years.push(value);
    this.props.update(state);
    this.setState(state);
  }

  updateLsoas(value, remove) {
    let state = _.clone(this.state);
    if (remove) {
      _.remove(state.lsoas, (lsoa) => {
        if (lsoa === value) return true;
        else return false;
      });
    }
    else state.lsoas.push(value);
    this.props.update(state);
    this.setState(state);
  }
  
  selectAllAges() {
    let state = _.clone(this.state);
    state.bands = Meteor.settings.public.allAgeBands; 
    this.props.update(state);
    this.setState(state);
  }

  selectAllLsoas() {
    let state = _.clone(this.state);
    state.lsoas = this.props.lsoas;
    this.props.update(state);
    this.setState(state);
  }

  selectAllYears() {
    let state = _.clone(this.state);
    state.years = Meteor.settings.public.years;   
    this.props.update(state);
    this.setState(state);
  }

  render() {
 
    return (
      <div id="table-controls">

        <Paper className="control-set">
          <div className="control-select">
            <TableSelect options={this.state.bandOptions} update={this.updateBand} hint="Select Age Bands"/>
            <div className="control-buttons">
              <RaisedButton id="all_ages" label="Select All" onClick={this.selectAllAges} />   
              <Checkbox id="age_band"
                label="Aggregate" 
                defaultChecked={true}
                onCheck={this.updateAggregates}
              />
            </div>
          </div>
          <TableChips selected={this.state.bands} update={this.updateBand} />     
        </Paper>
        <Paper className="control-set">
          <div className="control-select">
            <TableSelect options={this.state.genderOptions} update={this.updateGender} hint="Select Genders" />
            <div className="control-buttons">
              <Checkbox id="gender"
              label="Aggregate" 
              defaultChecked={true}
              onCheck={this.updateAggregates}
              />
            </div>
          </div>
          <TableChips selected={this.state.gender} update={this.updateGender} />
        </Paper>
        <Paper className="control-set">
          <div className="control-select">
            <TableSelect options={this.state.lsoaOptions} selected={this.state.lsoas} update={this.updateLsoas} hint="Select LSOAs" />
            <div className="control-buttons">
              <RaisedButton id="all_lsoas" label="Select All" onClick={this.selectAllLsoas} />
              <Checkbox id="_id"
                label="Aggregate" 
                defaultChecked={false}
                onCheck={this.updateAggregates}
              />
            </div>
          </div>
          <TableChips selected={this.state.lsoas} update={this.updateLsoas} />
        </Paper>
        <Paper className="control-set">
          <div className="control-select">
            <TableSelect options={this.state.yearOptions} selected={this.state.years} update={this.updateYears} hint="Select Years" />
            <div className="control-buttons">
              <RaisedButton id="all_years" label="Select All" onClick={this.selectAllYears} /> 
            </div>
          </div>
          <TableChips selected={this.state.years} update={this.updateYears} />
        </Paper>

      </div>
    );
  }
}

TableFilters.propTypes = {
  update: React.PropTypes.func,
  lsoas: React.PropTypes.array
};

export default TableFilters;