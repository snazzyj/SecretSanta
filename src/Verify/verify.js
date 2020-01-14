import React, { Component } from 'react';
import config from '../config';

class Verify extends Component {

    state = {
        error: null
    }

    verificationStatus = (boolean) => {
       return (boolean) ? `Confirmed` : `Not confirmed`
    }

    handleVerification = (code, e) => {
        e.preventDefault();
        console.log(code)
        
        const pool_id = this.props.match.params.poolId;

        fetch(`${config.API_ENDPOINT}/verify/${pool_id}`, {
            method: 'PATCH',
            headers : {
                'content-type' : 'application/json'
            },
            body: JSON.stringify({
                code
            })
        })
        .then(res => {
            console.log(res)
            if (!res.ok) {
                throw new Error (`Something went wrong during the PUT request`)
            }
            return res.json()
        })
        .then(status => {
            console.log(status)
            this.verificationStatus(true);
        })
        .catch(error => {
            this.setState({
                error
            })
        })
    }

    render() {
        const {error} = this.state
        console.log(error)
        return (
            <div>
                <form>
                    <label></label>
                    <input ref={HTMLInputElement => this.input = HTMLInputElement} />

                    <button onClick={(e) => {
                        this.handleVerification(this.input.value, e)
                    }}>Verify</button>
                </form>
                {!!this.verificationStatus()}
            </div>
        )
    }
}

export default Verify