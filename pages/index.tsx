import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import orange from '@material-ui/core/colors/orange';
import Album from '../components/Album';

const theme = createMuiTheme({
  palette: {
    primary: orange,
    secondary: orange,
  }
});

const App = () => (
  <div className="app">
    <MuiThemeProvider theme={theme}>
      <CssBaseline />
      <Album />
    </MuiThemeProvider>
  </div>
);

export default App;