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
      currentYear: new Date().getFullYear()
    }
    this.handleSlider = _.debounce(this.handleSlider.bind(this), 1000);
  }
  
  handleSlider(event, value) {
    this.setState({currentYear: value});
    this.props.update(value);
  }

  render() {
    const styles = {
      slider: {
        position: "relative",
      },
      span: {
        fontFamily: "Roboto, sans-serif",     
      },
      div: {
        position: "relative",
        width: "49%",
        textAlign: "center"
      }
    }
    return (
      <div style={styles.div}>
        <Slider
          defaultValue={this.state.currentYear}
          min={2015}
          max={2021}
          step={1}
          value={this.state.currentYear}
          onChange={this.handleSlider}
          style={styles.slider}
        />
        <span style={styles.span}>{this.state.currentYear}</span>

      </div>
    );
  }

}

YearSlider.propTypes = {
  update: React.PropTypes.func
}
export default YearSlider;
