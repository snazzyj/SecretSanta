import React, {Component} from 'react';

class Profile extends Component {

    //change event per field
    //onsubmit for form
    //eslint_ignore

    render() {

        return (
            <section>
                <h1>Profile</h1>

                <form>
                    <label>Add Interests</label>
                    <input />

                    <button>Add</button>
                </form>

                <h3>Current Partner</h3>
                <a href="#">Partner's Name</a>

            </section>

        )
    }

}

export default Profile;