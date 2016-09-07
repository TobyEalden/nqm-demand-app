import React from 'react';
import Slider from 'material-ui/Slider';

/**
 * The slider bar can have a set minimum and maximum, and the value can be
 * obtained through the value parameter fired on an onChange event.
 */
class YearSlider extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      currentYear: 2015,
    }
  }
  

  handleSlider(event, value) {
    this.setState({currentYear: value});
    this.props.update(value);
  }


  render() {
    return (
      <div>
        <Slider
          defaultValue={2015}
          min={2015}
          max={2021}
          step={1}
          value={this.state.currentYear}
          onChange={this.handleSlider.bind(this)}
        />
      </div>
    );
  }

}

YearSlider.propTypes = {
  update: React.PropTypes.func
}
export default YearSlider;