import React from "react";

class TimelineWidget extends React.Component {

  constructor(props) {
    super(props);
    this.state = {};
   
    this.props.update(this.props.wgtId, this.props.options, this.props.filter);
  }

  setFilter(_filter) {
    this.props.update(this.props.wgtId, this.props.options, _filter);
  }

  setOptions(_options) {
    this.props.update(this.props.wgtId, _options, this.props.filter);
  }


  componentWillReceiveProps(nextProps) {

    let data = {};
    let minYear = 3000;
    let maxYear = 0;
    let maxPersons = 0;
    _.forEach(nextProps.data, function(d) {
      if (data[d.year]) data[d.year].total += d.persons;
      else data[d.year] = {
        year: d.year,
        total: d.persons
      }
      if (d.year < minYear) minYear = d.year;
      if (d.year > maxYear) maxYear = d.year;
      if (d.persons > maxPersons) maxPersons = d.persons;
    })

    d3.select('#timeline-svg').remove();

    let margin = {top: 20, right: 20, bottom: 30, left: 50};
    let width = 600 - margin.left - margin.right;
    let height = 400 - margin.top - margin.bottom;

    let svg = d3.select("#timeline").append("svg")
        .attr("id", "timeline-svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g");
    

    let xScale = d3.scale.linear().range([margin.left, width - margin.right]).domain([minYear,maxYear]);
    let yScale = d3.scale.linear().range([height - margin.top, margin.bottom]).domain([0,maxPersons]);
    let xAxis = d3.svg.axis()
        .scale(xScale);
    let yAxis = d3.svg.axis()
        .scale(yScale)
        .orient("left");
      
    svg.append("g")
         .attr("transform", "translate(0," + (height - margin.bottom) + ")")
        .call(xAxis);
    svg.append("g")
        .attr("transform", "translate(" + (margin.left) + ",0)")
        .call(yAxis);
    
  }

  render() {

    return (
      <div>
        <div id="timeline"></div>

      </div>

    );
  }

}

TimelineWidget.propTypes = {
  data: React.PropTypes.array.isRequired,
  filter: React.PropTypes.object.isRequired,
  options: React.PropTypes.object.isRequired,
  wgtId: React.PropTypes.string.isRequired,
  update: React.PropTypes.func
};

export default TimelineWidget;