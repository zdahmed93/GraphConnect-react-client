import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import './App.css';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import { Grid } from '@material-ui/core';
import {Paper} from '@material-ui/core'

import ThemeContextProvider from './material-ui/ThemeProvider'
import Header from './components/Header'

function App() {
  return (
    <ThemeContextProvider>
      <Router>
        <Paper style={{height: '100%'}} >
        <Grid container direction="column">
          <Grid item>
            <Header />
          </Grid>
          <Grid container item style={{marginTop: 50}}>
            <Switch>
              <Route exact path="/" component={Home} />
              <Route path="/login" component={Login} />
              <Route path="/register" component={Register} />
            </Switch>
          </Grid>
        </Grid>
        </Paper>
      </Router>
    </ThemeContextProvider>
  );
}

export default App;
