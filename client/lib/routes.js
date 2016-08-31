import React from "react";
import {mount} from "react-mounter";
import {FlowRouter} from "meteor/kadira:flow-router";

import Layout from "../imports/containers/layout-container";
import HomePage from "../imports/components/home";

FlowRouter.route('/', {
  name: "index",
  action: function(params) {
    mount(Layout, { content: function() { return <HomePage />; }});
  }
});
