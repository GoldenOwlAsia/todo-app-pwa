import React, { Component } from 'react';
import {List, ListItem} from 'material-ui/List';
import Subheader from 'material-ui/Subheader';
import Divider from 'material-ui/Divider';
import { observer } from 'mobx-react';

import TaskService from '../../services/task';

@observer
class Lists extends Component {
  constructor(props) {
    super(props);
    this.renderTask = this.renderTask.bind(this);
  }

  onToggle(key, value) {
    TaskService.onToggle(key, value);
  }

  renderItemContent(task) {
    const { description, category } = task;

    return (
      <div style={{height: 'initial'}}>
        <div style={{display: 'flex'}}>{category}</div>
        <div style={{marginTop: 20}}>
          {description}
        </div>
      </div>
    );
  }

  renderItemRight(key, task) {
    return null;
  }

  renderTask(task, key) {
    const { name, description } = task;
    const category = null

    return (
      [
        <ListItem
          key={key}
          primaryText={name}
          secondaryTextLines={2}
          rightIconButton={this.renderItemRight(key)}
          secondaryText={this.renderItemContent({ category, description })}
        />,
        <Divider />,
      ]
    );
  }

  render() {
    const { completed } = this.props
    const subTitle = !!completed ? 'Completed' : 'Uncompleted';
    const tasks = TaskService[subTitle] || {};

    return (
      <List style={{flex: 1, margin: 10}}>
        <Subheader>{subTitle}</Subheader>
        <Divider />
        {Object.keys(tasks).map((key) => this.renderTask(tasks[key], key))}
      </List>
    )
  }
}

export default Lists
