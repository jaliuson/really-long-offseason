import React, { Component } from 'react'
import "./LeaderBoard.css"
import Board from "./Board.js"

import Tabletop from 'tabletop';
const sheetID = '16OAWty-HNh9W1YhQi8UvOYeKyPp9PnBlr8WOAqrn1H4';
let byActivity = [[],[],[],[],[]];
let activities;


export class Leaderboard extends Component {
    constructor() {
        super()
        this.state = {
          data: []
        }
        activities = ['40 yard' , '100 meter' , 'Vertical Jump' , 'Agility' , 'Box Drill'];
      }
    
    componentDidMount() {
        Tabletop.init({
            key: sheetID,
            simpleSheet: true,
            callback: googleData => {
                console.log(googleData)
            this.setState({
                data: googleData
            })
            },
        })
    }
    
    splitbyActivity = (allResults) =>{
        allResults.map(function(result){
            for(let i=0 ; i<activities.length ; i++){
                if(result.acitivity == activities[i])
                byActivity[i].push(result);
            }
        })
    }

    sort = (rankDirection , activityResults) => {
        let temp = null;
        if(rankDirection==1) {//1 indicates higher is better
            for(let i=0 ; i<activityResults.length ; i++){
                for(let j=i+1 ; j<activityResults.length ; j++){
                    if(activityResults[j] > activityResults[i]){
                        temp = activityResults[i];
                        activityResults[i] = activityResults[j];
                        activityResults[j] = temp;
                    }
                }
            }
        }
        else { //for categories where lower is better
            for(let i=0 ; i<activityResults.length ; i++){
                for(let j=i+1 ; j<activityResults.length ; j++){
                    if(activityResults[j] < activityResults[i]){
                        temp = activityResults[i];
                        activityResults[i] = activityResults[j];
                        activityResults[j] = temp;
                    }
                }
            }
        }
    }

    render() {
        const {data} = this.state;
        let people = [{name: 'Jason', result:'10', date:'06-01-2020'} , {name: 'Jason2', result:'102', date:'06-01-2020'} , {name: 'Jason3', result:'110', date:'06-01-2020'}]
        return (
            <div className="AllBoards">
                <h1> Current Leaderboards (Output/Read)</h1>
                <body>{byActivity.splitbyActivity(data)}{byActivity.map(function(cat){this.sort(cat)})}</body>
                <Board activity='run' leaders={people}/>
            </div>
        )
    }
}

export default Leaderboard
