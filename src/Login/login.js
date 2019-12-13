import React, {Component} from 'react';
import SecretSantaContext from '../SecretSantaContext';

class Login extends Component {

    static contextType = SecretSantaContext;

    handleSubmit = (e) => {
        e.preventDefault();

        const {email, password} = e.target;

        const user = {
            email: email.value, 
            password : password.value, 
        }

        this.context.setUserLogin(user)
        

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

            </div>
        )
    }

}

export default Login;