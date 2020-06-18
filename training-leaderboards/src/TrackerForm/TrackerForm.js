import React, { Component } from 'react';
import './TrackerForm.css';
import { Form, Text } from 'informed';
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';

const SPREADSHEET_ID = '1JKeiRZOT57uLf1OzpcpWU1l1DVSRL6ltXrGjtJ7Xsr0'; //from the URL of your blank Google Sheet
const CLIENT_ID = '957790443603-j0bgvoq95r4m0h2r3qqhndbjo1rfij1d.apps.googleusercontent.com'; //from https://console.developers.google.com/apis/credentials
const API_KEY = 'AIzaSyDbvbASjV8hval3rqz9n5A7WRPe02_M_rQ'; //https://console.developers.google.com/apis/credentials
const SCOPE = "";

var doc;
var sheet;

export class TrackerForm extends Component {
    constructor(props){
        super(props);
        this.state = { name:'' , activity:'' , result:'' };
        this.handleChange = this.handleChange.bind(this);

        async function getDoc() {
            const { GoogleSpreadsheet } = require('google-spreadsheet');
            const creds = require('./mustangs-tracker-447125d7078c.json');
            doc = new GoogleSpreadsheet(SPREADSHEET_ID);
            await doc.useServiceAccountAuth(creds);
            await doc.loadInfo();
            console.log(doc.title); 
            
            sheet = doc.sheetsByIndex[0];
            //await sheet.addRow({ name: 'Larry Page', email: 'larry@google.com' }); //... WRITE
            
            const rows = await sheet.getRows(); // can pass in { limit, offset } .. READ
            //console.log(rows[0].name); // 'Larry Page
            }
        getDoc();
    }

    handleChange (evt) {
            this.setState({ [evt.target.name]: evt.target.value });
            console.log(this.state.name);
            console.log(this.state.activity);
            console.log(this.state.result);
    }

    saveActivity = () => {
            console.log("saving")
            async function writeAcitivty(n,a,r){
                sheet = doc.sheetsByIndex[0];
                await sheet.addRow({name: n , activity: a , result: r});
            }
            writeAcitivty(this.state.name , this.state.activity , this.state.result);
        }

    render() { 
        const activityOptions = ["5km run (mm:ss:ms)","400m (mm:ss:ms)",'Triple Broad Jump (inches")(*)',"Z-Test (mm:ss:ms)","Weight Room (hh:mm) (c)"]
        const defaultOption = activityOptions[0];
        return (
            <div className="Form">
                <h1 style={{color: "white"}}>New Activity Form</h1>
                <Form className="InputForm" onSubmit={this.saveActivity}>
                    <label      name="name"     onChange={this.handleChange} className="TxtF">Name:<Text field="name" /></label>
                    <select     name="activity" onChange={this.handleChange} value={this.state.activity}>
                        <option value="n/a">Select Below</option>
                        <option value="Java">Java</option>
                        <option value="C++">C++</option>
                    </select>
                    <label      name="result"   onChange={this.handleChange} className="TxtF">Result:<Text field='result' /></label>
                    <button type='submit' onClick={this.saveActivity}>Submit</button>
                </Form>
            </div>
        )
    }
}

export default TrackerForm
