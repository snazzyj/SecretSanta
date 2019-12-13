import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import SecretSantaContext from '../SecretSantaContext';

class NavBar extends Component {

    static contextType = SecretSantaContext;

    render() {

        const userId = this.context.user.id;
        return(
            <nav>
                <Link to="/">Secret Santa</Link>
                <span> </span>
                <Link to="/create">Create a Pool</Link>
                <span> </span>
                <Link to={`/profile/${userId}`}>Profile</Link>
                <span> </span>
                <Link to="/login">Login</Link>

            </nav>
        )
    }

}

export default NavBar
;