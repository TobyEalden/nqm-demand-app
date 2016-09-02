import React from "react";

class CountyDetails extends React.Component {

  render() {
    return (
      <div>
        <h2>{this.props.name}</h2>
        
      </div>
    );
  }

}

CountyDetails.propTypes = {
  name: React.PropTypes.string,

};

export default CountyDetails;