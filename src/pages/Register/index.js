import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Paper from 'material-ui/Paper';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import { Link } from "react-router-dom";
import { withRouter } from 'react-router';

import { observer } from 'mobx-react';
import { observable } from 'mobx';
import CircularProgress from 'material-ui/CircularProgress';

import UserService from '../../services/user';
import styles from './styles.js';
import MarkedLogo from '../../assets/images/marked.png';

@observer
class Register extends Component {
  @observable errors = {};
  @observable isSubmit = false;
  @observable errorText = null;

  static propTypes = {
    match: PropTypes.object.isRequired,
    location: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired
  }

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

    const email = this.email.getValue();
    const password = this.password.getValue();
    const displayName = this.fullname.getValue();

    !!!email && (errors.email = "Email can't be blank");
    !!!password && (errors.password = "Password can't be blank");
    !!!displayName && (errors.fullname = "Full name can't be blank");

    if (Object.keys(errors).length > 0) {
      this.isSubmit = false;
      this.errors = {...errors};
      return false;
    }

    UserService.onRegister({ email, password }, (error, errors) => {
      this.isSubmit = false;
      if (!error) {
        return this.props.history.replace('/');
      }

      this.errors = {...errors};
      !!errors.errorText && (this.errorText = errors.errorText);
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
            name="fullname"
            floatingLabelFixed
            errorText={this.errors.fullname}
            hintText="abc xyz"
            floatingLabelText="fullname"
            ref={ref => (this.fullname = ref)}
          />
          <TextField
            {...styles.input}
            fullWidth
            name="email"
            floatingLabelFixed
            errorText={this.errors.email}
            hintText="yourname@example.com"
            floatingLabelText="email"
            ref={ref => (this.email = ref)}
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
            label="Create"
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
            ALREADY HAVE AN ACCOUNT
          </span>
          <Link
            style={styles.link}
            to="/login">
            sign in
          </Link>
        </div>
      </Paper>
    );
  }
}

export default withRouter(Register)
