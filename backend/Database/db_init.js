const mongoose = require('mongoose');
require('dotenv').config();

const url = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@${process.env.DB_CLUSTER}.9zfweab.mongodb.net/?retryWrites=true&w=majority`;

const bootstrapDB = () => {
    mongoose
        .connect(url)
        .then(() => console.log('Connected to MongoDB'))
        .catch((err) => console.log(`Error connecting to MongoDB: ${err}`));
};

module.exports = bootstrapDB;
