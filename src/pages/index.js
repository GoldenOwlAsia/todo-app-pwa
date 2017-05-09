import React from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import { orange800 } from 'material-ui/styles/colors';
import injectTapEventPlugin from 'react-tap-event-plugin';

import App from './app';
import './style.css';

injectTapEventPlugin();

const muiTheme = getMuiTheme({
  palette: {
    primary1Color: orange800
  },
  fontFamily: 'Avenir'
})

export default () => {
  return (
    <MuiThemeProvider muiTheme={muiTheme}>
      <App />
    </MuiThemeProvider>
  );
};
