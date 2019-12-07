import React, { Component } from 'react';
import SecretSantaContext from '../SecretSantaContext';

class Pairs extends Component {

    static defaultProps = {
        users: []
    }

    static contextType = SecretSantaContext;
    
    handleSubmit = (event) => {
        event.preventDefault();
        console.log('Submited')
    }

    render() {

        const { users } = this.context;     
        const userList = users.map(obj => {
            let newObject = {};

            Object.keys(obj).forEach(properyKey => {
                newObject[properyKey] = obj[properyKey]
            });

            return newObject;
        })
        userList.map(obj => obj.pairName = "")
        
        let poolOfNames = [];

        while(userList.length !== 0) {
            let randomIndex;
            randomIndex = Math.floor(Math.random() * userList.length);
            poolOfNames.push(userList[randomIndex]);
            userList.splice(randomIndex, 1);
        }
         let left = poolOfNames.slice(0, poolOfNames.length/2);
         let right = poolOfNames.slice(Math.ceil(poolOfNames.length/2))

         left.forEach( (leftItem, leftIndex) => 
         poolOfNames
            .find(user => leftItem.id === user.id)
            .pairName = right[leftIndex].name
         )
         right.forEach( (rightItem, rightIndex) =>
         poolOfNames
            .find(user => rightItem.id === user.id)
            .pairName = left[rightIndex].name
         )

         console.log(left);
         console.log(right);
         console.log(poolOfNames);


        return (
            <section>
                {poolOfNames.map(usr => (
                    <li key={usr.id}>{usr.name} has: <span>{usr.pairName}</span></li>
                    ))}

                    
                    <button type="submit" onClick={(e) => this.handleSubmit(e)}>Submit</button>
            </section>
        )
    }

}

export default Pairs;