import React, { Component } from 'react';
import Paper from 'material-ui/Paper';
import HomeNavigation from '../../components/Navigation/HomeNavigation';
import Tasks from '../../components/Task/List';
import headerBg from '../../assets/images/header_bg.png';
import styles from './styles.js';
import TaskService from '../../services/task';
import { observer } from 'mobx-react';
import {Tabs, Tab} from 'material-ui/Tabs';

@observer
class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: 'Completed',
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(value) {
    this.setState({
      value: value,
    });
  };

  render() {
    const taskService = TaskService;
    return (
      <Paper
        zDepth={0}
        style={styles.flexColumn, styles.container}
      >
        <div>
          <HomeNavigation style={styles.header}/>
        </div>

        <div style={styles.headerImage}>
          <p style={styles.title}>
            <span style={styles.numberTask}>{eval(`taskService.length${this.state.value}`)} Tasks</span>
            {/*<span style={styles.date}>Tue, May 9, 2017</span>*/}
          </p>
          <img src={headerBg} alt="header background" style={{width: '100%', display: 'flex'}} />
        </div>

        <Tabs
          tabItemContainerStyle={styles.tabItem}
          inkBarStyle={styles.inkBar}
          style={styles.tab}
          value={this.state.value}
          onChange={this.handleChange}
        >
          <Tab
            label="Completed"
            value="Completed"
          >
            <Tasks completed />
          </Tab>
          <Tab
            label="Uncompleted"
            value="Uncompleted"
          >
            <Tasks />
          </Tab>
        </Tabs>
      </Paper>
    );
  }
}

export default Home;
