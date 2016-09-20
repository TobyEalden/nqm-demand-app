import React from 'react';
import Slider from 'material-ui/Slider';

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
        width: "100%"

      },
      div: {
        position: "relative",
        flexBasis: 400,
        textAlign: "center"
      },
      p: {
        marginTop: "-40px"
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
        <p style={styles.p}>
          {this.state.currentYear}
        </p>

      </div>
    );
  }

}

YearSlider.propTypes = {
  update: React.PropTypes.func
}
export default YearSlider;
