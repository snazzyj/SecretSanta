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
      password: '',
      id: 1,
      isLoggedIn: false,
      userInterests: ['socks', 'chocolate', 'candles']
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
        name: 'Foo Bar',
        email: user.email,
        password: user.password,
        isLoggedIn: true,
        id: 1,
        userInterests: []
      }
    })
  }

  addUserInterest = interest => {
    // let userInterest = this.state.user.userInterests;
    // userInterest.push(interest)
    // userInterest.concat(interest)
    // this.setState({
    //   user: userInterest
    // })
    console.log(interest)
    this.setState({
      user: {
      userInterests: this.state.user.userInterests.concat(interest),
      ...this.state.user
    }
    })

    
  }

  removeUserInterest = interest => {
    let copy = [...this.state.user.userInterests];
    copy.splice(interest, 1);

    this.setState({
      user: {userInterests: copy, ...this.state.user}
    })
  }

  render() {
    const contextValue = {
      users: this.state.users,
      user: this.state.user,
      setPool: this.setPool,
      setUserLogin: this.setUserLogin,
      addUserInterest: this.addUserInterest,
      removeUserInterest: this.removeUserInterest
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