import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Route, Switch } from 'react-router-dom';
import './App.css';
import CreatePool from './CreatePool/createpool';
import SignUp from './Signup/signup';
import Profile from './Profile/profile';
import HomePage from './HomePage/homepage';

class App extends Component {

  render() {
    return (
      <div className='App'>

        <nav className="App__Nav">
          <Link to="/">Secret Santa</Link>
          <span> </span>
          <Link to="/create">Create a Pool</Link>
          <span> </span>
          <Link to="/profile">Profile</Link>
          <span> </span>
          <Link to="/login">Login</Link>
        </nav>

        <main>

          <Switch>
            <Route exact path="/" component={HomePage} />
            <Route exact path="/create" component={CreatePool} />
            <Route exact path="/signup" component={SignUp} />
            <Route exact path="/profile" component={Profile} />
          </Switch>
        </main>
      </div>
    );
  }
}

export default App;