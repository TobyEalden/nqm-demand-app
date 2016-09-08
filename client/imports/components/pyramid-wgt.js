import React from "react";
import YearSlider from "./year-slider";
import D3Pyramid from "./d3-pyramid";

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

  render() {

    return (
      <div>
        <D3Pyramid data={this.props.data} wgtId={this.props.wgtId}/>
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
  update: React.PropTypes.func.isRequired
};

export default PyramidWidget;