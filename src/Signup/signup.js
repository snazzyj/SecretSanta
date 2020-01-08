import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import AuthApiService from '../services/auth-api-service';

const validEmailRegex = RegExp(/^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i); // eslint-disable-line
const validPasswordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/;

class SignUp extends Component {

    constructor(props) {
        super(props);
        this.state = {
            name: '',
            email: '',
            password: '',
            errors: {
                email: '',
                password: ''
            },
            error: null,
        };
    }

    handleEmail = (event) => {
        event.preventDefault();
        const { name, value } = event.target;
        let errors = this.state.errors;

        if (name === 'email') {
            errors.email =
                validEmailRegex.test(value)
                    ? ''
                    : 'Email is not valid!';
        }

        this.setState({
            errors,
            [name]: value
        })
    }

    handlePassword = (event) => {
        event.preventDefault();
        const { name, value } = event.target;
        let errors = this.state.errors;

        if (name === 'password') {
            errors.password =
            validPasswordRegex.test(value)
                    ? ''
                    : 'Must contain a Number, Upper case letter, Lower case letter and be 6 to 20 characters long'
        }

        this.setState({
            errors,
            [name]: value
        })
    }

    handleSubmit = (e) => {
        e.preventDefault();

        const {name, email, password} = e.target

        this.setState({
            error: null
        });

        AuthApiService.postUser({
            name: name.value,
            email: email.value,
            password: password.value
        })
        .then(user => {
            name.value = ''
            email.value = ''
            password.val = ''
            this.props.history.push('/login')
        })
        .catch(res => {
            this.setState({
                error: res.error
            });
        })

    }


    render() {
        const { errors } = this.state;
        return (
            <div>

                <p>Already have an account? <Link to="/login">Login</Link></p>

                <h1>Sign up</h1>

                <form onSubmit={this.handleSubmit}>
                    <label htmlFor="name">Name</label>
                    <input type="text" name="name" required />

                    <label htmlFor="email">Email</label>
                    <input type="email" name="email" required onChange={this.handleEmail} />
                    {errors.email.length > 0 &&
                        <span>{errors.email}</span>}

                    <label htmlFor="password">Password</label>
                    <input type="password" name="password" required onChange={this.handlePassword} />
                    {errors.password.length > 0 &&
                        <span>{errors.password}</span>}

                    <button>Submit</button>

                </form>
            </div>
        )
    }


}

export default SignUp;