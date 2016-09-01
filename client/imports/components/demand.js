import React from "react";
import {Meteor} from "meteor/meteor";
import {composeWithTracker} from 'react-komposer';

import Widget from "./widget";
import loadData from "../composers/load-resource-data";

let DataWidget = composeWithTracker(loadData)(Widget);

class Demand extends React.Component {

  changeOptions(id, _options) {
    let widgets = this.props.widgets;
    widgets[id] = widgets[id] ? widgets[id] : {};
    widgets[id].options = _options;
    console.log(widgets);
    FlowRouter.go("demand", {}, {widgets: JSON.stringify(widgets)}); 
  }
  render() {
    
    let widgets = this.props.widgets;
    return (
      <div>
        <DataWidget wgtId="Widget1" resourceId="Ske2zpaGj" filter={{}} options={widgets.Widget1 ? widgets.Widget1.options : {}} update={this.changeOptions.bind(this)}/>
        <DataWidget wgtId="Widget2" resourceId="Ske2zpaGj" filter={{}} options={widgets.Widget2 ? widgets.Widget2.options : {}} update={this.changeOptions.bind(this)}/>
      </div>
    );
  }
}

Demand.propTypes = {
  widgets: React.PropTypes.object
}

export default Demand;
