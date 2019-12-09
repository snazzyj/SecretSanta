import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Route, Switch } from 'react-router-dom';
import './App.css';
import CreatePool from './CreatePool/createpool';
import SignUp from './Signup/signup';
import Profile from './Profile/profile';
import NavBar from './HomePage/navbar';
import Pairs from './Pairings/pairs';
import SecretSantaContext from './SecretSantaContext';

class App extends Component {

  state = {
    users: []
  };

  setPool = users => {
    this.setState({
      users
    })
  }

  render() {
    const contextValue = {
      users: this.state.users,
      setPool: this.setPool
    }

    console.log(this.state.users)
    return (
      <div className='App'>

        <SecretSantaContext.Provider value={contextValue}>

          <NavBar />

          <main>
            <Switch>
              <Route exact path="/create" component={CreatePool} />
              <Route exact path="/pairs" component={Pairs} />
              <Route exact path="/signup" component={SignUp} />
              <Route exact path="/profile" component={Profile} />
            </Switch>
          </main>

        </SecretSantaContext.Provider>
      </div>
    );
  }
}

export default App;