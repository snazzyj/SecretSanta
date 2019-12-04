import React, {Component} from 'react';
import {Link} from 'react-router-dom';

class HomePage extends Component {

    render() {
        return(
            <section>
                <Link to="/create">Create a Pool</Link>
                <span> </span>
                <Link to="/signup">Sign Up</Link>
                <span> </span>
                <Link to="/profile">Profile</Link>
            </section>
        )
    }

}

export default HomePage;