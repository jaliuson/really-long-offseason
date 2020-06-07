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

    findPersonalTotals = (fullSet) => { //takes in full, unsorted, set of responses and finds the number of different categories
        let ppl = [];
        fullSet.map(result => {
            let placed = false;
            for(let i=0 ; i<fullSet.length && !placed; i++){
                if(ppl[i] == result.name){ //check if activity type has been recorded yet
                    placed = true;
                    ppl[i].result += result.result;
                    break;
                }
            }
            if(placed == false){ //is activity was not matched, it is added to running list of options
                ppl.push({name: result.name , result: result.result , date: "n/a"});
            }
        })
        return ppl;
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
        if(activityResults[0].activity.includes('*')) { //for activities where higher is better
            for(let i=0 ; i<activityResults.length ; i++){
                for(let j=i+1 ; j<activityResults.length ; j++){
                    if(activityResults[j].result > activityResults[i].result){
                        temp = activityResults[i];
                        activityResults[i] = activityResults[j];
                        activityResults[j] = temp;
                    }
                }
            }
        }
        else if(activityResults[0].activity.includes('+')){
            let totalResults = this.findPersonalTotals(activityResults);
            for(let i=0 ; i<totalResults.length ; i++){
                for(let j=i+1 ; j<totalResults.length ; j++){
                    if(totalResults[j].result > totalResults[i].result){
                        temp = totalResults[i];
                        totalResults[i] = totalResults[j];
                        totalResults[j] = temp;
                    }
                }
            }
            return totalResults;
        }
        else { //for categories where lower is better
            for(let i=0 ; i<activityResults.length ; i++){
                for(let j=i+1 ; j<activityResults.length ; j++){
                    if(activityResults[j].result < activityResults[i].result){
                        temp = activityResults[i];
                        activityResults[i] = activityResults[j];
                        activityResults[j] = temp;
                    }
                }
            }
        }
        return activityResults;
    }

    render() {
        const {data} = this.state;
        //console.log('full set' , data); //print entire unchange data set 
        let events = this.findCategories(data) //holds all categories that were found
        //console.log('event list' , events); //print different categories
        let catSplit = this.splitByCategory(data,events);
        //console.log('spilt by activity, unsorted' , catSplit);
        for(let i=0 ; i<catSplit.length ; i++){
            let temp = this.sort(catSplit[i]);
            catSplit[i] = temp;
        }

        catSplit.forEach(catResult => { //fill in leaderboards with empty objects
            while(catResult.length < leaderboardLength){
                console.log('entered');
                catResult.push({name: "" , result: "" , date: '--/--/--'});
            }
        })

        let printable = catSplit.map(function(catRes , index){
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
