import React from "react";
import { Table, Tr, Thead, Th, Td } from "Reactable";

_ = lodash;

class TableData extends React.Component {

  shouldComponentUpdate(nextProps) {
    if (nextProps.data === this.props.data) return false;
    else return true;
  }


  render() {
    console.log(this.props.data);

    const headers = _.map(this.props.headers, (header) => {
      return <Th key={header.key} column={header.key}>{header.label}</Th>;
    });
    const rows = _.map(this.props.data, (row) => {
        const tds = _.map(row, (col, key) => {
          if(typeof col != "object") return (<Td key={key} column={key}>{col.toString()}</Td>);
          else if (key === "_id") return (<Td key={key} column={key}>{col.area_id}</Td>);
          else return (<Td key={key} column={key}>{col[0]}</Td>);

        });

        return (
          <Tr key={row._id}>
            {tds}
          </Tr>
        )
      }
    );

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