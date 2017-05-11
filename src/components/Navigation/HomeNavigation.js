import React, { Component } from 'react';
import AppBar from 'material-ui/AppBar';
import IconButton from 'material-ui/IconButton';
import MdMenu from 'react-icons/lib/md/menu';
import ContentAdd from 'material-ui/svg-icons/content/add';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router';
import TaskService from '../../services/task';
import { observer } from 'mobx-react';
import DatePicker from 'material-ui/DatePicker';

let DateTimeFormat;

const IntlPolyfill = require('intl');
DateTimeFormat = IntlPolyfill.DateTimeFormat;
require('intl/locale-data/jsonp/en');
require('intl/locale-data/jsonp/en-US');
import DrawerService from '../../services/drawer';

const styles = {
  navigation: {
    width: '100%',
    maxWidth: 400,
    background: '#FFF',
    margin: '0 auto'
  },
  titleNavBar: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    color: '#1D1D26'
  }
}

@observer
class HomeNavigation extends Component {
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
          <DatePicker
            fullWidth
            hintText="Date"
            style={{
              // maxWidth: '100%'
              width: 'auto'
            }}
            textFieldStyle={{
              fontSize: 23,
              width: 'auto',
              // margin: '0 25%'
            }}
            formatDate={new DateTimeFormat('en-US', {
              day: 'numeric',
              month: 'long',
              year: 'numeric',
            }).format}
            onChange={(e, date) => {
              TaskService.findByDate(date)
            }}
            defaultDate={new Date()}
          />
        }
        iconElementLeft={<IconButton><MdMenu size={24} color={'#D8D8D8'} /></IconButton>}
        iconElementRight={<IconButton><ContentAdd color={'#D8D8D8'} /></IconButton>}
        onRightIconButtonTouchTap={() => (this.props.history.push('/new-task'))}
        onLeftIconButtonTouchTap={() => DrawerService.onOpen()}
      />
    );
  }
}

export default withRouter(HomeNavigation);
