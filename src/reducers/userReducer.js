import {FETCH_USERS, DELETE_USER} from '../actions/index';

const initalState = { users: []};

export default function userReducer(state = initalState, action){

    switch(action.type){
        case FETCH_USERS:
            return { ...state, users: action.payload.data};
        case DELETE_USER:
            return { ...state, users: action.payload};
        default:
            return state;
    }
}