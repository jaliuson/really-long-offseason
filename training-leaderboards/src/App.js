import React, { Component } from 'react';
import './App.css';
import Form from './TrackerForm/TrackerForm.js'
import Boards from "./LeaderBoards/Leaderboard.js"

class App extends Component {
  render() {
    return (
      <div className="App">
        <Form/>
        <Boards/>
      </div>
    );
  }
}

export default App;