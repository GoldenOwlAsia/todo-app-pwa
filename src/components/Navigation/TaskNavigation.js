import React, { Component } from 'react';
import AppBar from 'material-ui/AppBar';
import IconButton from 'material-ui/IconButton';
import NavigationClose from 'material-ui/svg-icons/navigation/close';
import MdCheck from 'react-icons/lib/md/check';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router';

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
  }
}

class TaskNavigation extends Component {
  static propTypes = {
    match: PropTypes.object.isRequired,
    location: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired
  }

  render() {
    return(
      <AppBar
        style={styles.navigation}
        title={
          <div style={styles.titleNavBar}>
            <span style={{fontSize: '20px'}}>{this.props.headerNav}</span>
          </div>
        }
        iconElementLeft={<IconButton><NavigationClose color={'#D8D8D8'} /></IconButton>}
        iconElementRight={<IconButton><MdCheck size={24} color={'#D8D8D8'} /></IconButton>}
        onLeftIconButtonTouchTap={(e) => (this.props.history.goBack())}
        onRightIconButtonTouchTap={(e) => (this.props.onSubmit())}
      />
    );
  }
}

export default withRouter(TaskNavigation);
