import React, { Component } from 'react';
import PropTypes from 'prop-types';
import CircularProgress from 'material-ui/CircularProgress';
import {BrowserRouter as Router, Route} from "react-router-dom";
import { observer } from 'mobx-react';

import Home from './Home';
import Login from './Login';
import Register from './Register';
import NewTask from './NewTask';
import Settings from './Settings';
import NotFound from './NotFound';
import UserService from '../services/user';
import LeftNavigation from '../components/Navigation/LeftNavigation';

@observer
class App extends Component {
  renderAuthenticated() {
    return [
      <Route exact path="/" key="home" component={Home} />,
      <Route path="/new-task" key="new-task" component={NewTask} />,
      <Route path="/settings" key="settings" component={Settings} />,
      <Route path="/404" key="not-found" component={NotFound} />,
    ];
  }

  renderUnAuthenticated() {
    return [
      <Route exact path="/" key="login-default" component={Login} />,
      <Route path="/login" key="login" component={Login} />,
      <Route path="/register" key="register" component={Register} />,
    ];
  }

  get renderWithAuthenticated() {
    const isLoaded = !!UserService.isLoaded;
    if (!isLoaded)
      return (
        <div className="overlay-waiting">
          <CircularProgress
            size={60}
            thickness={3}
          />
        </div>
      );

    const isLogin = !!UserService.info.uid;
    if (isLogin)
      return this.renderAuthenticated();
    return this.renderUnAuthenticated();
  }

  render() {
    return (
      <Router>
        <div>
          {this.renderWithAuthenticated}
          <LeftNavigation />
        </div>
      </Router>
    );
  }
}

App.defaultProps = {

};

App.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
};

export default App;
