import React, { Component } from 'react';
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
      name: '',
      email: '',
      id: null,
      isLoggedIn: false,
      pool_id: null,
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
        name: user.name,
        email: user.email,
        isLoggedIn: true,
        id: user.id,
      }
    })
  }

  setUserLogout = () => {
    this.setState({
      user: {
        name: '',
        email: '',
        isLoggedIn: false,
        id: null
      }
    })
  }
  
  setPoolId = pool_id => {
    this.setState({
      user: {
        ...this.state.user,
        pool_id
      }
    })
  }

  render() {
    const contextValue = {
      users: this.state.users,
      user: this.state.user,
      setPool: this.setPool,
      setUserLogin: this.setUserLogin,
      setUserLogout: this.setUserLogout,
      setPoolId: this.setPoolId
    }

    console.log(this.state.user)

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
              <Route path="/profile/:userId" component={Profile} />
              <Route path="/login" component={Login} />
            </Switch>
          </main>

        </SecretSantaContext.Provider>
      </div>
    );
  }
}

export default App;