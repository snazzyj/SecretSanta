import React, { Component } from 'react';
import config from '../config';

class Verify extends Component {

    state = {
        error: '',
        confirmation: false
    }

    verificationStatus = (boolean) => {
       return (boolean) ? `You are now confirmed!` : `Enter Verification Code`
    }

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
            console.log(res)
            if (!res.ok) {
                throw new Error (`Code does not exist`)
            }
            return res.json()
        })
        .then(status => {
            console.log({status})
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
        })
    }

    render() {
        const {error, confirmation} = this.state
        return (
            <div className="verifySection">
                <form className="verifyForm">
                    <label></label>
                    <input ref={HTMLInputElement => this.input = HTMLInputElement} />

                    <button className="confirmBtn" onClick={(e) => {
                        this.handleVerification(this.input.value, e)
                    }}>Verify</button>
                </form>
                {this.verificationStatus(confirmation)}
                {error.toString()}
            </div>
        )
    }
}

export default Verify