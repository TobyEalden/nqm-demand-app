import React from "react";

import SelectField from "material-ui/SelectField";
import MenuItem from "material-ui/MenuItem";

_ = lodash;

class TableSelect extends React.Component {

  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event, key, value) {
    this.props.update(value, false);
  }


  render() {
    const options = _.map(this.props.options, (option) => {
      return <MenuItem key={option.value} value={option.value} primaryText={option.primaryText} />;
    });
   
    return(
   
      <SelectField className="select-field" hintText={this.props.hint} onChange={this.handleChange}>
        {options}
      </SelectField>

    );

  }

}

TableSelect.propTypes = {
  options: React.PropTypes.array.isRequired,
  update: React.PropTypes.func.isRequired,
  hint: React.PropTypes.string.isRequired
};

export default TableSelect;