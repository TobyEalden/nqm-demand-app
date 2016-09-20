import React from "react";
import { Card, CardTitle } from 'material-ui/Card';

class CountyDetails extends React.Component {
  

  render() {
    return (
      <Card className="card">
        <CardTitle title={this.props.name} />
      </Card>
    );
  }

}

CountyDetails.propTypes = {
  name: React.PropTypes.string.isRequired,
};

export default CountyDetails;