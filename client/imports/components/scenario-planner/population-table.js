import React from "react";
import { Meteor } from "meteor/meteor";

import { Table, Tr, Thead, Th, Td } from "Reactable";
import NumberField from 'react-number-field';
import IconButton from 'material-ui/IconButton';

_ = lodash;

class PopulationTable extends React.Component {
}

PopulationTable.propTypes = {
  update: React.PropTypes.func.isRequired,
  data: React.PropTypes.array.isRequired
};

export default PopulationTable;