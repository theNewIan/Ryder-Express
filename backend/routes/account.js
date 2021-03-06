const express = require('express');
const User = require('../models/account');


const router = express.Router();

router.get('/current', async (req, res, next) => {
    try {
        const user = req.user;
        const result = await User.findUserByUser(user.username);
        res.status(201).json(result);
    } catch (err) {
        console.error('Failed to load current user:', err);
        res.sendStatus(500).json({ message: err.toString() });
    }
});

router.post('/', async (req, res, next) => {
    try {
        const body = req.body;
        console.log(body);
        const result = await req.models.user.createNewUser(body.username, body.password);
        res.status(201).json(result);
    } catch (err) {
        console.error('Failed to create new user:', err);
        res.status(500).json({ message: err.toString() });
    }

    next();
})

module.exports = router;

