var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var newUserRouter = require('./routes/newUsers')
var regionRouter = require('./routes/region')
var signupRouter = require('./routes/auth/signup')
var signinRouter = require('./routes/auth/signin')
var biodataRouter = require('./routes/profile/biodata');
const authenticateToken = require('./middleware');

var app = express();

// Middleware untuk logging
app.use((req, res, next) => {
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
    next();
});

// Middleware untuk parsing body JSON
app.use(express.json());


app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/newuser', newUserRouter)
app.use('/region', regionRouter)
app.use('/signup', signupRouter)
app.use('/signin', signinRouter)
app.use('/biodata', authenticateToken, biodataRouter)

module.exports = app;
