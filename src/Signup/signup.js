import React, { Component } from 'react';

const validEmailRegex = RegExp(/^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i);
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

    handleChange = (event) => {
        event.preventDefault();
        const { name, value } = event.target;
        let errors = this.state.errors;

        switch (name) {
            case 'email':
                errors.email =
                    validEmailRegex.test(value)
                        ? ''
                        : 'Email is not valid!';
                break;
            case 'password':
                errors.password =
                    value.length < 5
                        ? 'Password must be 5 characters long!'
                        : '';
                
                break;
            default:
                break;
        }

        this.setState({
            errors,
            [name]: value
        })
    }

        handleSubmit = (e) => {
            e.preventDefault();
            console.log('Submitted!')
            if(validateForm(this.state.errors)) {
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

            this.props.history.push('/')
            //email + password validator before posting
        }


        render() {
            const {errors} = this.state;
            return (
                <div>
                    <h1>Sign up</h1>

                    <form onSubmit={this.handleSubmit}>
                        <label htmlFor="name">Name</label>
                        <input type="text" name="name" required />

                        <label htmlFor="email">Email</label>
                        <input type="email" name="email" required onChange={this.handleChange}/>
                        {errors.email.length > 0 &&
                            <span>{errors.email}</span>}

                        <label htmlFor="password">Password</label>
                        <input type="password" name="password" required onChange={this.handleChange} />
                        {errors.password.length > 0 &&
                        <span>{errors.password}</span>}

                        <button>Submit</button>

                    </form>
                </div>
            )
        }


    }

    export default SignUp;