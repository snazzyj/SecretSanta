import React, {Component} from 'react';
import {Link } from 'react-router-dom';
import SecretSantaContext from '../SecretSantaContext';

class Homepage extends Component {

    static contextType = SecretSantaContext;

    setHello = (user) => {
        if(user.isLoggedIn) {
            return (
                <h2>Welcome, {user.name}</h2>
            )
        }
    }

    render() {

        const {user} = this.context;

        return (
            <div>

            <header>
                {this.setHello(user)}
            </header>

            <section>
                <Link to="/create">Create a Pool</Link>
                <Link to="/signup">Sign Up</Link>
            </section>

            </div>
        )
    }

}

export default Homepage;