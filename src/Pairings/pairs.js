import React, { Component } from 'react';
import SecretSantaContext from '../SecretSantaContext';

class Pairs extends Component {

    static defaultProps = {
        users: []
    }

    static contextType = SecretSantaContext;

    render() {

        const shuffle = (poolOfNames) => {
            poolOfNames.sort(() => Math.random() - .5);
        };

        const getPairs = (poolOfNames, userList) => {

            
            for (let idx = 0; idx < userList.length; idx++) {
                for (let i = 0; i < poolOfNames.length; i++) {
                    if (poolOfNames[i] !== userList[idx].name) {
                        userList[idx].pairName = poolOfNames[i];
                    }
                }
            }

            userList.map(user => {

                poolOfNames.forEach(player => {
                    if(user.name !== player) {
                        user.pairName = player;
                    }
                })
            })

            return userList;
        }

        const { users } = this.context;
        const poolOfNames = users.map(user => user.name);
        const userList = users.map(obj => {
            let newObject = {};

            Object.keys(obj).forEach(properyKey => {
                newObject[properyKey] = obj[properyKey]
            });

            return newObject;
        })
        userList.map(obj => obj.pairName = "")
        shuffle(poolOfNames);
        console.log(userList)
        console.log(poolOfNames);

        const pairedList = getPairs(poolOfNames, userList);
        console.log(pairedList)
        // const pairedList = {
        //     id: users.id,
        //     name: users.name,
        //     pairName: poolOfNames,
        //     email: users.email
        // }

        return (
            <section>
                {users.map(usr => (
                    <li key={usr.id}>{usr.name} has: <span>{}</span></li>
                ))}
            </section>
        )
    }

}

export default Pairs;