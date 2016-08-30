import React from 'react';
import { mount } from 'react-mounter';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import App from '../imports/ui/App.jsx';

const Main = () => (
  <MuiThemeProvider>
    <App />
  </MuiThemeProvider>
);

FlowRouter.route( '/', {
  action: function() {
    mount(Main);
  },
  name: 'home' // Optional route name.
});