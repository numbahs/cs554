/**
 * @file app.js
 * @author: Albert Tang
 * I pledge my honor that I abided by the Stevens Honor System.
 */

const express = require('express');
const constructorMethod = require('./routes');
const bodyparser = require('body-parser');
const app = express();
const port = process.env.PORT || 3000;

app.use(bodyparser.json());
constructorMethod(app);

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
