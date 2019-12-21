import React, { Component } from 'react';
import SecretSantaContext from '../SecretSantaContext';
import config from '../config';

class Pairs extends Component {

    static defaultProps = {
        users: []
    }

    static contextType = SecretSantaContext;

    handleSubmit = (event) => {
        event.preventDefault();
        console.log('Submited')

        //fetch
        //post req
    }

    shuffle = (array) => {
        let poolOfNames = [];
        while (array.length !== 0) {
            let randomIndex;
            randomIndex = Math.floor(Math.random() * array.length);
            poolOfNames.push(array[randomIndex]);
            array.splice(randomIndex, 1);
        }
        return poolOfNames;
    }

    render() {

        const { users } = this.context;
        let userList = users.map(obj => {
            let newObject = {};

            Object.keys(obj).forEach(properyKey => {
                newObject[properyKey] = obj[properyKey]
            });

            return newObject;
        })
        userList.map(obj => obj.pairName = "")

        let poolOfNames = this.shuffle(userList);
        
        let left = poolOfNames.slice(0, poolOfNames.length / 2)
        let right = poolOfNames.slice(Math.ceil(poolOfNames.length / 2))

        left.forEach((leftItem, i) => {
            let rightItem = right[i]
            let leftUser = poolOfNames
                .find(user => leftItem.id === user.id)

            let rightUser = poolOfNames
                .find(user => rightItem.id === user.id)
            
            leftUser.pairName = rightUser.name;
            rightUser.pairName = leftUser.name;
        })

        return (
            <section>
                {poolOfNames.map((user) => (
                    <li key={user.id}>{user.name} has: <span>{user.pairName}</span></li>
                ))}


                <button type="submit" onClick={(e) => this.handleSubmit(e)}>Submit</button>
            </section>
        )
    }

}

export default Pairs;