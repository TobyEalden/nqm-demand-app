import React from "react";

_ = lodash;

class TableData extends React.Component {



  render() {


    const headers = _.map(this.props.headers, (header) => {
      return <th key={header}>{header}</th>;
    });
    const rows = _.map(this.props.data, (row) => {
     if (this.props.settings.age_band["$in"].indexOf(row.age_band) != -1 && this.props.settings.gender["$in"].indexOf(row.gender) != -1) {
        return (
          <tr key={row._id._str}>
            <td>{row.area_id}</td>
            <td>{row.area_name}</td>
            <td>{row.persons}</td>
          </tr>
        )
      }
    });

    return(
      <table>
        <thead>
          <tr>
            {headers}
          </tr>
        </thead>
        <tbody>
          {rows}
        </tbody>
      </table>
    )
  }

}

TableData.propTypes = {
  data: React.PropTypes.array,
  headers: React.PropTypes.array,
  settings: React.PropTypes.object
};

export default TableData;