const express = require('express');
const app = express();
const PORT = process.env.PORT || 4000;
const mongodb = require('mongodb').MongoClient;
const connectionString = 'Mongodb://hostname/27017';











app.listen(PORT, () => {
    console.log(`The server is up and running on port ${PORT}`);
})