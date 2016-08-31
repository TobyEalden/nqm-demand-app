import React from "react";

class Pyramid extends React.Component {
  
  constructor(props) {
    super(props);
    this.state = {};
    this.state.styles = {
      dimensions: {
          w: 500,
          h: 300
        },
      margin: {
        top: 20,
        right: 20,
        buttom: 24,
        left: 20,
        middle: 28
      }
    };
    this.state.styles.regionWidth = this.state.styles.dimensions.w / 2 - this.state.styles.margin.middle;
    this.state.styles.pointA = this.state.styles.regionWidth;
    this.state.styles.pointB = this.state.styles.dimensions.w - this.state.styles.regionWidth;
  }

  componentDidMount() {
    
  }

  componentDidUpdate() {

  }

  render() {
    <div id="pyramid">
    </div>
  }
}

Pyramid.propTypes = {
  resources: React.PropTypes.array,
  updateFilter: React.PropTypes.func
};

export default Pyramid;