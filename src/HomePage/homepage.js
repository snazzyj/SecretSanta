import React, {Component} from 'react';
import {Link } from 'react-router-dom';
import Demo from '../demo/demo'
import SecretSantaContext from '../SecretSantaContext';
import './homepage.css'

class Homepage extends Component {

    static contextType = SecretSantaContext;

    setHello = (user) => {
        if(user.isLoggedIn) {
            return (
                <h1>Welcome, {user.name}</h1>
            )
        } else {
            return <p className="notLoggedIn"></p>
        };
    }

    render() {

        const {user} = this.context;
        const {isLoggedIn} = this.context.user;
        return (
            <div>

            <header>
                {this.setHello(user)}
            </header>

            <section className="mainSelection">
                <Link to="/create" className="createpoolBox">Create a Pool</Link>
                {!isLoggedIn && 
                <Link to="/signup" className="signup">Sign Up</Link>
                }

            </section>

                <Demo />
            </div>
        )
    }

}

export default Homepage;