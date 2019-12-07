import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Route, Switch } from 'react-router-dom';
import './App.css';
import CreatePool from './CreatePool/createpool';
import SignUp from './Signup/signup';
import Profile from './Profile/profile';
import HomePage from './HomePage/homepage';
import Pairs from './Pairings/pairs';
import SecretSantaContext from './SecretSantaContext';

class App extends Component {

  state = {
    users: [
    {
      id: 1,
      name: "Alex",
      email: "silentx.alex@gmail.com"
    },
    {
      id: 2,
      name: "Leyna",
      email: "lmf@gmail.com"
    },
    {
      id: 3,
      name: "Robin",
      email: "ex@gmail.com"
    },
    {
      id: 4,
      name: "Nick",
      email: "biteme@gmail.com"
    },
    {
      id: 5,
      name: "Test1",
      email: "null@null.com"
    },
    {
      id: 6,
      name: "Test2",
      email: "null@null.com"
    },
    {
      id: 7,
      name: "Test3",
      email: "null@null.com"
    },
    {
      id: 8,
      name: "Test4",
      email: "null@null.com"
    },
    {
      id: 9,
      name: "Test5",
      email: "null@null.com"
    },
    {
      id: 10,
      name: "Test6",
      email: "null@null.com"
    }
    ]
  };



  setPool = users => {
    this.setState({
      users
    })
  }

  render() {
    const contextValue = {
      users: this.state.users,
      setPool : this.setPool
    }
    
    // console.log(this.state.users)
    return (
      <div className='App'>

        <SecretSantaContext.Provider value={contextValue}>

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