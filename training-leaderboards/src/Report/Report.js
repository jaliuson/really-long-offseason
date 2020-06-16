import React, { Component } from 'react'
import "./Report>css"

export class Report extends Component {
    render() {
        const {name,logs} = this.props;
        return (
            <div>
                <h1>{name}'s Activity Log</h1>
            </div>
        )
    }
}

export default Report
