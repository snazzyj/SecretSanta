import React, { Component } from 'react';
import { Route, Switch, BrowserRouter } from 'react-router-dom';
import './App.css';
import config from './config';
import CreatePool from './CreatePool/createpool';
import SignUp from './Signup/signup';
import Profile from './Profile/profile';
import NavBar from './Nav/navbar';
import MobileNav from './mobileNav/mobile';
import Pairs from './Pairings/pairs';
import Login from './Login/login';
import Homepage from './HomePage/homepage';
import Verify from './Verify/verify';
import Snow  from './Snow/snow';
import SecretSantaContext from './SecretSantaContext';
const url = config.API_ENDPOINT;

class App extends Component {

  state = {
    users: [],
    user: {
      name: '',
      email: '',
      id: '',
      isLoggedIn: false,
      pairData: [],
      userInterests: [],
      poolData: []
    },
    isSmallScreen: false
  };

  componentDidMount() {
    const user = JSON.parse(localStorage.getItem('user'))
    let mediaQuery = window.matchMedia('(max-width: 520px)')

    if (user) {
      this.setState({
        user
      })
    };

    if(mediaQuery.matches) {
      this.setState({
        ...this.state,
        isSmallScreen: true
      })
    };
  }

  componentDidUpdate(prevState) {
    if (this.state.user !== prevState.user) {
      localStorage.setItem('user', JSON.stringify(this.state.user))
    };
  }


  setPool = users => {
    this.setState({
      users
    });
  }

  setPoolData = (pool_name, pool_id) => {
    this.setState({
      user: {
        ...this.state.user,
        poolData: [
          ...this.state.user.poolData,
          {
            pool_id,
            pool_name
          }
        ]
      }
    });
  }

  setPairData = pair => {
    const {giftee, giftee_id} = pair;
    this.setState({
      user: {
        ...this.state.user,
        pairData: [
          ...this.state.user.pairData,
          {
            giftee,
            giftee_id
          }
        ]
      }
    });
  }

  setUserLogin = user => {
    this.setState({
      user: {
        name: user.name,
        email: user.email,
        isLoggedIn: true,
        id: user.id,
        pairData: user.pairData,
        userInterests: this.getInterest(user.id),
        poolData: user.poolData
      }
    });

    localStorage.setItem('user', JSON.stringify(this.state.user));
  }

  setUserLogout = () => {
    this.setState({
      user: {
        name: '',
        email: '',
        isLoggedIn: false,
        id: '',
        pool_id: [],
        userInterests: [],
        pairData: [],
        poolData: []
      }
    });

    localStorage.removeItem('user');
  }


  getInterest = (id) => {
    fetch(`${url}/interests/${id}`, {
      method: 'GET'
    })
      .then(res => {
        if (!res.ok) {
          throw new Error(`Something went wrong fetching user interests`)
        }
        return res.json()
      })
      .then(res => {
        this.setState({
          user: {
            ...this.state.user,
            userInterests: res
          }
        });
      });
  }
  removeUserInterest = interest => {
    const { id } = this.state.user

    this.setState({
      user: {
        ...this.state.user,
        userInterests: this.state.user.userInterests.filter((item) => {
          return item !== interest
        })
      }
    });

    fetch(`${url}/interests/${id}`, {
      method: 'DELETE',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify({
        interest
      })
    })
      .then(res => {
        if (!res.ok) {
          throw new Error(`Something went wrong deleting interest`)
        }
        return res.json()
      })
      .catch(error => {
        this.setState({
          error
        })
      });
  }

  addUserInterest = (interest) => {
    const { id } = this.state.user
    let newInterest = { interest, id }

    this.setState({
      user: {
        ...this.state.user,
        userInterests: this.state.user.userInterests.concat(newInterest)
      }
    })

    fetch(`${url}/interests/${id}`, {
      method: 'POST',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify({
        interest,
        id
      })
    })
      .then(res => {
        if (!res.ok) {
          throw new Error(`Something went wrong posting interest`)
        }
        return res.json()
      })
      .catch(error => {
        this.setState({
          error
        })
      })
  }

  render() {
    const contextValue = {
      users: this.state.users,
      user: this.state.user,
      setPool: this.setPool,
      setPoolData: this.setPoolData,
      setPairData: this.setPairData,
      setUserLogin: this.setUserLogin,
      setUserLogout: this.setUserLogout,
      removeUserInterest: this.removeUserInterest,
      addUserInterest: this.addUserInterest
    }

    const {isSmallScreen} = this.state;

    return (
      <div className='App'>

        <BrowserRouter>

          <SecretSantaContext.Provider value={contextValue}>

            {isSmallScreen ? (
              <MobileNav />
              ) : (
              <NavBar />
              )}


            <Snow />

            <main>
              <Switch>
                <Route exact path="/" component={Homepage} />
                <Route path="/signup" component={SignUp} />
                <Route path="/login" component={Login} />
                <Route path="/create" component={CreatePool} />
                <Route path="/pairs/:poolId" component={Pairs} />
                <Route path="/profile/:userId" component={Profile} />
                <Route path="/verify/:poolId" component={Verify} />
              </Switch>
            </main>

          </SecretSantaContext.Provider>

        </BrowserRouter>
      </div>
    );
  }
}

export default App;