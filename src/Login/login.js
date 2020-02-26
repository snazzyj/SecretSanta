import React, { Component } from 'react';
import SecretSantaContext from '../SecretSantaContext';
import AuthApiService from '../services/auth-api-service';
import './login.css'

class Login extends Component {

    constructor(props) {
        super(props);
        this.state = {
            error: ''
        };
    }
    static contextType = SecretSantaContext;

    handleSubmit = (e) => {
        e.preventDefault();

        const { email, password } = e.target;

        AuthApiService.postLogin({
            email: email.value,
            password: password.value
        })
            .then(res => {
                const { user } = res;
                this.context.setUserLogin(user)
                this.props.history.push('/')
            })
            .catch(error => {
                this.setState({
                    error
                })
            });

    }

    render() {

        return (
            <div className="loginSection">
                <h1>Login</h1>

                <form className="loginForm" onSubmit={this.handleSubmit}>
                    <label htmlFor="email">Email</label>
                    <input name="email" type="email" required/>
                    <label htmlFor="password">Password</label>
                    <input name="password" type="password" required />
                    <button className="loginBtn" type="submit">Login</button>
                </form>
                {this.state.error}
            </div>
        )
    }

}

export default Login;