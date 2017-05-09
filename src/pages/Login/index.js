import React, { Component } from 'react';
import Paper from 'material-ui/Paper';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import {Link} from "react-router-dom";
import { observer } from 'mobx-react';
import { observable } from 'mobx';
import CircularProgress from 'material-ui/CircularProgress';

import UserService from '../../services/user';
import styles from './styles.js';
import MarkedLogo from '../../assets/images/marked.png';

@observer
class Login extends Component {
  @observable errors = {};
  @observable isSubmit = false;
  @observable errorText = null;

  constructor(props) {
    super(props);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onSubmit(e) {
    e.preventDefault();
    this.errors = {};
    const errors = {};
    this.isSubmit = true;
    this.errorText = null;

    const email = this.username.getValue();
    const password = this.password.getValue();

    !!!email && (errors.email = "Email can't be blank");
    !!!password && (errors.password = "Password can't be blank");
    if (Object.keys(errors).length > 0) {
      this.isSubmit = false;
      this.errors = {...errors};
      return false;
    }

    UserService.onLogin({ email, password }, (error) => {
      this.isSubmit = false;
      !!error && (this.errorText = error.message);
    });
  }

  render() {
    return (
      <Paper
        style={styles.container}
      >
        <div style={styles.header}>
          <img
            alt="Todo app"
            src={MarkedLogo}
            style={styles.imgLogo}
          />
        </div>
        <form
          style={styles.form}
          onSubmit={this.onSubmit}
        >
          {!!this.errorText && <legend style={styles.headerForm}> {this.errorText}</legend>}
          {!!this.isSubmit && <CircularProgress style={styles.progress} />}
          <TextField
            {...styles.input}
            fullWidth
            name="username"
            floatingLabelFixed
            errorText={this.errors.email}
            hintText="yourname@example.com"
            floatingLabelText="username"
            ref={ref => (this.username = ref)}
          />
          <TextField
            {...styles.input}
            fullWidth
            type="password"
            name="password"
            floatingLabelFixed
            hintText="********"
            floatingLabelText="password"
            errorText={this.errors.password}
            ref={ref => (this.password = ref)}
          />
          <RaisedButton
            fullWidth
            {...styles.btn}
            label="Sign In"
            labelColor="#FFFFFF"
            backgroundColor="#50D2C2"
            onTouchTap={this.onSubmit}
          />
        </form>
        <div
          style={styles.footer}
        >
          <span
            style={styles.footerText}
          >
            don't have an account?
          </span>
          <Link
            style={styles.link}
            to="/register">
            sign up
          </Link>
        </div>
      </Paper>
    );
  }
}

export default Login;
