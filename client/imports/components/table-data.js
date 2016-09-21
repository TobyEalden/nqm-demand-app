import React from "react";
import { Table, Tr, Thead, Th, Td } from "Reactable";
import stringify from "csv-stringify";
import RaisedButton from 'material-ui/RaisedButton';

_ = lodash;

class TableData extends React.Component {

  constructor(props) {
    super(props);
    this.exportToCSV = this.exportToCSV.bind(this);
  }

  shouldComponentUpdate(nextProps) {
    if (nextProps.data === this.props.data) return false;
    else return true;
  }

  exportToCSV() {
    let data = "";
    stringifier = stringify({delimiter: ','})
    stringifier.on('readable', function(){
      while(row = stringifier.read()){
        data += row;
      }
    });
    stringifier.on('error', function(err){
      console.log(err.message);
    });
    stringifier.on('finish', function(){
 
      const csv = new Blob([data], {
        type: 'text/csv;charset=utf8;'
      });
      const fileName = "population.csv"

      // create hidden link
      let element = document.createElement('a');
      document.body.appendChild(element);
      element.setAttribute('href', window.URL.createObjectURL(csv));
      element.setAttribute('download', fileName);
      element.style.display = '';

      element.click();

      document.body.removeChild(element);
    });
    stringifier.write(_.map(this.props.headers, (header) => {
      return header.label;
    }));
    _.each(this.props.data, (row) => {
      let ordered = [];
      _.each(this.props.headers, (header) => {
        let val = row[header.key];
        if (typeof val != "object") ordered.push(val);
        else if (header.key === "_id") {
          if (val.area_id) ordered.push(val.area_id);
          else if (val.year) ordered.push(val.year);
        }
        else ordered.push(val[0]);
      });
      stringifier.write(ordered);
    });

    stringifier.end();
  }




  render() {

    const headers = _.map(this.props.headers, (header) => {
      return <Th key={header.key} column={header.key}>{header.label}</Th>;
    });
    const rows = _.map(this.props.data, (row) => {
        const tds = _.map(row, (col, key) => {
          if(typeof col != "object") return (<Td key={key} column={key}>{col.toString()}</Td>);
          else if (key === "_id") {
            if (col.area_id) return (<Td key={key} column={key}>{col.area_id}</Td>);
            else if (col.year) return (<Td key={key} column={key}>{col.year}</Td>);
          }
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
      <div id="table-container">
        <Table className="table" id="table" itemsPerPage={50} sortable={true}>
          <Thead>
              {headers}
          </Thead>

          {rows}

        </Table>
        <RaisedButton id="export" label="Export To CSV" onClick={this.exportToCSV} />
      </div>
    )
  }

}

TableData.propTypes = {
  data: React.PropTypes.array,
  headers: React.PropTypes.array,
  settings: React.PropTypes.object
};

export default TableData;