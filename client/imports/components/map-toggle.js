import React from 'react';
import Toggle from 'material-ui/Toggle';

class MapToggle extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const styles = {
      div: {
        position: "relative",
        width: "49%",
        textAlign: "center"
      }
    }
    return (
      <div style={styles.div}>
        <Toggle label="Population Deltas" onToggle={this.props.toggle}/>
      </div>
    );
  }
}

MapToggle.propTypes = {
  toggle: React.PropTypes.func
}

export default MapToggle;