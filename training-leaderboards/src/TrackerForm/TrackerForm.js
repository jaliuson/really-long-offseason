import React, { Component } from 'react';
import './TrackerForm.css';
import { Form, Text } from 'informed';
import { gapi } from 'gapi-script'
import { loadAuth2, loadAuth2WithProps } from 'gapi-script';

const SPREADSHEET_ID = '16OAWty-HNh9W1YhQi8UvOYeKyPp9PnBlr8WOAqrn1H4'; //from the URL of your blank Google Sheet
const CLIENT_ID = '957790443603-j0bgvoq95r4m0h2r3qqhndbjo1rfij1d.apps.googleusercontent.com'; //from https://console.developers.google.com/apis/credentials
const API_KEY = 'AIzaSyCvYqH9SIOAmG7Q-MTLA2CKcL9yGAp37Ug'; //https://console.developers.google.com/apis/credentials
const SCOPE = 'https://www.googleapis.com/auth/spreadsheets';

export class TrackerForm extends Component {
    /*constructor(props) {
        super(props);
        this.onFormSubmit = this.onFormSubmit.bind(this); //to tie the form's callback to this class
    }

     async componentDidMount(){ //called automatically by React
        this.handleClientLoad(); 
        let auth2 = await loadAuth2(CLIENT_ID, SCOPE);
    }

    handleClientLoad =()=> { //initialize the Google API
        gapi.load('client:auth2', this.initClient);
    }

    initClient =()=> { //provide the authentication credentials you set up in the Google developer console
        gapi.client.init({
            'apiKey': API_KEY,
            'clientId': CLIENT_ID,
            'scope': SCOPE,
            'discoveryDocs': ['https://sheets.googleapis.com/$discovery/rest?version=v4'],
        }).then(()=> {
            gapi.auth2.getAuthInstance().isSignedIn.listen(this.updateSignInStatus); //add a function called `updateSignInStatus` if you want to do something once a user is logged in with Google
            this.updateSignInStatus(gapi.auth2.getAuthInstance().isSignedIn.get());
        });
    }

    onFormSubmit(submissionValues) {
        const params = {
          // The ID of the spreadsheet to update.
          spreadsheetId: SPREADSHEET_ID, 
          // The A1 notation of a range to search for a logical table of data.Values will be appended after the last row of the table.
          range: 'Sheet1', //this is the default spreadsheet name, so unless you've changed it, or are submitting to multiple sheets, you can leave this
          // How the input data should be interpreted.
          valueInputOption: 'RAW', //RAW = if no conversion or formatting of submitted data is needed. Otherwise USER_ENTERED
          // How the input data should be inserted.
          insertDataOption: 'INSERT_ROWS', //Choose OVERWRITE OR INSERT_ROWS
        };
    
        const valueRangeBody = {
          'majorDimension': 'ROWS', //log each entry as a new row (vs column)
          'values': [submissionValues] //convert the object's values to an array
        };
    
        let request = gapi.client.sheets.spreadsheets.values.append(params, valueRangeBody);
        request.then(function (response) {
          // TODO: Insert desired response behaviour on submission
          console.log(response.result);
        }, function (reason) {
          console.error('error: ' + reason.result.error.message);
        });
      }*/

    render() {
        return (
            <div className="Form">
                <h1>Form (Input/Write)</h1>
                <Form onSubmit={this.onFormSubmit}>
                    <label>Name:<Text field="text" name="name" /></label>
                    <label>Activity:<Text field='activity' /></label>
                    <label>Result:<Text field='result' /></label>
                    <button type='submit'>Submit</button>
                </Form>
            </div>
        )
    }
}

export default TrackerForm
