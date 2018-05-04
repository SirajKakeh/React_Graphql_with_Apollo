import React, { Component } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import '../styles/App.css';
import LinkList from './LinkList';
import CreateLink from './CreateLink';
import Login from "./Login";
import Header from "./Header";
import { AUTH_TOKEN } from '../constants';
import Search from './Search';

class App extends Component {
  render() {
    return (
      <div className="center w85">
        <Header />
        <div className="ph3 pv1 background-gray">
          <Switch>
            <Route exact path='/' render={() => <Redirect to='/feed/1' />} />
            <Route exact path='/login' component={Login} />
            <Route exact path='/create' component={CreateLink} />
            <Route exact path='/search' component={Search} />
            <Route exact path='/top' component={LinkList} />
            <Route exact path='/feed/:page' component={LinkList} />
            <Route render={() => <Redirect to='/' />} />
          </Switch>
        </div>
      </div>
    );
  }
}

function HomePage() {
  const authToken = localStorage.getItem(AUTH_TOKEN);
  return authToken ? <LinkList /> : <h2>You must be logged in first to see feed!</h2>;
}

export default App;
