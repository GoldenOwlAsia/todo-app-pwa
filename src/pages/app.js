import React, { Component } from 'react';
import Paper from 'material-ui/Paper';
import { Tabs, Tab } from 'material-ui/Tabs';
import {
  MdHome,
  MdBook,
  MdCached,
} from 'react-icons/lib/md';
import SwipeableViews from 'react-swipeable-views';
import Settings from './Settings';

import './style.css';

const styles = {
  flexColumn: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
  },
  flexRow: {
    flex: 1,
    display: 'flex',
    flexDirection: 'row',
  },
  navigation: {
    bottom: 0,
    width: '100%',
    position: 'absolute',
  },
  slide: {
    flex: 1,
    padding: 15,
    minHeight: 100,
    color: '#fff',
  },
  slide1: {
    background: '#FEA900',
  },
  slide2: {
    background: '#B3DC4A',
  },
  slide3: {
    background: '#6AC0FF',
  },
}

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedIndex: 1,
    };

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(selectedIndex) {
    this.setState({ selectedIndex });
  }

  render() {
    const { selectedIndex } = this.state;

    return (
      <Paper
        zDepth={0}
        style={styles.flexColumn}
      >
        <SwipeableViews
          index={selectedIndex}
          style={styles.flexColumn}
          slideStyle={{ display: 'flex' }}
          containerStyle={styles.flexRow}
          onChangeIndex={this.handleChange}
        >
          <div style={{...styles.slide, ...styles.slide1}}>
            Recents
          </div>
          <Settings />
          <div style={{...styles.slide, ...styles.slide3}}>
            Bookmark
          </div>
        </SwipeableViews>

        <Tabs
          value={selectedIndex}
          style={styles.navigation}
          onChange={this.handleChange}
        >
          <Tab
            value={0}
            label="Recents"
            icon={<MdCached size={24} />}
          />
          <Tab
            value={1}
            label="Settings"
            icon={<MdHome size={24} />}
          />
          <Tab
            value={2}
            label="Bookmark"
            icon={<MdBook size={24} />}
          />
        </Tabs>
      </Paper>
    );
  }
}

export default App;
