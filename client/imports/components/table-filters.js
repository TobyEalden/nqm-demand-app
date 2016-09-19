import React from 'react';
import Select from 'react-select';
import {Meteor} from "meteor/meteor";
import Checkbox from 'material-ui/Checkbox';
import RaisedButton from 'material-ui/RaisedButton';

// Be sure to include styles at some point, probably during your bootstrapping
import 'react-select/dist/react-select.css';


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
      gender: "male,female",
      bands: "All Ages",
      years: new Date().getFullYear().toString(),
      lsoas: props.lsoas[0],
      bandOptions: _.map(Meteor.settings.public.allAgeBands, (val) => {
        return { value: val, label: val};
      }),
      yearOptions: _.map(Meteor.settings.public.years, (val) => {
        return { value: val, label: val};
      }),
      lsoaOptions: _.map(props.lsoas, (val) => {
        return { value: val, label: val};
      }),
      genderOptions: [ {value: "male", label: "Male"}, {value: "female", label: "Female"}],
      aggregates: {age_band: {selected: true, label: "Age Bands"},gender: {selected: true, label: "Genders"},_id: {selected: false, label: "LSOA ID"}}

    }
    this.state.bandOptions.push({value: "All Ages", label: "All Ages"});
  }

  updateAggregates(event, checked) {
    let state = _.clone(this.state);
    state.aggregates[event.target.id].selected = checked;
    this.props.update(state);
    this.setState(state); 
  }

  updateBand(values) {
    if ((values.indexOf("All Ages") != -1) && (values != "All Ages")) {
      if (this.state.bands.indexOf("All Ages") != -1) values = values.replace("All Ages", "");
      else values = "All Ages";
    }
    let state = _.clone(this.state);
    state.bands = values;
    this.props.update(state);
    this.setState(state);
    
  }

  updateGender(values) {
    let state = _.clone(this.state);
    state.gender = values;
    this.props.update(state);
    this.setState(state);
  }

  updateYears(values) {
    let state = _.clone(this.state);
    state.years = values;
    this.props.update(state);
    this.setState(state);
  }

  updateLsoas(values) {
    let state = _.clone(this.state);
    state.lsoas = values;
    this.props.update(state);
    this.setState(state);
  }
  
  selectAllAges() {
    let state = _.clone(this.state);
    state.bands = "";
    _.each(Meteor.settings.public.allAgeBands, (band) => {
      state.bands += band + ",";
    });   
    this.props.update(state);
    this.setState(state);
  }

  selectAllLsoas() {
    let state = _.clone(this.state);
    state.lsoas = "";
    _.each(this.props.lsoas, (lsoa) => {
      state.lsoas += lsoa + ",";
    });   
    this.props.update(state);
    this.setState(state);
  }

  selectAllYears() {
    let state = _.clone(this.state);
    state.years = "";
    _.each(Meteor.settings.public.years, (year) => {
      state.years += year + ",";
    });   
    this.props.update(state);
    this.setState(state);
  }

  render() {
 
    return (
      <div id="controls">
        <div className="filter-column">
          <Select multi simpleValue value={this.state.bands} placeholder="Select your age band(s)" options={this.state.bandOptions} onChange={this.updateBand} />

          <RaisedButton id="all_ages" label="Select All" onClick={this.selectAllAges} />   

          <Checkbox id="age_band"
            label="Aggregate Age Bands" 
            defaultChecked={true}
            onCheck={this.updateAggregates}
          />
        </div>
        <div className="filter-column"> 
          <Select multi simpleValue value={this.state.gender} placeholder="Select gender(s)" options={this.state.genderOptions} onChange={this.updateGender} />

          <Checkbox id="gender"
            label="Aggregate Genders" 
            defaultChecked={true}
            onCheck={this.updateAggregates}
          />
        </div>
        <div className="filter-column"> 
          <Select multi simpleValue value={this.state.lsoas} placeholder="Select LSOA(s)" options={this.state.lsoaOptions} onChange={this.updateLsoas} />

          <RaisedButton id="all_lsoas" label="Select All" onClick={this.selectAllLsoas} />

          <Checkbox id="_id"
            label="Aggregate LSOAs" 
            defaultChecked={false}
            onCheck={this.updateAggregates}
          />
        </div>
        <div className="filter-column"> 
          <Select multi simpleValue value={this.state.years} placeholder="Select Year(s)" options={this.state.yearOptions} onChange={this.updateYears} />      

          <RaisedButton id="all_years" label="Select All" onClick={this.selectAllYears} /> 
        </div>
      </div>
    );
  }
}

TableFilters.propTypes = {
  update: React.PropTypes.func,
  lsoas: React.PropTypes.array
};

export default TableFilters;