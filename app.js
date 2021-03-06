var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var pg = require('pg');




var index = require('./routes/index');
var users = require('./routes/users');
var about = require('./routes/about');
var contact = require('./routes/contact');
var test = require('./routes/test');
var courses = require('./routes/courses');
var uploadlesson = require('./routes/uploadlesson');
var studentprofile = require('./routes/studentprofile');
var adminprofile = require('./routes/adminprofile');
var adminusers = require('./routes/adminusers');
var admincourse = require('./routes/admincourse');
var coursepreview=require('./routes/coursepreview');
var lesson=require('./routes/lesson');
var register = require('./routes/register');
var welcomepage = require('./routes/welcomepage');
var welcomeinstructor = require('./routes/welcomeinstructor');
var instructorprofile = require('./routes/instructorprofile');
var catalog = require('./routes/catalog');
var app = express();

var conString = "postgres://fori:123456789@192.168.10.71:5432/youneed";

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(session({
    secret: 'secretword',
    resave: false,
    saveUninitialized: true
}))

app.use('/', index);
app.use('/', users);
app.use('/', about);
app.use('/', contact);
app.use('/', test);
app.use('/', courses);
app.use('/', uploadlesson);
app.use('/', studentprofile);
app.use('/', adminprofile);
app.use('/', adminusers);
app.use('/', admincourse);
app.use('/', coursepreview);
app.use('/', register);
app.use('/', lesson);
app.use('/', welcomeinstructor);
app.use('/', welcomepage);
app.use('/', instructorprofile);
app.use('/', catalog);

passport.use(new LocalStrategy(
    function(username, password, done) {

        console.log(username);
        console.log(password);
        return done(null, false);

        client.query('select password from public.user where firstname = $1', [firstname], function (err, results, fields) {
            if (err){
                done(err)
            };
            if(results.length === 0){
                done(null, false);
            }

            return done(null, 'testadmin');
        });
    }
));

app.get('/', function (req, res) {

});

// catch 404 and forward to error handler

app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
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
