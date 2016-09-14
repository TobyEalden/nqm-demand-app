import React from "react";
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';

class LsoaDetails extends React.Component {
  

  render() {
   if (this.props.name == "") return (<div></div>);
    return (
      <Card className="wgt-card">
        <CardTitle title={this.props.name + " | " + this.props.id} />
        <CardText>
          Population: {this.props.population} | Area: {Math.floor(this.props.area/1000000)} km<sup>2</sup>
        </CardText>
      </Card>
    );
  }

}

LsoaDetails.propTypes = {
  name: React.PropTypes.string.isRequired,
  id: React.PropTypes.string.isRequired,
  population: React.PropTypes.number.isRequired,
  area: React.PropTypes.number.isRequired
};

export default LsoaDetails;