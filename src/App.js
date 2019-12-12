import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Route, Switch } from 'react-router-dom';
import './App.css';
import CreatePool from './CreatePool/createpool';
import SignUp from './Signup/signup';
import Profile from './Profile/profile';
import NavBar from './Nav/navbar';
import Pairs from './Pairings/pairs';
import Login from './Login/login';
import Homepage from './HomePage/homepage'
import SecretSantaContext from './SecretSantaContext';

class App extends Component {

  state = {
    users: [],
    user: {
      email: '',
      password: '',
      id: '',
      isAdmin: false,
      isLoggedIn: false,
    }
  };

  setPool = users => {
    this.setState({
      users
    })
  }

  setUserLogin = user => {
    this.setState({
      user: {
        email: user.email,
        password: user.password,
        isLoggedIn: user.isLoggedIn,
        isAdmin: user.admin
      }
    })
  }

  render() {
    const contextValue = {
      users: this.state.users,
      setPool: this.setPool,
      setUserLogin: this.setUserLogin
    }

    console.log(this.state.users)
    return (
      <div className='App'>

        <SecretSantaContext.Provider value={contextValue}>

          <NavBar />

          <main>
            <Switch>
              <Route exact path="/" component={Homepage} />
              <Route path="/create" component={CreatePool} />
              <Route path="/pairs" component={Pairs} />
              <Route path="/signup" component={SignUp} />
              <Route path="/profile" component={Profile} />
              <Route path="/login" component={Login} />
            </Switch>
          </main>

        </SecretSantaContext.Provider>
      </div>
    );
  }
}

export default App;