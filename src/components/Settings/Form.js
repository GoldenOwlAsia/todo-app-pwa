import React, { Component } from 'react';
import Paper from 'material-ui/Paper';
import Subheader from 'material-ui/Subheader';
import TextField from 'material-ui/TextField';
import Divider from 'material-ui/Divider';
import Toggle from 'material-ui/Toggle';
import DatePicker from 'material-ui/DatePicker';
import {RadioButton, RadioButtonGroup} from 'material-ui/RadioButton';


class Form extends Component {

  constructor(props) {
    super(props);
    this.state = {
      infomations: {
        name: "",
        email: "",
        password: "",
        phone: "",
        address: "",
        twitter: "",
        birthday: ""
      },
    };
  }

  render() {
    const { infomations } = this.state;

    return (
      <Paper
        zDepth={0}
        style={{ padding: 40 }}
      >
        <Subheader style={{textAlign: 'center'}}> Settings </Subheader>
        <TextField
          defaultValue={infomations['name'] || "name"}
          floatingLabelText="NAME"
        />
        <TextField
          defaultValue={infomations['email'] || "email@example.com"}
          floatingLabelText="EMAIL"
        />
        <TextField
          defaultValue={infomations['password'] || "**********"}
          floatingLabelText="PASSWORD"
        />
        <DatePicker
          autoOk={true}
          floatingLabelText="BIRTHDAY"
          defaultDate={infomations['birthday'] || new Date()}
          disableYearSelection={false}
        />
        <div className="notifications" style={{display: 'inline-block', width: 300}}>
          <label>GENDER</label>
          <RadioButtonGroup
            name="gender"
            labelPosition="right"
            defaultSelected={infomations['gender'] || 'Female'}
            style={{display: 'inline-block', width: 200}}
          >
            <RadioButton
              value="Female"
              label="Female"
              style={{display: 'inline-block', maxWidth: 100}}
            />
            <RadioButton
              value="Male"
              label="Male"
              style={{display: 'inline-block', maxWidth: 100}}
            />
          </RadioButtonGroup>
        </div>
        <Divider />
        <br />
        <Toggle
          label="NOTIFICATIONS"
          defaultToggled={infomations['notifications'] || false}
        />
      </Paper>
    )
  }
}

export default Form
