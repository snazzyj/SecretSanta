import React, {Component} from 'react';
import './demo.css'

class Demo extends Component {
    render() {
        return (
            <div className="demo">
                <h1>How it Works</h1>
                <h3>Demo Account</h3>
                    <ul>
                        <li>Email: bar@gmail.com</li>
                        <li>Password: Password123</li>
                    </ul>
                <ul className="steps">
                    <li>❅ Register for an account or use the demo account</li>
                    <li>❅ Create a pool of people supplying both a name and an email</li>
                    <li>❅ A notification will be sent to each person within the pool informing them of who their partner is</li>
                    <li>❅ You, as the creator, will be able to see all pairs</li>
                    <li>❅ Going to the profile page will allow you to add your own interests and view who you have been paired up with</li>
                    <li>❅ If you have created a pool, you will be able to see that also</li>
                </ul>
            </div>
        )
    }
}

export default Demo;