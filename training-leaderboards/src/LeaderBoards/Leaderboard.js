import React, { Component } from 'react'
import "./LeaderBoard.css"
import Board from "./Board.js"
import Tabletop from 'tabletop';

const sheetID = '16OAWty-HNh9W1YhQi8UvOYeKyPp9PnBlr8WOAqrn1H4';
const leaderboardLength = 3;


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
        return cats;
    }

    splitByCategory = (fullSet , categories) => { //split data by activity takes full set of unorganized data and the list of categories to spilt it into
        let catSplit = []; //will become 2d array
        for(let i=0; i<categories.length; i++){ //creates empty array for each category (to be filled with result objects)
            let x = [];
            catSplit.push(x);
        }
        for(let i=0 ; i<fullSet.length ; i++){
            for(let j=0 ; j<catSplit.length ; j++){
                if(fullSet[i].activity == categories[j]){
                    catSplit[j].push(fullSet[i]);
                    break;
                }
            }
        }
        return catSplit;
    }
   
    sort = (activityResults) => { //bubble sort that can sort in either direction
        let temp = null;
        if(activityResults.activity.contains('*')) { //for activities where higher is better
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
        console.log(data); //print entire unchange data set 
        let events = this.findCategories(data) //holds all categories that were found
        console.log(events); //print different categories
        let catSplit = this.splitByCategory(data,events);
        console.log(catSplit);

        catSplit.forEach(catResult => {
            if(catResult.length < leaderboardLength){
                catResult.push({date: '--/--/--'});
                catResult.push({date: '--/--/--'});
                catResult.push({date: '--/--/--'});
            }
        })

        let printable = catSplit.map(function(catRes , index){
            console.log(catRes);
            return(
                <Board activity={events[index]} leaders={catRes}></Board>
            )    
        })

        return (
            <div className="AllBoards">
                {printable}
            </div>
            
        )
    }
}

export default Leaderboard
