import React from "react";

import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';

class TimelineWidget extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      width: 260,
      height: 225,
      margin: {
        top: 10,
        right: 40,
        bottom: 20,
        left: 25,
      }
    };
  }

  translation(x,y) {
    return 'translate(' + x + ',' + y + ')';
  }

  componentDidMount() {
    let svg = d3.select("#timeline" + this.props.wgtId)
      .attr('width', this.state.margin.left + this.state.width + this.state.margin.right)
      .attr('height', this.state.margin.top + this.state.height + this.state.margin.bottom)
      .append('g')
      .attr('transform', this.translation(this.state.margin.left, this.state.margin.top));
    svg.append("g")
      .attr('id', 'y-axis' + this.props.wgtId)
      .attr("class", "axis")
      .attr('transform', this.translation(this.state.margin.left, 0));
    svg.append('g')
      .attr('id', 'x-axis' + this.props.wgtId)
      .attr("class", "axis")
      .attr('transform', this.translation(this.state.margin.left, this.state.height));
    svg.append("path")
      .attr("id", "line" + this.props.wgtId);

  }
  componentWillReceiveProps(nextProps) {

    let svg = d3.select("#timeline" + this.props.wgtId);

    let data = {};
    // There is almost certainly a better way of doing this, need to get totals for each year.
    _.forEach(nextProps.data, function(d) { 
      if (nextProps.settings.age_band["$in"].indexOf(d.age_band) != -1 && nextProps.settings.gender["$in"].indexOf(d.gender) != -1) {
        if (data[d.year]) data[d.year].total += d.persons;
        else data[d.year] = {
          year: parseInt(d.year),
          total: d.persons
        }
      }
    })

    let totals = [];
    _.forEach(data, function(d) {
      totals.push(d);
    });

    totals.sort(function(a,b) {
      return a.year - b.year;
    });

    let xScale = d3.scale.linear()
      .domain(d3.extent(totals, function(d) {return d.year}))
      .range([0, this.state.width]);

    let yScale = d3.scale.linear()
      .domain([0, d3.max(totals, function(d) {return d.total}) * 1.1])
      .range([this.state.height, 0]);

    let xAxis = d3.svg.axis()
      .scale(xScale)
      .orient("bottom")
      .ticks(7)
      .tickFormat(d3.format("d"));
    
    let yAxis = d3.svg.axis()
      .scale(yScale)
      .orient("left")
      .ticks(6, ",f");
    
    let line = d3.svg.line()
      .x(function(d) { return xScale(d.year); })
      .y(function(d) { return yScale(d.total); });


    svg.select("#x-axis" + this.props.wgtId)
      .transition()
      .call(xAxis);

    svg.select("#y-axis" + this.props.wgtId)
      .transition()
      .call(yAxis);

    svg.select("#line" + this.props.wgtId)
      .datum(totals)
      .transition()
      .duration(500).ease("sin-in-out")
      .attr("class", "line")
      .attr("d", line)
      .attr('transform', this.translation(this.state.margin.left, 0));

    
  }

  render() {

    return (
      <Card className="wgt-card">
        <svg id={"timeline" + this.props.wgtId}></svg>

      </Card>

    );
  }

}

TimelineWidget.propTypes = {
  data: React.PropTypes.array.isRequired,
  wgtId: React.PropTypes.string.isRequired,
  settings: React.PropTypes.object.isRequired
};

export default TimelineWidget;