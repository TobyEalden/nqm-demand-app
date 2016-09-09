import React from 'react';
import Toggle from 'material-ui/Toggle';

class MapToggle extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Toggle label="Population Deltas" onToggle={this.props.toggle}/>
    );
  }
}

MapToggle.propTypes = {
  toggle: React.PropTypes.func
}

export default MapToggle;