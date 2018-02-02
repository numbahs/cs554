
/**
 * @file app.js
 * @author: Albert Tang
 * I pledge my honor that I abided by the Stevens Honor System.
 */

const express = require('express');
const constructorMethod = require('./route');
const path = require('path');
const app = express();
const port = process.env.PORT || 3000;

// Viewing engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(express.static(__dirname + '/public'));
constructorMethod(app);

app.listen(port, () => {
    console.log('We\'ve now got a server!');
    console.log('Your routes will be running on http://localhost:3000');
});