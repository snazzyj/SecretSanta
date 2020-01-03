import React, { Component } from 'react';
import SecretSantaContext from '../SecretSantaContext';
import config from '../config';

const url = `${config.API_ENDPOINT}`

class Profile extends Component {

    state = {
        error: null,
        giftee: '',
        gifteeEmail: '',
        userInterests: []
    }

    static contextType = SecretSantaContext;

    componentDidMount() {
        const {email} = this.context.user
        const {pool_id} = this.context.user
        
        // fetch(`${url}/pairings/${pool_id}`, {
        //     method: 'GET'
        // })
        //     .then(res => {
        //         if (!res.ok) {
        //             throw new Error('Something went wrong')
        //         }
        //         return res.json()
        //     })
        //     .then(res => {
        //         const data = res;
        //         // const { email } = this.context.user
        //         data.map((user) => {
        //             console.log(user)
        //             if (user.email === email) {
        //                 this.setState({
        //                     gifteeEmail: user.giftee
        //                 })
                    
        //             }

        //     })
        // .catch(error =>{
        //     this.setState({
        //         error
        //     })
        // })

        // fetch(`${url}/users/email/${this.state.gifteeEmail}`, {
        //     method: 'GET'
        // })
        //     .then(res => {
        //         if (!res.ok) {
        //             throw new Error(`Something went wrong fetching the giftee's name`)
        //         }
        //        return res.json()
        //     })
        //     .then(res => {
        //         this.setState({
        //             giftee: res[0].name
        //         })
                
        //     })
        // })
        // .catch(error =>{
        //     this.setState({
        //         error
        //     })
        // })

        fetch(`${url}/interests/${email}`, {
            method: 'GET'
        })
            .then(res => {
                if(!res.ok) {
                    throw new Error(`Something went wrong fetching user interests`)
                }

                return res.json()
            })
            .then(res => {
                this.setState({
                    userInterests: res
                })
            })
            .catch(error =>{
                this.setState({
                    error
                })
            })
    }

    componentDidUpdate(prevState) {
        if(this.state.userInterests !== prevState.userInterests) {
        }
    }
    addUserInterest = (interest, e) => {
        e.preventDefault();
        const {email} = this.context.user
        let newInterest = {interest, email}
        
        this.setState({
          userInterests: this.state.userInterests.concat(newInterest)
        })

        fetch(`${url}/interests/${email}`, {
            method: 'POST',
            headers: {
                'content-type' : 'application/json'
            },
        body: JSON.stringify({
            interest,
            email
        })
    })
        .then(res => {
            if(!res.ok) {
                throw new Error (`Something went wrong posting interest`)
            }
            return res.json()
        })
        .catch(error =>{
            this.setState({
                error
            })
        })
               
      }
    
      removeUserInterest = interest => {
        const {email} = this.context.user
        this.setState({
            userInterests: this.state.userInterests.filter( (item) => {
              return item !== interest
            })
        })

        fetch(`${url}/interests/${email}`, {
            method: 'DELETE',
            headers: {
                'content-type' : 'application/json'
            },
            body: JSON.stringify({
                interest
            })
        })
        .then(res => {
            if(!res.ok) {
                throw new Error (`Something went wrong deleting interest`)
            }
            return res.json()
        })
        .catch(error => {
            this.setState({
                error
            })
        })
      }
    

    render() {

        const {
            //allInterests, //needed for autocomplete later    
            user
        } = this.context

        const { userInterests } = this.state;
        const {giftee} = this.state
        console.log(this.state.userInterests)

        return (
            <section>
                <h1>Profile</h1>

                <form>
                    <label>Add Interests</label>
                    <input ref={HTMLInputElement => this.input = HTMLInputElement} />

                    <button onClick={(e) => { 
                        // this.handleAddInterest(e); 
                        this.addUserInterest(this.input.value, e) }}>Add</button>
                </form>

                <h3>Interests</h3>
                <ul>
                    {userInterests.map((interest, i) => (
                        <li key={`${interest}${i}`}>
                            {interest.interest}
                            <a href="/" onClick={(e) => {
                                e.preventDefault();
                                this.removeUserInterest(interest);
                            }}>(X)</a>
                        </li>
                    ))}
                </ul>

                <h3>Current Partner</h3>
                <a href='/'>{giftee}</a>

            </section>

        )
    }

}

export default Profile;