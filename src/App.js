import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import './App.css';
import config from './config';
import CreatePool from './CreatePool/createpool';
import SignUp from './Signup/signup';
import Profile from './Profile/profile';
import NavBar from './Nav/navbar';
import Pairs from './Pairings/pairs';
import Login from './Login/login';
import Homepage from './HomePage/homepage';
import Verify from './Verify/verify';
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
      pool_id: [],
      userInterests: [],
      userPairs: []
    },
    new_pool_id: null
  };

  componentDidMount() {
    const user = JSON.parse(localStorage.getItem('user'))

    if (user) {
      this.setState({
        user
      })
    }
  }

  componentDidUpdate(prevState) {
    if (this.state.user !== prevState.user) {
      localStorage.setItem('user', JSON.stringify(this.state.user))
    }
  }


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
        pool_id: user.pool_id,
        userInterests: this.getInterest(user.email),
        // userPairs: this.getPairs(user.pool_id)
      }
    })
    console.log(this.state.user)


    localStorage.setItem('user', JSON.stringify(this.state.user))
  }

  getInterest = (email) => {
    fetch(`${url}/interests/${email}`, {
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
        })
      })
  }

  // getPairs = (pool_id) => {
  //   const pair = [];
  //     if (pool_id !== undefined && pool_id.length > 0) {
  //       pool_id.forEach((id) => {
  //         fetch(`${url}/pairings/${id.pool_id}`, {
  //           method: 'GET'
  //         })
  //           .then(res => {
  //             if (!res.ok) {
  //               throw new Error('Something went wrong')
  //             }
  //             return res.json()
  //           })
  //           .then(res => {
  //             const { id } = this.state.user
  //             let filteredPairs = res.filter((pair) => {
  //               return pair.id === id
  //             })  
  //              pair.push({
  //               gifteeName: filteredPairs[0].giftee,
  //               giftee_id: filteredPairs[0].giftee_id
  //             })
              
  //             this.setState({
  //               user: {
  //                 ...this.state.user,
  //                 userPairs: [...this.state.user.userPairs, pair]
  //               }
  //             })
  //           })
  //       })

  //       console.log({pair})


  //     }

   
  // }

  setUserLogout = () => {
    this.setState({
      user: {
        name: '',
        email: '',
        isLoggedIn: false,
        id: '',
        pool_id: [],
        userInterests: []
      }
    })

    localStorage.removeItem('user')
  }

  setPoolId = pool_id => {
    this.setState({
      new_pool_id: pool_id
    })
  }

  removeUserInterest = interest => {
    const { email } = this.state.user

    this.setState({
      user: {
        ...this.state.user,
        userInterests: this.state.user.userInterests.filter((item) => {
          return item !== interest
        })
      }
    })

    fetch(`${url}/interests/${email}`, {
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
      })
  }

  addUserInterest = (interest) => {
    const { email } = this.state.user
    let newInterest = { interest, email }

    this.setState({
      user: {
        ...this.state.user,
        userInterests: this.state.user.userInterests.concat(newInterest)
      }
    })

    fetch(`${url}/interests/${email}`, {
      method: 'POST',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify({
        interest,
        email
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
      setUserLogin: this.setUserLogin,
      setUserLogout: this.setUserLogout,
      setPoolId: this.setPoolId,
      removeUserInterest: this.removeUserInterest,
      addUserInterest: this.addUserInterest
    }

    // console.log(this.state.user)

    return (
      <div className='App'>

        <SecretSantaContext.Provider value={contextValue}>

          <NavBar />

          <main>
            <Switch>
              <Route exact path="/" component={Homepage} />
              <Route path="/create" component={CreatePool} />
              <Route path="/pairs/:pool_id" component={Pairs} />
              <Route path="/signup" component={SignUp} />
              <Route path="/profile/:userId" component={Profile} />
              <Route path="/login" component={Login} />
              <Route path="/verify/:poolId" component={Verify} />
            </Switch>
          </main>

        </SecretSantaContext.Provider>
      </div>
    );
  }
}

export default App;