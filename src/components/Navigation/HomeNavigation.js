import React, { Component } from 'react';
import AppBar from 'material-ui/AppBar';
import IconButton from 'material-ui/IconButton';
import MdMenu from 'react-icons/lib/md/menu';
import ContentAdd from 'material-ui/svg-icons/content/add';
import HardwareKeyboardArrowDown from 'material-ui/svg-icons/hardware/keyboard-arrow-down';

const styles = {
  navigation: {
    width: '100%',
    background: '#FFF'
  },
  titleNavBar: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    color: '#1D1D26'
  },
  btnArrowDown: {
    alignSelf: 'center'
  },
  greyColour: {
    color: '#D8D8D8'
  }
}

class HomeNavigation extends Component {
  render() {
    return(
      <AppBar
        style={styles.navigation}
        title={
          <div style={styles.titleNavBar}>
            <span style={{fontSize: '20px'}}>May 2015</span>
            <HardwareKeyboardArrowDown style={styles.btnArrowDown} color={'#D8D8D8'} />
          </div>
        }
        iconElementLeft={<IconButton><MdMenu size={24} color={'#D8D8D8'} /></IconButton>}
        iconElementRight={<IconButton><ContentAdd color={'#D8D8D8'} /></IconButton>}
      />
    );
  }
}

export default HomeNavigation;
