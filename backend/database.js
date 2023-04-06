// const { MongoClient } = require('mongodb');

// const url = process.env.MONGODB_URI;
// const client = new MongoClient(url, { useUnifiedTopology: true });

// async function connectToDatabase() {
//     try {
//         await client.connect();
//         console.log('Connected to MongoDB');

//         const db = client.db(process.env.DB_NAME);
//         const users = db.collection('users');

//         // Define User model
//         class User {
//             constructor(username, password) {
//                 this.username = username;
//                 this.password = password;
//             }
//         }

//         // Define methods for User model
//         User.findByUsername = async function (username) {
//             const user = await users.findOne({ username: username });
//             return user ? new User(user.username, user.password) : null;
//         };

//         User.create = async function (username, password) {
//             const result = await users.insertOne({ username: username, password: password });
//             return result.insertedId;
//         };

//         return {
//             User: User,
//             closeConnection: async function () {
//                 await client.close();
//                 console.log('Disconnected from MongoDB');
//             },
//         };
//     } catch (error) {
//         console.error('Error connecting to MongoDB', error);
//     }
// }

// module.exports = { connectToDatabase };

const { MongoClient } = require('mongodb');
require('dotenv').config();


// const url = "mongodb://localhost:27017/";
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

module.exports = { connectToDatabase };

