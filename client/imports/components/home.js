import React from "react";
import Meteor from "meteor/meteor";

import FilterButton from "./button.js";


import Controller from "../controller.js";
import Map from "./map.js";

import ResourceList from "./resource-list";



let controller = new Controller();

//let MapWidget = controller.addWgt(Map);

let ResourceWidget = controller.addWgt(ResourceList);


class HomePage extends React.Component {


  constructor() {
    super();
    this.state = {
      filter: {limit: 1} 
    };
  }

  changeFilter() {
    console.log("dds");
    this.setState({filter: {limit: 5}});
  }
  render() {
    return (
      <div>
        <h1>HOME PAGE</h1>
        <ResourceWidget resourceId="Ske2zpaGj" filter={this.state.filter}/>
        <FilterButton changeFilter={this.changeFilter.bind(this)}/>
      </div>
    );
  }
}

export default HomePage;
