const express = require('express');
const app = express();
const path = require('path');
const mongoose = require('mongoose');
const bodyparser = require('body-parser');
const morgan = require('morgan');

app.use(bodyparser.json());

const db = require('./config/keys').mongoURI;

mongoose.connect(db)
    .then(() => {
        console.log("Database connected");
    })
    .catch((err) => {
        console.log(err);
    })

if (process.env.node_ENV === 'production') {
    app.use(express.static('client/build'));
    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
    });
}

const port = process.env.port || 5000;

app.listen(port, () => {
    console.log(`server started on port ${port}`)
});