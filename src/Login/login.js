import React, {Component} from 'react';
import SecretSantaContext from '../SecretSantaContext';

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

        const user = {
            email: email.value, 
            password : password.value, 
        }

        if(user.email === 'test@example.com' && user.password === 'password') {
            this.context.setUserLogin(user);
            this.props.history.push('/')
        } else {
            this.setState({
                error: 'Invalid Email or Password'
            })
        }       

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