import React from 'react';
import { Link } from 'react-router-dom';
import { Route, Switch } from 'react-router-dom';
import './App.css';
import CreatePool from './CreatePool/createpool';
import SignUp from './Signup/signup';
import Profile from './Profile/profile';

function App() {
  return (
    <div className='App'>
      <nav className="App__Nav">
        <Link to="/">Secret Santa</Link>
        <Link to="/login">Login</Link>
      </nav>

      <main>

          <section>
             <Link to="/create">Create a Pool</Link>
             <Link to="/signup">Sign Up</Link>
             <Link to="/profile">Profile</Link>
            </section>

          <Route exact path="/create" component={CreatePool} />
          <Route exact path="/signup" component={SignUp}/>
          <Route exact path="/profile" component={Profile}/>

      </main>
    </div>
  );
}

export default App;