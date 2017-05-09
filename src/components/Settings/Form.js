import React, { Component } from 'react';
import Paper from 'material-ui/Paper';
import Subheader from 'material-ui/Subheader';
import {List, ListItem} from 'material-ui/List';
import Divider from 'material-ui/Divider';
import Checkbox from 'material-ui/Checkbox';
import Toggle from 'material-ui/Toggle';


class Form extends Component {

  constructor(props) {
    super(props);
    this.state = {
      infomations: {
        name: "invalid",
        email: "invalid",
        password: "*********",
        phone: "invalid",
        address: "invalid",
        twitter: "invalid",
        birthday: "01/01/2011"
      },
    };
  }

  generateCard(key, value) {
    console.log(key);
    return (
      <div class="infomation" style={{width:"100%", height: "10%"}}>
        <div class="key">
          {key}
        </div>
        <div class="value">
          {value}
        </div>
      </div>
    )
  }

  render() {
    const { infomations } = this.state;

    return (
      <Paper
        zDepth={0}
        style={{ padding: 40 }}
      >
        <Subheader style={{textAlign: 'center'}}> Settings </Subheader>
        {this.generateCard('name', infomations['name'])}
        <Divider />
        {this.generateCard('email', infomations['email'])}
        <Divider />
        {this.generateCard('password', infomations['password'])}
        <Divider />
        {this.generateCard('birthday', infomations['birthday'])}
      </Paper>
    )
  }
}

export default Form
