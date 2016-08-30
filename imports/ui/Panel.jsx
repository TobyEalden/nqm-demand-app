import React, { Component, PropTypes } from 'react';


const style = {
  width: "49%",
  float: "left",
};

export default class Panel extends Component { 

  render() {
    return (
      <div style={style}>
          {this.props.children}
      </div>
    );
  }
}

