import React, { Component } from 'react'
import "./LeaderBoard.css"
import Board from "./Board.js"
import Tabletop from 'tabletop';
const sheetID = '16OAWty-HNh9W1YhQi8UvOYeKyPp9PnBlr8WOAqrn1H4';
var resultsByActivity;

export class Leaderboard extends Component {
    constructor() {
        super()
        this.state = {
          data: []
        }
      }
    
    componentDidMount() {
        Tabletop.init({
            key: sheetID,
            simpleSheet: true,
            callback: googleData => {
                console.log(googleData)
                this.setState({data: googleData})
            },
        })
    }
    
    findCategories = (fullSet) => { //takes in full, unsorted, set of responses and finds the number of different categories
        let cats = [];
        fullSet.map(result => {
            let placed = false;
            for(let i=0 ; i<fullSet.length && !placed; i++){
                if(cats[i] == result.activity){ //check if activity type has been recorded yet
                    placed = true;
                    break;
                }
            }
            if(placed == false){ //is activity was not matched, it is added to running list of options
                cats.push(result.activity);
            }
        })
    }

    splitByCategory = (fullSet , categories) => { //split data by activity takes full set of unorganized data and the list of categories to spilt it into
        let catSplit;
        for(let i=0; i<categories.length; i++){ //creates empty array for each category (to be filled with result objects)
            let x = [];
            catSplit.push(x);
        }
    }
   
    sort = (rankDirection , activityResults) => { //bubble sort that can sort in either direction
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
                <Board activity='run' leaders={people}/>
            </div>
        )
    }
}

export default Leaderboard
