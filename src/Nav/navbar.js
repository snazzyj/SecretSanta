import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import SecretSantaContext from '../SecretSantaContext';
import TokenService from '../services/token-service';
import './navbar.css'

class NavBar extends Component {

    static contextType = SecretSantaContext;

    handleLogoutClick = (e) => {
        e.preventDefault();
        TokenService.clearAuthToken();
        this.context.setUserLogout();
    }

    render() {

        const userId = this.context.user.id;
        const {isLoggedIn} = this.context.user;
        return(
            <nav className="navbar">
                <Link to="/" className="secretsanta">Secret Santa</Link>
                <span> </span>
                {isLoggedIn && 
                <Link to="/create" className="createpool">Create a Pool</Link>
                }
                <span> </span>
                {isLoggedIn &&
                <Link to={`/profile/${userId}`} className="profile">Profile</Link>
                }
                <span> </span>
                {TokenService.hasAuthToken()
                ? <Link onClick={this.handleLogoutClick} to='/' className="login">Logout</Link>
                : <Link to="/login" className="login">Login</Link>
                }
                
            </nav>
        )
    }

}

export default NavBar
;