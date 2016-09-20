import React from "react";

class MapScale extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      height: 600,
      width: 50
    }
  }

  componentDidMount() {
    let svg = d3.select("#MapScale")
      .attr("width", this.state.width)
      .attr("height", this.state.height);
    svg.append("g")
      .attr("id", "blocks");


  }

  componentWillReceiveProps(nextProps) {
    let blocks = d3.select("#blocks");
    let blockScale = d3.scale.linear()
      .domain([0, maxValue])
      .range([0, this.state.height]);
    let position = 600;
    _.each(percentiles, (block) => {
      position -= blockScale(block);
      blocks.append("rect")
        .attr("x", 0)
        .attr("y", this.height - blockScale(block))
        .attr("width", this.state.width/2)
        .attr("height", blockScale(block));
    });
    
  }

  render() {

    return(
      <svg id="MapScale"></svg>
    );
  }

}

MapScale.propTypes = {
  percentiles: React.PropTypes.array.isRequired,
  maxValue: React.PropTypes.number.isRequired
}
export default MapScale;