const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const bcryptjs = require('bcryptjs');

const userModel = require('../models/userModel')

router.get('/', function(req, res) {
    res.send("user is home").status(200);
});
router.post('/', function(req, res) {
    const newUser = new userModel({
        _id: new mongoose.Types.ObjectId(),
        name: req.body.name,
        email: req.body.email,
        password: bcryptjs.hashSync(req.body.password, 10)
    });

    userModel.find({ email: req.body.email })
        .exec()
        .then(user => {
            if (user.length > 0) {
                res.send("account already exists").status(400);
            } else {
                newUser.save();
                res.send("Account created").status(201);
            }
        })
});
module.exports = router;