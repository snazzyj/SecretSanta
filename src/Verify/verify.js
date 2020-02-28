import React, { Component } from 'react';
import config from '../config';
import './verify.css'

class Verify extends Component {

    state = {
        error: '',
        confirmation: false
    }

    verificationStatus = (boolean) => {
       return (boolean) ? `You are now confirmed!` : `Enter Verification Code`;
    }

    //sends patch req to api
    //if the code matches, confirmation will be set to true
    //verification status will change to confirmed on both the user end
    //and within the pool status
    handleVerification = (code, e) => {
        e.preventDefault();
        
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
            if (!res.ok) {
                throw new Error (`Code does not exist`)
            }
            return res.json()
        })
        .then(status => {
            if(status.confirmation) {
                this.setState({
                    confirmation: true
                });
            }
        })
        .catch(error => {
            this.setState({
                error
            })
        });
    }

    render() {
        const {error, confirmation} = this.state;
        return (
            <div className="verifySection">
                <p>{this.verificationStatus(confirmation)}</p>
                <form className="verifyForm">
                    <label></label>
                    <input ref={HTMLInputElement => this.input = HTMLInputElement} />

                    <button className="confirmBtn" onClick={(e) => {
                        this.handleVerification(this.input.value, e)
                    }}>Verify</button>
                </form>
                {error.toString()}
            </div>
        )
    }
}

export default Verify