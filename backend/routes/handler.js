const e = require('express');
const express = require('express');
const router = express.Router();
const Schemas = require('../models/schemas');
module.exports = router;

router.post('/addUser', async (req, res) => {
    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
    const email = req.body.email;
    const password = req.body.password;
    console.log(firstName + " " + lastName + " " + email + " " + password);
    const newUser= new Schemas.Users({
        
    });

    try {
        await newUser.save( (err, newUserResults) => {
            if (err) res.end('Error Saving.');
            res.redirect('/users');
            res.end();
        });
    } catch(err) {
        console.log(err);
        res.redirect('/users');
        res.end();
    }
});