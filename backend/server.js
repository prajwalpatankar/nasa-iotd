const express = require("express")
const app = express()
const { connectToDatabase } = require('./database');

const cors = require('cors')
app.use(cors())

const bodyParser = require('body-parser');
app.use(bodyParser.json());

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const secret = process.env.TOKEN_SECRET;

app.post("/signup", async (req, res) => {
    const { username, password } = req.body;
    const db = await connectToDatabase();
    const existingUser = await db.UserDetails.findByUsername(username);
    if (existingUser) {
        res.status(409).json({ message: 'Username already taken' });
    } else {
        const hashedPassword = await bcrypt.hash(password, 10);
        const result = await db.UserDetails.create(username, hashedPassword);
        res.status(201).json({ message: 'User created', id: result });
    }
    await db.closeConnection();
})

app.post('/login', async (req, res) => {
    const { username, password } = req.body;
    const db = await connectToDatabase();
    const user = await db.UserDetails.findByUsername(username);
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

app.listen(3001, () => {
    console.log("server running on port 3001")
})