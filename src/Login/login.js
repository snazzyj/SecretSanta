import React, {Component} from 'react';
import SecretSantaContext from '../SecretSantaContext';
import AuthApiService from '../services/auth-api-service';
import TokenService from '../services/token-service';

class Login extends Component {

    constructor(props) {
        super(props);
        this.state = {
            error: ''
        }
    }
    static contextType = SecretSantaContext;

    handleSubmit = (e) => {
        e.preventDefault();

        const {email, password} = e.target;
        console.log(email.value)

        AuthApiService.postLogin({
            email: email.value,
            password: password.value
        })
        .then(res => {
            console.log(res)
            email.value = '';
            password.value = '';
            TokenService.saveAuthToken(res.authToken)
            this.history.push('/')
        })
        .catch(res => {
            this.setState({
                error: res.error
            })
        })
  

    }

    render() {

        return (
            <div>
                <p>Login</p>

                <form onSubmit={this.handleSubmit}>
                    <label htmlFor="email">Email</label>
                    <input name="email"/>
                    <label htmlFor="password">Password</label>
                    <input name="password"/>

                    <button type="submit">Submit</button>
                </form>
                {this.state.error}
            </div>
        )
    }

}

export default Login;