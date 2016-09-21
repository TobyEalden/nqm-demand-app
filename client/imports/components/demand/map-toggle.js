import React from 'react';
import Toggle from 'material-ui/Toggle';

class MapToggle extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const styles = {
      div: {

        width: 200,
        float: "left"

      }
    }
    return (
      <div style={styles.div}>
        <Toggle label="Population Deltas" onToggle={this.props.update} defaultToggled={this.props.initial}/>
      </div>
    );
  }
}

MapToggle.propTypes = {
  update: React.PropTypes.func.isRequired,
  initial: React.PropTypes.bool.isRequired
}

export default MapToggle;