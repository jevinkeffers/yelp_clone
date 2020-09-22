'use strict';

const http = require('http');
const path = require('path');

const hostname = '127.0.0.1';
const port = 3334;

const express = require('express'); 
const es6Renderer = require('express-es6-template-engine');
const morgan = require('morgan');
const logger = morgan('tiny');
const helmet = require('helmet');
const session = require("express-session");
// const FileStore = require('session-file-store')(session);
const cookieParser = require('cookie-parser');

const app = express(); 

app.engine('html', es6Renderer);
app.set('views', './views');
app.set('view engine', 'html');

app.use(logger);
app.use(helmet());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(
    session({
        // store: new FileStore(),
        secret: "whatever",
        resave: false,
        saveUninitialized: true,
        is_logged_in: false
    })
);

const server = http.createServer(app); 

server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}`);
});

const rootController  = require ('./routes/index');
const businessController = require ('./routes/businessRoute');
const usersController = require ('./routes/users');

app.use('/', rootController);
app.use('/business', businessController);
app.use('/users', usersController);