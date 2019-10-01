import React, { Component } from 'react'
import Grid from '@material-ui/core/Grid';
import Game from './components/Game';
import MediaPlayer from './components/MediaPlayer';
import './App.css';

class App extends Component {
  render () {
    return ( 
      <Grid
        container
        direction="row"
        justify="center"
        alignItems="center"
      >
        <Grid item lg={3}>
        </Grid>

        <Grid item lg={6}>
          <Grid
            container
            direction="column"
            justify="center"
            alignItems="center"
          >
            <Game />
            <MediaPlayer />
          </Grid>
        </Grid>

        <Grid item lg={3}>
        </Grid>
      </Grid>
    );
  }
}

export default App;
