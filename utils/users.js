

require('dotenv').config();

const users = [
    {
        email: process.env.DB_EMAIL,
        password: process.env.DB_PASSWORD
    }
];

module.exports = users;