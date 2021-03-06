const express = require('express');
const path = require('path');
const router = require('./routes/index');
const mongoose = require('mongoose');

// Initialize app
const app = express();
const port = 3000;

// Connect to MongoDB
try{
    mongoose.connect('mongodb://localhost:27017/japra', {useNewUrlParser: true, useUnifiedTopology: true});
    console.log("connect success");
}catch{
    console.log("error connect to db")
}
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));

// Initialize routes
router.routes(app);

// Log for app init
app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
})