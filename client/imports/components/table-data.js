import React from "react";
import { Table, Tr, Thead, Th, Td } from "Reactable";

_ = lodash;

class TableData extends React.Component {



  render() {


    const headers = _.map(this.props.headers, (header) => {
      return <Th key={header.key} column={header.key}>{header.name}</Th>;
    });
    const rows = _.map(this.props.data, (row) => {
     if (this.props.settings.age_band["$in"].indexOf(row.age_band) != -1 && this.props.settings.gender["$in"].indexOf(row.gender) != -1) {
        return (
          <Tr key={row._id._str}>
            <Td column="area_id">{row.area_id}</Td>
            <Td column="area_name">{row.area_name}</Td>
            <Td column="persons">{row.persons}</Td>
            <Td column="gender">{row.gender}</Td>
            <Td column="age_band">{row.age_band}</Td>
          </Tr>
        )
      }
    });

    return(
      <Table className="table" id="table" itemsPerPage={50} sortable={true}>
        <Thead>
            {headers}
        </Thead>

        {rows}

      </Table>
    )
  }

}

TableData.propTypes = {
  data: React.PropTypes.array,
  headers: React.PropTypes.array,
  settings: React.PropTypes.object
};

export default TableData;