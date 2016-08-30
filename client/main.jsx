import React from 'react';
import { Meteor } from 'meteor/meteor';
import { render } from 'react-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import injectTapEventPlugin from 'react-tap-event-plugin';

injectTapEventPlugin();

import App from '../imports/ui/App.jsx';

const Main = () => (
  <MuiThemeProvider>
    <App />
  </MuiThemeProvider>
);

Meteor.startup(() => {
 // render(<Main />, document.getElementById('render-target'));
});