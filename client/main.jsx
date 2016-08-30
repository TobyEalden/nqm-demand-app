import { Meteor } from 'meteor/meteor';

import React from 'react';
import { mount } from 'react-mounter';
import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Menu from '../imports/ui/Menu.jsx';
import AppBar from '../imports/ui/AppBarDemand.jsx';
import Panel from '../imports/ui/Panel.jsx';

import Controller from '../imports/api/controller.js';

let controller = new Controller();
controller.showData();

const Main = () => (
  <MuiThemeProvider>
    <div>
      <AppBar />
      <Panel>   
      </Panel>
      <Panel>
      </Panel>
    </div>
  </MuiThemeProvider>
);

FlowRouter.route( '/', {
  name: 'home', 
  action: function() {
    mount(Main);
  }
});