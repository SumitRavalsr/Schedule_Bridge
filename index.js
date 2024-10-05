const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const app = express();
const appRoute = require('./Routes/Router');
const cookieParser = require('cookie-parser');

const port = process.env.PORT || 3000;
const dotenv = require("dotenv")

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(__dirname));
app.use(express.static('public'));
// for css 
app.use(express.static(__dirname+'/Pages'));
app.use(session({
    secret: 'Userkey888',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }
}));
app.use(cookieParser());

app.use((req, res, next) => {
    res.set('Cache-Control', 'no-store, no-cache, must-revalidate, private');
    res.set('Pragma', 'no-cache');
    res.set('Expires', '0');
    next();
});
app.use('/', appRoute);

app.listen(port, () => {
    console.log('Server is running on http://localhost:3000');
});
