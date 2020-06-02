import React, { Component } from 'react'

export class Board extends Component {
    render() {
        let activity = this.props.activity;
        let leaders = this.props.leaders;
    
        return (
            <div className="Panel">
                <header className="PanelHead">
                    <h1>{activity}</h1>
                </header>
                <body className="PanelBody">
                    <p>1. {leaders[0].name} {leaders[0].result} {leaders[0].date}</p>
                    <p>2. {leaders[1].name} {leaders[1].result} {leaders[1].date}</p>
                    <p>3. {leaders[2].name} {leaders[2].result} {leaders[2].date}</p>
                </body>
            </div>
        )
    }
}

export default Board
