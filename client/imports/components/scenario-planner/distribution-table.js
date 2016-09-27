import React from "react";
import { Meteor } from "meteor/meteor";

import { Table, Tr, Thead, Th, Td } from "reactable";
import NumberField from 'react-number-field';
import IconButton from 'material-ui/IconButton';
import Locked from "material-ui/svg-icons/action/lock";
import Unlocked from "material-ui/svg-icons/action/lock-open";

_ = lodash;

class DistributionTable extends React.Component {

  constructor(props) {
    super(props);
    this.toggleLockMale = this.toggleLockMale.bind(this);
    this.toggleLockFemale = this.toggleLockFemale.bind(this);
    this.updateMale = this.updateMale.bind(this);
    this.updateFemale = this.updateFemale.bind(this);
  }

  toggleLockMale(event) {
    let found = false;
    let elem = event.target.parentNode;
    while (!found) {
      if (elem.id != "") found = true;
      else elem = elem.parentNode;
    }
    this.props.toggleLock(true, elem.id);
  }

  toggleLockFemale(event) {
    let found = false;
    let elem = event.target.parentNode;
    while (!found) {
      if (elem.id != "") found = true;
      else elem = elem.parentNode;
    }
    this.props.toggleLock(false, elem.id);
  }

  updateMale(value, event) {
    let val = parseInt(value, 10);
    if (value === "") val = 0;
    this.props.update(true, event.target.id, val/100);
  }
  
  updateFemale(value, event) {
    let val = parseInt(value, 10);
    if (value === "") val = 0;
    this.props.update(false, event.target.id, val/100);
  }

  render() {

    const rows = _.map(this.props.data, (row) =>{
      let maxValue = 1;
      _.each(this.props.data, (item) => {
        if (item.age_band != row.age_band) {
          if (item.lockedFemale) maxValue -= item.female;
          if (item.lockedMale) maxValue -= item.male;
        }
      });
      return (
        <Tr key={row.range}>
          <Td column="lockedMale"><IconButton id={row.range} onClick={this.toggleLockMale}>{row.lockedMale ? <Locked /> : <Unlocked />}</IconButton></Td>
          <Td column="male">
            <NumberField id={row.range} onChange={this.updateMale} minValue={0} maxValue={maxValue*100} allowNegative={false} value={row.male*100} disabled={!row.lockedMale}/>
          </Td>
          <Td column="age_band">{row.range}</Td>
          <Td column="female">
            <NumberField id={row.range} onChange={this.updateFemale} minValue={0} maxValue={maxValue*100} allowNegative={false} value={row.female*100} disabled={!row.lockedFemale}/>
          </Td>
          <Td column="lockedFemale"><IconButton id={row.range} onClick={this.toggleLockFemale}>{row.lockedFemale ? <Locked /> : <Unlocked />}</IconButton></Td>
        </Tr>
      );

    });

    return (
      <Table>
        <Thead>
          <Th column="lockedMale">Locked</Th>
          <Th column="male">Male Percentage</Th>
          <Th column="age_band">Age Band</Th>
          <Th column="female">Female Percentage</Th>
          <Th column="lockedFemale">Locked</Th>
        </Thead>
        {rows}
      </Table>
    );
  }


}

DistributionTable.propTypes = {
  update: React.PropTypes.func.isRequired,
  toggleLock: React.PropTypes.func.isRequired,
  data: React.PropTypes.array.isRequired
};

export default DistributionTable;