import { combineReducers } from 'redux';
import UserReducer from './userReducer';
import {reducer as formReducer} from 'redux-form';

const rootReducer = combineReducers({
  users: UserReducer,
  form: formReducer
});

export default rootReducer;
