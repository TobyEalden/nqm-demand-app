import React from 'react';
import Checkbox from 'material-ui/Checkbox';


class TableFilters extends React.Component {
  constructor(props) {
    super(props);
    this.update = this.update.bind(this);
    this.state = {

      male: true,
      female: true,
      all_ages: true,
      "0-4": true,
      "5-9": true,
      "10-14": true,
      "15-19": true,
      "20-24": true,
      "25-29": true,
      "30-34": true,
      "35-39": true,
      "40-44": true,
      "45-49": true,
      "50-54": true,
      "55-59": true,
      "60-64": true,
      "65-69": true,
      "70-74": true,
      "75-79": true,
      "80-84": true,
      "85-89": true,
      "90+": true
    }
  }

  update(event, checked) {

    let state = _.clone(this.state);
    state[event.target.id] = checked;
    this.props.update(state);
    this.setState(state);
   
  }
  render() {

    return (
      <div>
        <div className="filter-row">
          <div className="filter-column">
            <Checkbox id="male"
              label="Male" 
              defaultChecked={true}
              onCheck={this.update}
              disabled={this.state.female ? false : true}
            />
          </div>
          <div className="filter-column">
            <Checkbox id="female"
              label="Female" 
              defaultChecked={true}
              onCheck={this.update}
              disabled={this.state.male ? false : true}
            />
          </div>
          <div className="filter-column">
            <Checkbox id="all_ages"
              label="All Ages" 
              defaultChecked={true}
              onCheck={this.update}
            />
          </div>
        </div>
        <div className="filter-row">
          <div className="filter-column">
            <Checkbox id="0-4"
              label="0-4" 
              defaultChecked={true}
              onCheck={this.update}
             
            />
          </div>
          <div className="filter-column">
            <Checkbox id="5-9"
              label="5-9" 
              defaultChecked={true}
              onCheck={this.update}
             
            />
          </div>
          <div className="filter-column">
            <Checkbox id="10-14"
              label="10-14" 
              defaultChecked={true}
              onCheck={this.update}
             
            />
          </div>
        </div>
        <div className="filter-row">
          <div className="filter-column">
            <Checkbox id="15-19"
              label="15-19" 
              defaultChecked={true}
              onCheck={this.update}
             
            />
          </div>
          <div className="filter-column">
            <Checkbox id="20-24"
              label="20-24" 
              defaultChecked={true}
              onCheck={this.update}
             
            />
          </div>
          <div className="filter-column">
            <Checkbox id="25-29"
              label="25-29" 
              defaultChecked={true}
              onCheck={this.update}
             
            />
          </div>
        </div>
        <div className="filter-row">
          <div className="filter-column">
            <Checkbox id="30-34"
              label="30-34" 
              defaultChecked={true}
              onCheck={this.update}
             
            />
          </div>
          <div className="filter-column">
            <Checkbox id="35-39"
              label="35-39" 
              defaultChecked={true}
              onCheck={this.update}
             
            />
          </div>
          <div className="filter-column">
            <Checkbox id="40-44"
              label="40-44" 
              defaultChecked={true}
              onCheck={this.update}
             
            />
          </div>
        </div>
        <div className="filter-row">
          <div className="filter-column">
            <Checkbox id="45-49"
              label="45-49" 
              defaultChecked={true}
              onCheck={this.update}
             
            />
          </div>
          <div className="filter-column">
            <Checkbox id="50-54"
              label="50-54" 
              defaultChecked={true}
              onCheck={this.update}
             
            />
          </div>
          <div className="filter-column">
            <Checkbox id="55-59"
              label="55-59" 
              defaultChecked={true}
              onCheck={this.update}
             
            />
          </div>
        </div>
        <div className="filter-row">
          <div className="filter-column">
            <Checkbox id="60-64"
              label="60-64" 
              defaultChecked={true}
              onCheck={this.update}
             
            />
          </div>
          <div className="filter-column">
            <Checkbox id="65-69"
              label="65-69" 
              defaultChecked={true}
              onCheck={this.update}
             
            />
          </div>
          <div className="filter-column">
            <Checkbox id="70-74"
              label="70-74" 
              defaultChecked={true}
              onCheck={this.update}
             
            />
          </div>
        </div>
        <div className="filter-row">
          <div className="filter-column">
            <Checkbox id="75-79"
              label="75-79" 
              defaultChecked={true}
              onCheck={this.update}
             
            />
          </div>
          <div className="filter-column">
            <Checkbox id="80-84"
              label="80-84" 
              defaultChecked={true}
              onCheck={this.update}
             
            />
          </div>
          <div className="filter-column">
            <Checkbox id="85-89"
              label="85-89" 
              defaultChecked={true}
              onCheck={this.update}
             
            />
          </div>
        </div>
        <div className="filter-row">
          <div className="filter-column">
            <Checkbox id="90+"
              label="90+" 
              defaultChecked={true}
              onCheck={this.update}
             
            />
          </div>
        </div>
       
      </div>
    );
  }
}

TableFilters.propTypes = {
  update: React.PropTypes.func
};

export default TableFilters;