import React from "react";
import {Meteor} from "meteor/meteor";
import {composeWithTracker} from 'react-komposer';

import Widget from "./widget";
import loadData from "../composers/load-resource-data";

let DataWidget = composeWithTracker(loadData)(Widget);

class Demand extends React.Component {

  constructor() {
    super();
    this.state = {
      widgets: {
        Widget1: {
          filter: {},
          options: {}
        },
        Widget2: {
          filter: {},
          options: {}
        }
      }
    };
  }

  changeOptions(id, _options) {
    console.log(id);
    let temp = this.state;
    temp.widgets[id].options = _options;
    temp.widgets[id].filter = {};
    console.log(temp);
    this.setState(temp);
  }
  render() {
    return (
      <div>
        <DataWidget wgtId="Widget1" resourceId="Ske2zpaGj" filter={this.state.widgets.Widget1.filter} options={this.state.widgets.Widget1.options} update={this.changeOptions.bind(this)}/>
        <DataWidget wgtId="Widget2" resourceId="Ske2zpaGj" filter={this.state.widgets.Widget2.filter} options={this.state.widgets.Widget2.options} update={this.changeOptions.bind(this)}/>
      </div>
    );
  }
}

export default Demand;
