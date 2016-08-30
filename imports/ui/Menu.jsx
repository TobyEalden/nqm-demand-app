import React, { Component, PropTypes } from 'react';
 
// Task component - represents a single todo item
export default class Menu extends Component {

  render() {
    return (
      <div className="navbar-fixed">
        <div className="nav teal lighten-2">
          <div className="nav-wrapper">
            <a className="brand-logo" href="#!">
              &nbsp;Demand App
            </a>

          </div>
        </div>
      </div>
    );
  }
}
 