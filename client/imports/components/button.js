import React, { Component, PropTypes } from 'react';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentClear from 'material-ui/svg-icons/content/clear';

const style = {
  marginRight: 20,
};

export default class FilterButton extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <FloatingActionButton style={style} onClick={this.props.changeFilter}>
        <ContentClear />
      </FloatingActionButton>
    )
  }
  
}
