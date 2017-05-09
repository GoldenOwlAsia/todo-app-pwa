import React, { Component } from 'react'
import TextField from 'material-ui/TextField'
import Checkbox from 'material-ui/Checkbox'
import RaisedButton from 'material-ui/RaisedButton'
import Paper from 'material-ui/Paper'
import { observer } from 'mobx-react'
import { observable } from 'mobx'
import Subheader from 'material-ui/Subheader'
import TaskService from '../../services/task'

const styles = {
  container: {
    flex: 1,
    padding: 40,
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column',
    justifyContent: 'center',
  },
};

@observer
class Form extends Component {
  @observable task = {
    name: '',
    completed: false,
    description: '',
    categoryId: null,
  };

  @observable isSubmiting = false;
  @observable error = {};

  add() {
    this.isSubmiting = true
    const task = {...this.task}
    this.isSubmiting = false;
    TaskService.onAdd(task)
  }

  reset() {
    this.task = {
      name: '',
      completed: false,
      description: '',
      categoryId: null,
    };
    this.error = {};
    this.isSubmiting = false;
  }

  render() {
    const { name, completed, description } = this.task;

    return (
      <Paper
        zDepth={0}
        style={styles.container}
      >
        <Subheader style={{textAlign: 'center'}}> Add Task </Subheader>
        <TextField
          value={name}
          hintText="Task name *"
          errorText={this.error.title}
          onChange={e => (this.task = { ...this.task, name: e.target.value })}
        /><br />
        <TextField
          rows={2}
          multiLine={true}
          value={description}
          hintText="Todo description"
          onChange={e => (this.task = { ...this.task, description: e.target.value })}
        /><br />
        <div style={{display: 'flex'}}>
          <Checkbox
            style={{width: 40}}
            checked={!!completed}
            onTouchTap={(e, value) => (this.task = { ...this.task, completed: !e.target.checked})}
          /> Completed
        </div> <br />
        <div style={{display: 'flex', justifyContent: 'space-around'}}>
          <RaisedButton
            primary
            label="Add"
            disabled={this.isSubmiting}
            onTouchTap={this.add.bind(this)}
          />
          <RaisedButton
            label="Reset"
            disabled={this.isSubmiting}
            onTouchTap={this.reset.bind(this)}
          />
        </div>
      </Paper>
    )
  }
}

export default Form
