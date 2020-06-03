import React, { Component } from 'react';
import './App.css';
import Form from './TrackerForm/TrackerForm.js'
import Leaderboards from "./LeaderBoards/Leaderboard.js"
import { ParallaxProvider } from 'react-scroll-parallax';
import { Parallax } from 'react-scroll-parallax';

class App extends Component {
  onClick(){
    window.open("https://docs.google.com/forms/d/e/1FAIpQLSc5nCn8MUGjQGK5BxWgcf7XnF1xpUzAO66g86CUjO2SBHsA-Q/viewform");
}
  
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
              <button id="bt" onClick={this.onClick} className="AA-button"><h2>Add Activity</h2></button>
              <div>
                <h1 style={{color: "white" , marginTop: "1rem" , marginBottom: "0rem"}}>Current Leaderboards</h1>
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