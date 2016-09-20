import React from "react";
import {Card, CardTitle, CardText} from 'material-ui/Card';

class LsoaDetails extends React.Component {
  

  render() {
    const lsoa = this.props.lsoa;
    if (lsoa.name == "") return (<div></div>);
    return (
      <Card className="wgt-card">
        <CardTitle title={lsoa.name + " | " + lsoa.id} />
        <CardText>
          Population: {lsoa.population} | Area: {Math.floor(lsoa.area/1000000)} km<sup>2</sup>
        </CardText>
      </Card>
    );
  }

}

LsoaDetails.propTypes = {
  lsoa: React.PropTypes.object.isRequired
};

export default LsoaDetails;