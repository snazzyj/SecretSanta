import React, {Component} from 'react';
import {Link } from 'react-router-dom';

class Homepage extends Component {

    render() {
        return (
            <section>
            <Link to="/create">Create a Pool</Link>
            <Link to="/signup">Sign Up</Link>
            </section>
        )
    }

}

export default Homepage;