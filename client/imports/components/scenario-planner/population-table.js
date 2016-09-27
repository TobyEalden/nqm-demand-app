import React from "react";
import { Meteor } from "meteor/meteor";

import { Table, Tr, Thead, Th, Td } from "reactable";
import NumberField from 'react-number-field';
import IconButton from 'material-ui/IconButton';
import Delete from "material-ui/svg-icons/action/delete";
import Increase from "material-ui/svg-icons/hardware/keyboard-arrow-up";
import Decrease from "material-ui/svg-icons/hardware/keyboard-arrow-down";
import {red800, green800} from 'material-ui/styles/colors';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';

_ = lodash;

class PopulationTable extends React.Component {

  constructor(props) {
    super(props);
    this.remove = this.remove.bind(this);
    this.add = this.add.bind(this);
    this.update = this.update.bind(this);
  }

  remove(event) {
    let found = false;
    let elem = event.target.parentNode;
    while (!found) {
      if (elem.id != "") found = true;
      else elem = elem.parentNode;
    }
    this.props.remove(parseInt(elem.id,10));
    
  }

  add() {
    const lastYear = this.props.data[this.props.data.length - 1];
    this.props.add(parseInt(lastYear.year, 10) +1, lastYear.population);
  }
  
  update(value, event) {
    let val = parseInt(value, 10)
    if (value === "") val = 0;
    this.props.update(parseInt(event.target.id,10), val);
  }

  render() {
    
    const rows = _.map(this.props.data, (row, index) =>{
      let delta = row.population;
      if (index > 0) delta = row.population - this.props.data[index-1].population;
      let increase = true;
      if (delta < 0) increase = false;
      let deletable = false;
      if ((index === 0) || (index === (this.props.data.length - 1))) deletable = true;

      return (
        <Tr key={row.year}>
          <Td column="year">{row.year}</Td>
          <Td column="population"><NumberField id={row.year} onChange={this.update} minValue={0} allowNegative={false} value={row.population} allowFloat={false}/></Td>
          <Td column="delta">{Math.abs(delta)}</Td>
          <Td column="symbol">{increase ? <Increase color={green800} /> : <Decrease color={red800}/>}</Td>
          <Td column="delete"><IconButton id={row.year} disabled={!deletable} onClick={this.remove}>{<Delete />}</IconButton></Td>
        </Tr>
      );
    });
    return (
      <div>
        <Table>
          <Thead>
            <Th column="year">Year</Th>
            <Th column="population">Total Population</Th>
            <Th column="delta">Change</Th>
            <Th column="symbol"> </Th>
            <Th column="delete">Delete</Th>
          </Thead>
          {rows}
        </Table>
        <FloatingActionButton onClick={this.add}>
          <ContentAdd />
        </FloatingActionButton>
      </div>
    );
  }
}

PopulationTable.propTypes = {
  update: React.PropTypes.func.isRequired,
  data: React.PropTypes.array.isRequired,
  remove: React.PropTypes.func.isRequired,
  add: React.PropTypes.func.isRequired
};

export default PopulationTable;