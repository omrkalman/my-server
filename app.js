const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors');
const fs = require('node:fs');
const app = express();

//the router we have created:
const apiRouter = require('./routes/api');

// Creating uploads folder if it doesn't exist
if (!fs.existsSync(path.join(__dirname, "uploads"))) {
    fs.mkdirSync(path.join(__dirname, "uploads"), { recursive: true });
}

app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
// Opening up access to the 'public' dir
// throught the index route (no route at all)
app.use(express.static(path.join(__dirname, 'public')));
// Opening up access to the 'uploads' dir
// through the /uploads route
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

//connecting the routers we have created:
app.use('/api', apiRouter); 


module.exports = app;