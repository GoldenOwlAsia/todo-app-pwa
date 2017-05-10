import React, { Component } from 'react';
import {List, ListItem} from 'material-ui/List';
import Subheader from 'material-ui/Subheader';
import Divider from 'material-ui/Divider';
import { observer } from 'mobx-react';
import Avatar from 'material-ui/Avatar';
import FaIconClock from 'react-icons/lib/fa/clock-o';
import MdLocationOn from 'react-icons/lib/md/location-on';

import TaskService from '../../services/task';

const styles = {
  subheader: {
    fontSize: 16,
    paddingLeft: 0
  },
  containerList: {
    flex: 1,
    paddingLeft: 30,
    paddingRight: 30
  },
  containerListItem: {
    marginLeft: -16
  },
  nameItem: {
    color: '#1D1D26',
    fontSize: 20
  },
  timeLocation: {
    display: 'flex',
    alignItems: 'center',
    opacity: 0.7,
    padding: '3px 0'
  }
};

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
    const { description, category, timestart, timeend, location } = task;

    return (
      <div style={{height: 'initial'}}>
        <div style={styles.timeLocation}>
          <span style={{display: 'flex'}}><FaIconClock />&nbsp;{timestart} – {timeend} &nbsp;&nbsp;&nbsp;&nbsp;</span>
          <span style={{display: 'flex'}}><MdLocationOn />&nbsp;{location}</span>
        </div>
        <div style={{display: 'flex'}}>{category}</div>
        <div style={{color: '#1D1D26', opacity: '0.8'}}>{description}</div>
      </div>
    );
  }

  renderItemRight(key, task) {
    return null;
  }

  renderTask(task, key) {
    const { name, description, timestart, timeend, location } = task;
    const category = null;

    return (
      [
        <ListItem
          style={styles.containerListItem}
          key={key}
          primaryText={
            <span style={styles.nameItem}>{name}</span>
          }
          secondaryTextLines={2}
          rightIconButton={this.renderItemRight(key)}
          secondaryText={this.renderItemContent({ category, name, description, timestart, timeend, location })}

          rightAvatar={<Avatar src="http://www.material-ui.com/images/ok-128.jpg" />}
        />,
        <Divider />
      ]
    );
  }

  render() {
    const { completed } = this.props
    const subTitle = !!completed ? 'Completed' : 'Uncompleted';
    const tasks = TaskService[subTitle] || {};

    return (
      <List style={styles.containerList}>
        {/*<Subheader style={styles.subheader}>{subTitle}</Subheader>
        <Divider />*/}
        {Object.keys(tasks).map((key) => this.renderTask(tasks[key], key))}
      </List>
    )
  }
}

export default Lists
