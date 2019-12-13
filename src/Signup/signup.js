import React, { Component } from 'react';
import {Link} from 'react-router-dom';

const validEmailRegex = RegExp(/^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i); // eslint-disable-line
const validPasswordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/;
const validateForm = (errors) => {
    let valid = true;
    Object.values(errors).forEach(
        (val) => val.length > 0 && (valid = false)
    );
    return valid;
}

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
            }
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
                    : 'Must contain a number, Upper case letter, Lower case letter and be 6 to 20 characters long'
        }

        this.setState({
            errors,
            [name]: value
        })
    }

    handleSubmit = (e) => {
        e.preventDefault();
        console.log('Submitted!')
        if (validateForm(this.state.errors)) {
            console.log('Valid info')
        } else {
            console.log('Invalid Form')
        }

        // const { name, email, password } = e.target;
        // const user = {
        //     name: name.value,
        //     email: email.value,
        //     password: password.value
        // }

        this.props.history.push('/login')
        //email + password validator before posting
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