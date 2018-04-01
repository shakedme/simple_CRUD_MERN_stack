import React from 'react';
import {Route, IndexRoute} from 'react-router';

import App from './components/app.js';
import Users from './components/users.js';
import AddUser from './components/addUser.js';

export default (
    <Route path="/" component={App}>
        <IndexRoute component={Users} />
        <Route path="/new" component={AddUser} />
        <Route path="/edit/:id/:name" component={AddUser} />
    </Route>

);