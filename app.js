var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var expressHbs = require('express-handlebars');
var mongoose= require('mongoose');
var session= require('express-session');
var passport= require('passport');
var flash = require('connect-flash');
var validator= require('express-validator');
var app = express();

var indexRouter = require('./routes/index');
var userRouter = require('./routes/user');

const connectionString = 'mongodb+srv://myuser:abcd1234@custore-authl.mongodb.net/test?retryWrites=true&w=majority';
mongoose.connect(connectionString, { useNewUrlParser: true, useUnifiedTopology: true})

//mongoose.connect('localhost:27017/custore', { useNewUrlParser: true }, {useUnifiedTopology: true});
require('./config/passport');

// view engine setup
app.engine('.hbs', expressHbs({defaultLayout: 'layout', extname: '.hbs'}));
app.set('view engine', '.hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(cookieParser());
app.use(session({secret: 'mysecrets', resave: false, saveUninitialized: false}));
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());
app.use(express.static(path.join(__dirname, 'public')));
app.use(validator());

app.use(function(req, res, next) {
  res.locals.login = req.isAuthenticated();
  next();
});

app.use('/user', userRouter);
app.use('/', indexRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
