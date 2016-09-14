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
        width: "90%",
        marginLeft: "5%",
        marginRight: "5%"
      }
    }
    return (
      <div style={styles.div}>
        <Toggle label="Population Deltas" onToggle={this.props.update}/>
      </div>
    );
  }
}

MapToggle.propTypes = {
  update: React.PropTypes.func
}

export default MapToggle;