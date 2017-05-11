import React, { Component } from 'react';
import Paper from 'material-ui/Paper';
import TaskNavigation from '../../components/Navigation/TaskNavigation';
import Form from '../../components/Task/Form';
import styles from './style.js'
import PropTypes from 'prop-types';
import { withRouter } from 'react-router';

class NewTask extends Component {
  static propTypes = {
    match: PropTypes.object.isRequired,
    location: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired
  }

  constructor(props) {
    super(props);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onSubmit() {
    this.form.add().then(res => {
      this.props.history.replace('/');
    })
  }

  render() {
    return (
      <Paper
        style={styles.container}
      >
        <TaskNavigation headerNav="New Task" onSubmit={this.onSubmit}/>
        <Form ref={ref => (this.form = ref)} />
      </Paper>
    );
  }
}

export default withRouter(NewTask);
