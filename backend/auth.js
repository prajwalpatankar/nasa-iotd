const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { connectToDatabase } = require('./database');

const router = express.Router();

const secret = process.env.JWT_SECRET;

router.post('/signup', async (req, res) => {
    const { username, password } = req.body;
    const db = await connectToDatabase();
    const existingUser = await db.User.findByUsername(username);
    if (existingUser) {
        res.status(409).json({ message: 'Username already taken' });
    } else {
        const hashedPassword = await bcrypt.hash(password, 10);
        const result = await db.User.create(username, hashedPassword);
        res.status(201).json({ message: 'User created', id: result });
    }
    await db.closeConnection();
});

router.post('/login', async (req, res) => {
    const { username, password } = req.body;
    const db = await connectToDatabase();
    const user = await db.User.findByUsername(username);
    if (!user) {
        res.status(401).json({ message: 'Authentication failed' });
    } else {
        const match = await bcrypt.compare(password, user.password);
        if (!match) {
            res.status(401).json({ message: 'Authentication failed' });
        } else {
            const token = jwt.sign({ username: user.username }, secret
                , { expiresIn: '1h' });
            res.status(200).json({ message: 'Authentication successful', token });
        }
    }
    await db.closeConnection();
});

module.exports = router;