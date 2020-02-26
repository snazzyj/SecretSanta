import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import SecretSantaContext from '../SecretSantaContext';
import TokenService from '../services/token-service'
import './mobile.css'

class Mobile extends Component {

    static contextType = SecretSantaContext
    container = React.createRef()
    state = {
        isOpen: false
    }

    componentDidMount() {
        document.addEventListener("mousedown", this.handleClickOutside);
    }
    componentWillUnmount() {
        document.removeEventListener("mousedown", this.handleClickOutside);
    }

    toggleNav = () => {

        const { isOpen } = this.state

        this.setState({
            isOpen: !isOpen
        })
    }

    closeNavBar = () => {
        this.setState({
            isOpen: false
        });
    }

    handleLogoutClick = (e) => {
        e.preventDefault();
        TokenService.clearAuthToken();
        this.context.setUserLogout();
    }

    handleClickOutside = event => {
        if (this.container.current && !this.container.current.contains(event.target)) {
            this.setState({
                isOpen: false,
            });
        };
    };

    render() {

        const { isOpen } = this.state;
        const userId = this.context.user.id;
        const { isLoggedIn } = this.context.user;

        return (
            <div className="container" ref={this.container}>
                <button className="burger-menu" onClick={this.toggleNav}>
                    <div className="bar1" />
                    <div className="bar2" />
                    <div className="bar3" />
                </button>

                {isOpen && (
                    <nav className="mobileNav">
                        <Link to="/" onClick={this.closeNavBar} className="secretsanta">Secret Santa</Link>
                        <span> </span>
                        <Link to="/create" onClick={this.closeNavBar} className="createpool">Create a Pool</Link>
                        <span> </span>
                        {isLoggedIn && (
                            <Link to={`/profile/${userId}`} onClick={this.closeNavBar} className="profile">Profile</Link>
                        )}
                        <span> </span>
                        {TokenService.hasAuthToken()
                            ? <Link onClick={() => {
                                this.handleLogoutClick()
                                this.closeNavBar()
                            }
                            }
                                to='/'
                                className="login">Logout</Link>
                            : <Link to="/login" onClick={this.closeNavBar} className="login">Login</Link>
                        }

                    </nav>
                )}
            </div>
        )
    }
}

export default Mobile;