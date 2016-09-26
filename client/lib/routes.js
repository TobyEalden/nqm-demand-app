import React from "react";
import {mount} from "react-mounter";
import {FlowRouter} from "meteor/kadira:flow-router";

import connectionManager from "../imports/connection-manager";
import Layout from "../imports/containers/layout-container";
import DemandApp from "../imports/containers/demand-container";
import BuildEditor from "../imports/containers/build-container";
import TableApp from "../imports/containers/table-container";
import Counties from "../imports/components/county-view/counties";
import { defaultState } from "../imports/functions/default-state";
import { decode } from "../imports/functions/deep-links";
import ScenarioManager from "../imports/containers/scenario-manager-container";


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
  //  redirect("/");
  }
}]);

// This is the default route - render the demand app
FlowRouter.route("/", {
  name: "root",
  action: function(params, queryParams) {
    mount(Layout, { content: function() { return <Counties />; }, region: "E07000091" });
  }
});

// A county and/or lsoa has been selected, widget parameters are saved on url and passed in to the Demand component
FlowRouter.route("/demand/:region?", {
  name: "demand",
  action: function(params, queryParams) {
    const pipeline='[{"$match":{"parent_id":"' + params.region + '","child_type":"LSOA11CD"}},{"$group":{"_id":null,"id_array":{"$push":"$child_id"}}}]';
    const initialState = defaultState(params.region, queryParams.name, queryParams.area);
    mount(Layout, { content: function() { return <DemandApp resourceId={Meteor.settings.public.lsoaMapping} pipeline={pipeline} centre={JSON.parse(queryParams.centre)} region={params.region} initialState={initialState}/> ; }, region: params.region });
  }
});

FlowRouter.route("/share/:region/:lsoa/:gender/:delta/:ageBand/:year/:population/:area/:name/:centre/:zoomed?", {
  name: "share",
  action: function(params, queryParams) {
    const pipeline='[{"$match":{"parent_id":"' + params.region + '","child_type":"LSOA11CD"}},{"$group":{"_id":null,"id_array":{"$push":"$child_id"}}}]';
    const initialState = decode(params);
    mount(Layout, { content: function() { return <DemandApp resourceId={Meteor.settings.public.lsoaMapping} pipeline={pipeline} centre={JSON.parse(params.centre)} region={params.region} initialState={initialState}/> ; }, region: params.region });
  }
});


FlowRouter.route("/tables/:region", {
  name: "tables",
  action: function(params, queryParams) {
    const pipeline='[{"$match":{"parent_id":"' + params.region + '","child_type":"LSOA11CD"}},{"$group":{"_id":null,"id_array":{"$push":"$child_id"}}}]'; 
    mount(Layout, { content: function() { return <TableApp resourceId={Meteor.settings.public.lsoaMapping} pipeline={pipeline}  /> ; }, region: params.region });
  }
});

FlowRouter.route("/build/:region/:build", {
  name:"builder",
  action: function(params, queryParams) {
    mount(Layout, { content: function() { return <BuildEditor resourceId={params.build} options={{limit: 2500}} filter={{}} access={queryParams.access_token} region={params.region}/> ; }, region: params.region });
  }
});

FlowRouter.route("/scenarios", {
  name: "scenario",
  action: function(params, queryParams) {
    mount(Layout, { content: function() { return <ScenarioManager resourceId="SJx-IgF8a" options={{limit: 2500}} filter={{}} access={queryParams.access_token} />; }, region: params.region });
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

