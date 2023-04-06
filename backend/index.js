const express = require("express")
const app = express()

const cors = require('cors')
app.use(cors())

const bodyParser = require('body-parser');
app.use(bodyParser.json());

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');



const { MongoClient } = require('mongodb');
require('dotenv').config();

const secret = process.env.TOKEN_SECRET;
const url = process.env.MONGODB_URI;
const client = new MongoClient(url, { useUnifiedTopology: true });

async function connectToDatabase() {
    try {
        await client.connect();
        console.log('Connected to MongoDB');

        const db = client.db("myminternship");
        const users = db.collection('user_details');

        // Define User model
        class UserDetails {
            constructor(username, password) {
                this.username = username;
                this.password = password;
            }
        }

        // Define methods for User model
        UserDetails.findByUsername = async function (username) {
            const user = await users.findOne({ username: username });
            return user ? new UserDetails(user.username, user.password) : null;
        };

        UserDetails.create = async function (username, password) {
            const result = await users.insertOne({ username: username, password: password });
            return result.insertedId;
        };

        return {
            UserDetails: UserDetails,
            closeConnection: async function () {
                await client.close();
                console.log('Disconnected from MongoDB');
            },
        };
    } catch (error) {
        console.error('Error connecting to MongoDB', error);
    }
}


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

app.get('/', async (req, res) => {
    res.send('Hello World!')
})

app.listen(3001, () => {
    console.log("server running on port 3001")
})