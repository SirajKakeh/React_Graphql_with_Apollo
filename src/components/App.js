import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import '../styles/App.css';
import LinkList from './LinkList';
import CreateLink from './CreateLink';
import Login from "./Login";
import Header from "./Header";
import { AUTH_TOKEN } from '../constants';

class App extends Component {
  render() {
    return (
      <div className="center w85">
        <Header />
        <div className="ph3 pv1 background-gray">
          <Switch>
            <Route exact path="/" component={HomePage} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/create" component={CreateLink} />
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
