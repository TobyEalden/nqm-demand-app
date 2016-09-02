import React from "react";
import {mount} from "react-mounter";
import {FlowRouter} from "meteor/kadira:flow-router";

import connectionManager from "../imports/connection-manager";
import Layout from "../imports/containers/layout-container";
import Explorer from "../imports/components/explorer";
import Demand from "../imports/components/demand";
import Counties from "../imports/components/counties";
import ResourceData from "../imports/containers/resource-data-container";


// Register a trigger to be called before every route.
FlowRouter.triggers.enter([function(context, redirect) {
  // If the connection manager hasn't established a DDP connection yet, do it now.
  if (!connectionManager.connected) {
    connectionManager.connect();
  }
  // If there is an access token on the query string, use it to authenticate the connection.
  if (context.queryParams.access_token) {
    connectionManager.useToken(context.queryParams.access_token);
    // Redirect to root page after authentication.
    redirect("/");
  }
}]);

// This is the default route - render the explorer
FlowRouter.route("/", {
  name: "root",
  action: function(params, queryParams) {
    mount(Layout, { content: function() { return <Counties />; } });
  }
});


FlowRouter.route("/demand/:region?", {
  name: "demand",
  action: function(params, queryParams) {
    
    const widgets = queryParams.widgets ? JSON.parse(queryParams.widgets) : {};
    
    mount(Layout, { content: function() { return <Demand widgets={widgets} region={params.region} />; } });
  }
});

// Explorer route with parameter indicating the parent resource.
FlowRouter.route("/explorer/:parent?", {
  name: "explorer",
  action: function(params, queryParams) {
    mount(Layout, { content: function() { return <Explorer parent={params.parent} />; } });
  }
});

// Show the data of the given resource
FlowRouter.route("/resource/:id", {
  name: "resource",
  action: function(params) {
    mount(Layout, { content: function() { return <ResourceData resourceId={params.id} />; }});
  }
});

// Redirect to the TDX auth server - as configured in the "authServerURL" property in settings.json 
FlowRouter.route("/auth-server", {
  name: "authServerRedirect",
  triggersEnter: [function(context, redirect) {
    console.log("redirecting to auth server");
    window.location = Meteor.settings.public.authServerURL + "/auth/?rurl=" + window.location.href;        
  }]  
});

// Logout 
FlowRouter.route("/logout", {
  name: "logout",
  triggersEnter: [function(context, redirect) {
    connectionManager.logout();
    redirect("/");
  }]
});

