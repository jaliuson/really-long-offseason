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
        this.state = { name:'' , activity:'' , units:'' , result:'' , submitted: false};
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
            switch(this.state.activity){
                case('Run - 5km'):
                    this.setState({units:'(mm:ss)'});
                    break;
                case('Run - 400m'):
                    this.setState({units:'(mm:ss)'});
                    break;
                case('Triple Broad Jump'):
                    this.setState({units:('Inches')});
                    break;
                case('Z-Test'):
                    this.setState({units:'ss:ms'});
                    break;
                case('Weight Room'):
                    this.setState({units:'hh:mm'});
                    break;
                case('Run - General'):
                    this.setState({units:'(hh:mm:ss)'});
                    break
            }
            console.log(this.state.name);
            console.log(this.state.activity);
            console.log(this.state.result);
            console.log(this.state.units);
    }

    saveActivity = () => {
            console.log("saving")
            async function writeAcitivty(n,a,r,d,s){
                sheet = doc.sheetsByIndex[0];
                await sheet.addRow({name: n , activity: a , result: r , date: d , sort: s});
            }
            var d = new Date();
            var s = "";
            if(this.state.activity == "Triple Broad Jump"){
                s = "h,s"; //higher is better , single
            }
            else if (this.state.activity == "Run - General" || this.state.activity == "Weight Room"){
                s = "h,c"; //high is better , cumulative
            }
            else{
                s = "l,s"; //lower is better , single
            }
            writeAcitivty(this.state.name , this.state.activity , this.state.result , d , s);
            this.setState({submitted: true})
        }

    render() { 
        const activityOptions = ["5km run (mm:ss:ms)","400m (mm:ss:ms)",'Triple Broad Jump (inches")(*)',"Z-Test (mm:ss:ms)","Weight Room (hh:mm) (c)"]
        const defaultOption = activityOptions[0];
        if(this.state.submitted == false){
            return (
                <div className="Form">
                    <Form onSubmit={this.saveActivity}>
                        <label      name="name"     onChange={this.handleChange} className="TxtF">Name:<Text field="name" className="Field"/></label>
                        <label className="TxtF" >Acitvity:
                            <select   className="Field"  name="activity" onChange={this.handleChange} value={this.state.activity}>
                                <option value="n/a">Select Below</option>
                                <option value="Run - 5km">Run - 5km</option>
                                <option value="Run - 400m">Run - 400m</option>
                                <option value="Triple Broad Jump">Triple Broad Jump</option>
                                <option value="Z-Test">Z-Test</option>
                                <option value="Weight Room">Weight Room</option>
                                <option value="Run - General">Run - General</option>
                            </select>
                        </label>
                        <label      name="result"   onChange={this.handleChange} className="TxtF">Result:<Text field='result' className="Field"/></label>
                        <button type='submit' onClick={this.saveActivity} className="SubmitButton">Save</button>
                    </Form>
                    <div className="UnitKey">
                        <h2>Activity Units</h2>
                        <p>Run - 5km            (mm:ss)</p>
                        <p>Run - 400m           (mm:ss)</p>
                        <p>Triple Broad Jump    (Inches)</p>
                        <p>Z-Test               (ss:ms)</p>
                        <p>Weight Room          (hours)     cumulative*</p>
                        <p>Run - General        (km)        cumulative*</p>
                    </div>
                </div>
            )
        }
        else{
            return(
                <div className="Form">
                    <h1 className="Message">Activtity has been recorded!</h1>
                    <p className="Message">Refresh this page to submit a new activity</p>
                </div>
            )
        }
    }
}

export default TrackerForm
