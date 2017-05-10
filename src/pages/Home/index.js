import React, { Component } from 'react';
import Paper from 'material-ui/Paper';
import HomeNavigation from '../../components/Navigation/HomeNavigation';
import Tasks from '../../components/Task/List';
import headerBg from '../../assets/images/header_bg.png';
import styles from './styles.js';

class Home extends Component {
  render() {
    return (
      <Paper
        zDepth={0}
        style={styles.flexColumn}
      >
        <div><HomeNavigation /></div>
        <div style={{position: 'relative'}}>
          <p style={styles.title}>
            <span style={styles.numberTask}>5 Tasks</span>
            <span style={styles.date}>Tue, May 9, 2017</span>
          </p>
          <img src={headerBg} alt="header background" style={{width: '100%'}} />
        </div>

        <Tasks />
      </Paper>
    );
  }
}

export default Home;
