const express = require('express');
const router = express.Router();
const { User } = require("../models/User");
const bcrypt = require("bcryptjs");
const { default: axios } = require('axios');

//=================================
//             User
//=================================

router.post('/signup', (req, res) => {
    const { name, username, email, password } = req.body;
    if (!email || !password || !name || !username) {
        return res.status(422).json({ error: "Please add all the fields" });
    }
    User.findOne({ email: email })
        .then((savedUser) => {
            if (savedUser) {
                return res.status(422).json({ error: "User already exists with that email" });
            }
            bcrypt.hash(password, 12)
                .then((hashedpassword) => {
                        const user = new User({
                            name,
                            username,
                            email,
                            password: hashedpassword,
                        });
                            user.save()
                            .then(user => {
                                res.json({ name: user.name, username: user.username, email: user.email, userId: user._id, libraryId: user.libraryId, ApiKey: user.ApiKey });
                            })
                            .catch(err => {
                                console.log(err);
                            }); 
                       });
        })
        .catch(err => {
            console.log(err);
        });
});

router.post('/signin', (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(422).json({ error: "Please add email or password" });
    }
    User.findOne({ email: email
    })
        .then(savedUser => {
            if (!savedUser) {
                return res.status(422).json({ error: "Invalid email or password" });
            }
            bcrypt.compare(password, savedUser.password)
                .then(doMatch => {
                    if (doMatch) {
                        res.json({ name: savedUser.name, username: savedUser.username, email: savedUser.email, userId: savedUser._id });
                    }
                    else {
                        return res.status(422).json({ error: "Invalid email or password" });
                    }
                })
                .catch(err => {
                    console.log(err);
                });
        });
});




router.post('/getuser', (req, res) => {
    const { userId } = req.body;
    console.log(userId)
    if (!userId) {
        return res.status(422).json({ error: "Please add userId" });
    }
    User.findById({ _id: userId })
        .then(savedUser => {
            if (!savedUser) {
                return res.status(422).json({ error: "Invalid userId" });
            }
            res.json({ name: savedUser.name, username: savedUser.username, userId: savedUser._id , url: savedUser.url});
        });
});
router.post('/getUserById', (req, res) => {
    const { userId } = req.body;
    console.log(userId)
    if (!userId) {
        return res.status(422).json({ error: "Please add userId" });
    }
    User.findById({ _id: userId })
        .then(savedUser => {
            if (!savedUser) {
                return res.status(422).json({ error: "Invalid userId" });
            }
            res.json({ name: savedUser.name, username: savedUser.username, userId: savedUser._id, url: savedUser.url });
        });
});



router.post('/logout', (req, res) => {
    console.log("logout");
    res.json({ message: "You are logged out" });
});

router.post('/update', (req, res) => {
    const { userId, url } = req.body;
    console.log(userId, url);
    if (!userId) {
        return res.status(422).json({ error: "Please add userId" });
    }
    User.findByIdAndUpdate({ _id: userId })
        .then(savedUser => {
            if (!savedUser) {
                return res.status(422).json({ error: "Invalid userId" });
            }
            savedUser.url = url;
            savedUser.save()
                .then(user => {
                    res.json({ name: user.name, username: user.username, email: user.email, userId: user._id, url: user.url, libraryId: user.libraryId, ApiKey: user.ApiKey });
                })
                .catch(err => {
                    console.log(err);
                });
        });
});

    
module.exports = router;
