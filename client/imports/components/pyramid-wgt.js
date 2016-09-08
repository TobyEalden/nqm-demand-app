import React from "react";
import YearSlider from "./year-slider";


class PyramidWidget extends React.Component {

  constructor(props) {
    super(props);
    this.state = {};
    this.setFilter = this.setFilter.bind(this);
    this.setOptions = this.setOptions.bind(this);
    this.setYear = this.setYear.bind(this);
  }

  setFilter(filter) {
    this.props.update(this.props.wgtId, this.props.options, filter);
  }

  setOptions(options) {
    this.props.update(this.props.wgtId, options, this.props.filter);
  }

  setYear(year) {
    let filter = _.clone(this.props.filter);
    filter.year = {"$eq":year.toString()};
    this.setFilter(filter);
  }


  componentWillReceiveProps(nextProps) {
   

    const dims = {
      w: 400,
      h: 250
    }
    const margin = {
      top: 20,
      right: 20,
      bottom: 24,
      left: 20,
      middle: 28
    };
    const regionWidth = dims.w/2 - margin.middle;
    const pointA = regionWidth;
    const pointB = dims.w - regionWidth;
    
    // Basic stats

    let totalPop = 0;
    let maxValue = 0;
    let males = [];
    let females = [];
    _.forEach(nextProps.data, function(data){
      if (data.age_band == "All Ages") totalPop += data.persons;
      else {
        if (data.persons > maxValue) maxValue = data.persons;
        if (data.gender == "male") males.push(data);
        else females.push(data);
      }
    });
   // maxValue = percentage(maxValue, totalPop); // Normalise
   d3.select('#pyramid-svg').remove();
    // Create SVG
    let svg = d3.select('#pyramid').append('svg')
      .attr("id", "pyramid-svg")
      .attr('width', margin.left + dims.w + margin.right)
      .attr('height', margin.top + dims.h + margin.bottom)
      .append('g')
      .attr('transform', translation(margin.left, margin.top));
    
    var xScale = d3.scale.linear()
      .domain([0, maxValue])
      .range([0, regionWidth])
      .nice();

    var xScaleLeft = d3.scale.linear()
      .domain([0, maxValue])
      .range([regionWidth, 0]);

    var xScaleRight = d3.scale.linear()
      .domain([0, maxValue])
      .range([0, regionWidth]);

    var yScale = d3.scale.ordinal()
      .domain(nextProps.data.map(function(d) { return d.age_band; }).reverse())
      .rangeRoundBands([dims.h,0], 0.1);

    var yAxisLeft = d3.svg.axis()
      .scale(yScale)
      .orient('right')
      .tickSize(4,0)
      .tickPadding(margin.middle-4);

    var yAxisRight = d3.svg.axis()
      .scale(yScale)
      .orient('left')
      .tickSize(4,0)
      .tickFormat('');

    var xAxisRight = d3.svg.axis()
      .scale(xScale)
      .orient('bottom')
      .ticks(5, ",f");

    var xAxisLeft = d3.svg.axis()
      // REVERSE THE X-AXIS SCALE ON THE LEFT SIDE BY REVERSING THE RANGE
      .scale(xScale.copy().range([pointA, 0]))
      .orient('bottom')
      .ticks(5, ",f");
    var leftBarGroup = svg.append('g')
      .attr('transform', translation(pointA, 0) + 'scale(-1,1)');

    var rightBarGroup = svg.append('g')
      .attr('transform', translation(pointB, 0));

    // DRAW AXES
    svg.append('g')
      .attr('class', 'axis y left')
      .attr('transform', translation(pointA, 0))
      .call(yAxisLeft)
      .selectAll('text')
      .style('text-anchor', 'middle');

    svg.append('g')
      .attr('class', 'axis y right')
      .attr('transform', translation(pointB, 0))
      .call(yAxisRight);

    svg.append('g')
      .attr('class', 'axis x left')
      .attr('transform', translation(0, dims.h))
      .call(xAxisLeft)
      .attr("fill", "grey");

    svg.append('g')
      .attr('class', 'axis x right')
      .attr('transform', translation(pointB, dims.h))
      .call(xAxisRight)
      .attr("fill", "grey");


        // DRAW BARS
    leftBarGroup.selectAll('.bar.left')
      .data(males)
      .enter().append('rect')
        .attr('class', 'bar left')
        .attr('x', 0)
        .attr('y', function(d) { return yScale(d.age_band); })
        .attr('width', function(d) { return xScale(d.persons); })
        .attr('height', yScale.rangeBand())
        .attr("fill", "steelblue");

    rightBarGroup.selectAll('.bar.right')
      .data(females)
      .enter().append('rect')
        .attr('class', 'bar right')
        .attr('x', 0)
        .attr('y', function(d) { return yScale(d.age_band); })
        .attr('width', function(d) { return xScale(d.persons); })
        .attr('height', yScale.rangeBand())
        .attr("fill", "pink");

    function translation(x,y) {
      return 'translate(' + x + ',' + y + ')';
    }

  }

  render() {

    return (
      <div>
        <div id="pyramid"></div>
        <YearSlider update={this.setYear}/>
      </div>

    );
  }

}

PyramidWidget.propTypes = {
  data: React.PropTypes.array.isRequired,
  filter: React.PropTypes.object.isRequired,
  options: React.PropTypes.object.isRequired,
  wgtId: React.PropTypes.string.isRequired,
  update: React.PropTypes.func
};

export default PyramidWidget;