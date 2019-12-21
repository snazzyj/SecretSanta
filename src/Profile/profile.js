import React, {Component} from 'react';
import SecretSantaContext from '../SecretSantaContext';
import config from '../config';

class Profile extends Component {

    static contextType = SecretSantaContext;

    handleAddInterest = (e) => {
        e.preventDefault();
    }

    render() {

        const {
            //allInterests, //needed for autocomplete later    
            addUserInterest,
            removeUserInterest,
            // user
        } = this.context

        

        const {userInterests} = this.context.user;
        console.log(userInterests);

        return (
            <section>
                <h1>Profile</h1>

                <form>
                    <label>Add Interests</label>
                    <input ref={HTMLInputElement => this.input = HTMLInputElement}/>

                    <button onClick={(e) => {this.handleAddInterest(e); addUserInterest( this.input.value)}}>Add</button>
                </form>

                <h3>Interests</h3>
                <ul>
                    {this.context.user.userInterests.map( (interest, i) => (
                        <li key={`${interest}${i}`}>
                            {interest}
                            <a href="/" onClick={(e) => {
                                e.preventDefault();
                                removeUserInterest(interest);
                            }}>(X)</a>
                        </li>
                    ))}
                </ul>

                <h3>Current Partner</h3>
                <a href="/">Partner's Name</a>

            </section>

        )
    }

}

export default Profile;