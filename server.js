

// Import modules

import express from 'express';
import fs from 'file-system';
import mongo from 'mongodb';
import mongoose from 'mongoose';
import bodyparser from 'body-parser';
import webpack from 'webpack';
import webpackMiddleware from 'webpack-dev-middleware';
import webpackConfig from './webpack.config.js';

//Connect to MongoDB via Mongoose

mongoose.connect('mongodb://localhost/data', (err) =>{
    if (err) throw err;
    console.log('CONNECTED!');
});

//Set app to express

const app = express();

//Create schema for DB - User

const userSchema = mongoose.Schema({
    name: String,
    company: String,
    phone: String
});

//Instantiate User schema

const User = mongoose.model('User', userSchema);

//Middleware + folder for serving static files

app.use(express.static(__dirname + '/'));
app.use(bodyparser.urlencoded({extended: true}))
app.use(bodyparser.json())
app.use(webpackMiddleware(webpack(webpackConfig)));


//Set static file to be served

app.get('/', function(req, res) {
    res.sendFile(__dirname + '/index.html');
});

//Get users from DB

app.get('/find', (req,res) => {
    User.find({}, (err,result) => {
        if (result) res.json(result);
    });

});

//Save new user to DB

app.post('/user', (req,res ) => {
    let newUser = new User(req.body);
    newUser.save()
        .then( item => {            
            console.log( item + ' saved!');
        })
        .catch(err => {
            console.log('failed to save user..');
        });
});

//Delete user from DB

app.put('/delete', (req,res) => {
    User.remove({name: req.body.name}, (err,result) => {
        if (err) throw err;
        else if (result) console.log('user deleted');
    });
});

//Edit user from DB

app.put('/edit', (req,res) => {
    console.log(req.body);
    User.update({ _id: req.body._id },
        {name: req.body.name, company: req.body.company,
        phone: req.body.phone}, (err, result) => {
        if (err) throw err;
        else if (result) console.log('user updated!');
    });
});

//Start server at port 3000.

app.listen(3000, () => {
    console.log('listening on 3000');
})