import React, {Component} from 'react';
import {Link} from 'react-router-dom';

class NavBar extends Component {

    render() {
        return(
            <nav>
                <Link to="/">Secret Santa</Link>
                <span> </span>
                <Link to="/create">Create a Pool</Link>
                <span> </span>
                <Link to="/signup">Sign Up</Link>
                <span> </span>
                <Link to="/profile">Profile</Link>
            </nav>
        )
    }

}

export default NavBar
;