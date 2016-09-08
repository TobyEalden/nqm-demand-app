import React from "react";
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';

class CountyDetails extends React.Component {
  

  render() {
    var styles = {
      card: {
        margin: 20,
        padding: 20,
        width: "33%",
        position: "relative"
      }
   };
    return (
      <Card style={styles.card}>
        <CardTitle title={this.props.name} />
      </Card>
    );
  }

}

CountyDetails.propTypes = {
  name: React.PropTypes.string.isRequired,
};

export default CountyDetails;