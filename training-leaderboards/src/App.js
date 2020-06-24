import React, { Component } from 'react';
import './App.css';
import Form, { TrackerForm } from './TrackerForm/TrackerForm.js'
import Leaderboards from "./LeaderBoards/Leaderboard.js"
import { ParallaxProvider } from 'react-scroll-parallax';
import { Parallax } from 'react-scroll-parallax';

class App extends Component {
  render() {
    return (
      <ParallaxProvider>
        <div className="App">
          <div className="App-header">
            <img src={require("./logo192.png")} className="Head-logo"></img>
            <h1>Western Open Ultimate 2020</h1>
          </div>
          <Parallax y={[30, -10]} tagOuter="figure">
            <div>
              <h1 style={{color: "white" , marginTop: "6rem"}}>New Activity Form</h1>
              <a href="https://docs.google.com/document/d/1sOGgjXNMIw28HDk6v3QTIQcnW7rvl3rVWPDmuoBtkWI/edit" target="_blank" style={{color: "cyan"}}>Workout Plan</a>
              <TrackerForm/>
              <div>
                <h1 style={{color: "white" , marginTop: "1rem" , marginBottom: "0rem"}}>Current Leaderboards</h1>
                <p style={{color: "grey"}}>Refresh page if leaderboards are not being shown</p>
              </div>
            </div>
          <Leaderboards/>
          </Parallax>
        </div>
      </ParallaxProvider>
      
    );
  }
}

export default App;