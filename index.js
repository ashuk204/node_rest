const express = require('express');
const morgan = require('morgan');
const parser = require('body-parser');
const mongoose = require('mongoose');
const ejs = require('ejs');

const app = express();

app.set('view engine', 'ejs');
app.set('views', './views');

const port = 3001;
const users = require('./routes/users');
const product = require('./routes/product');
mongoose.connect("mongodb+srv://ashutoshk204:asdfghjkl@cluster0-agfym.mongodb.net/test?retryWrites=true&w=majority", function(err) {
    if (err) {
        console.log(err);
    } else {
        console.log("atlas connected");
    }
});

app.use(morgan('dev'));
app.use(parser.json());
app.use(parser.urlencoded({ extended: true }));
app.use('/users', users);
app.use('/product', product);
// app.use('*', function(req, res, next) {
//     res.set('Access-Control-Allow-Origin', '*');
//     next();
// })

app.listen(port, function() {
    console.log(`server listening on ${port}`);
});