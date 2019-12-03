import React, {Component} from 'react';

class Profile extends Component {

    render() {
        return (
            <section>
                <h1>Profile</h1>

                <form>
                    <label>Add Interests</label>
                    <input />

                    <button>Add</button>
                </form>

                <ul>
                    <h3>Interests</h3>
                    <li>Candles</li>
                    <li>Books</li>
                    <li>Dice</li>
                </ul>

                <h3>Current Partner</h3>
                <a href="#">Partner's Name</a>

            </section>

        )
    }

}

export default Profile;