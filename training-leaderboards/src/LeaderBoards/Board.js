import React, { Component } from 'react'
import {
    useTable,
    useGroupBy,
    useFilters,
    useSortBy,
    useExpanded,
    usePagination,
  } from 'react-table'

export class Board extends Component {
    render() {
        let activity = this.props.activity;
        let leaders = this.props.leaders;
    
        return (
            <div className="Panel">
                <header className="PanelHead">
                    <h1>{activity}</h1>
                </header>
                <table>
                    <tr>
                        <th></th> <th>Name</th> <th>Result</th> <th>Date</th>
                    </tr>
                    <tr>
                        <th style={{color: "#7724bf"}}>1.</th> <th>{leaders[0].name}</th> <th>{leaders[0].result}</th> <th>{leaders[0].date.substring(0,leaders[0].date.indexOf(' '))}</th>
                    </tr>
                    <tr>
                        <th style={{color: "#7724bf"}}>2.</th> <th>{leaders[1].name}</th> <th>{leaders[1].result}</th> <th>{leaders[1].date.substring(0,leaders[1].date.indexOf(' '))}</th>
                    </tr>
                    <tr>
                        <th style={{color: "#7724bf"}}>3.</th> <th>{leaders[2].name}</th> <th>{leaders[2].result}</th> <th>{leaders[2].date.substring(0,leaders[2].date.indexOf(' '))}</th>
                    </tr>
                </table>
            </div>
        )
    }
}

export default Board
