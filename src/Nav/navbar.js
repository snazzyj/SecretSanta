import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import SecretSantaContext from '../SecretSantaContext';
import TokenService from '../services/token-service';

class NavBar extends Component {

    static contextType = SecretSantaContext;

    handleLogoutClick = (e) => {
        e.preventDefault();
        TokenService.clearAuthToken();
        this.context.setUserLogout();
    }

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
                {TokenService.hasAuthToken()
                ? <Link onClick={this.handleLogoutClick} to='/'>Logout</Link>
                : <Link to="/login">Login</Link>
                }
                
            </nav>
        )
    }

}

export default NavBar
;