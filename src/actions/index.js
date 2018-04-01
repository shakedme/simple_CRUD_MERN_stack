import axios from 'axios';

export const FETCH_USERS = 'FETCH_USERS';
export const DELETE_USER = 'DELETE_USER';
export const ADD_USER = 'ADD_USER';

const API = '/find';


export function fetchUsers(){

    const result = axios.get(API);
    return {
        type: FETCH_USERS,
        payload: result
    }
}

export function deleteUser(users, name){
    
    let deletedUser = {};
    
    //Filter users

    const newUsers = users.filter((user) => {
        if (user.name == name) deletedUser = user; 
        return user.name !== name;
    })

    //Update db about deleted user

    const request = axios.put('/delete', deletedUser)
        .then((data, status) => {
            console.log('sent');
        })
        .catch ((error, statuts) => {
            console.log('failed..');
        });

    return {
        type: DELETE_USER,
        payload: newUsers
    }
}

export function addUser(props, http){

    const API = http == 'post' ? '/user' : '/edit';

    const request = axios[http](API, props)
        .then((data,status) => {
            console.log('sent...');
        });

    return {
        type: ADD_USER,
        payload: request
    }
}