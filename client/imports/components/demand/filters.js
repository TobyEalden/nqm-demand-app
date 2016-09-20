import React from 'react';
import {Meteor} from "meteor/meteor";
import Checkbox from 'material-ui/Checkbox';
import RaisedButton from 'material-ui/RaisedButton';
import Select from 'react-select';
// Be sure to include styles at some point, probably during your bootstrapping
import 'react-select/dist/react-select.css';

class Filters extends React.Component {
  constructor(props) {
    super(props);
    this.update = this.update.bind(this);
    this.updateBand = this.updateBand.bind(this);
    this.selectAllAges = this.selectAllAges.bind(this);
    this.state = {

      male: true,
      female: true,
      bands: "All Ages",
      bandOptions: _.map(Meteor.settings.public.allAgeBands, (val) => {
        return { value: val, label: val};
      })
    }
    this.state.bandOptions.push({value: "All Ages", label: "All Ages"});
  }

  update(event, checked) {

    let state = _.clone(this.state);
    state[event.target.id] = checked;
    this.props.update(state);
    this.setState(state);
   
  }
  updateBand(values) {
    if ((values.indexOf("All Ages") != -1) && (values != "All Ages")) {
      if (this.state.bands.indexOf("All Ages") != -1) values = values.replace("All Ages", "");
      else values = "All Ages";
    }
    if (values === "") values = "All Ages";
    let state = _.clone(this.state);
    state.bands = values;
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

  render() {

    return (
      <div>
        <div className="control-group">
          <Checkbox id="male"
          label="Male" 
          defaultChecked={true}
          onCheck={this.update}
          disabled={this.state.female ? false : true}
          />

          <Checkbox id="female"
          label="Female" 
          defaultChecked={true}
          onCheck={this.update}
          disabled={this.state.male ? false : true}
          />
        </div>
        <div className="select-filter">
          <Select multi simpleValue value={this.state.bands} placeholder="Select your age band(s)" options={this.state.bandOptions} onChange={this.updateBand} />
        </div>

        <RaisedButton id="all_ages" label="Select All" onClick={this.selectAllAges} />

        

       
      </div>
    );
  }
}

Filters.propTypes = {
  update: React.PropTypes.func
};

export default Filters;