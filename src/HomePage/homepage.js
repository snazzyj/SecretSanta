import React, {Component} from 'react';
import {Link } from 'react-router-dom';
import SecretSantaContext from '../SecretSantaContext';

class Homepage extends Component {

    static contextType = SecretSantaContext;

    setHello = (user) => {
        if(user.isLoggedIn) {
            return (
                <h2>Hello, {user.name}</h2>
            )
        } else {
            return ''
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