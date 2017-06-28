const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const Debug = require('debug');
const express = require('express');
const session = require('express-session');
const dotenv = require('dotenv');
//require('dotenv').config({silent: true});
const MongoStore = require('connect-mongo')(session);
// comment out logger if unable to deploy on heroku?
//const logger = require('morgan');
// import favicon from 'serve-favicon';
const path = require('path');
const lessMiddleware = require('less-middleware');
const mongoose = require('mongoose');
const passport = require('passport');
const expressValidator = require('express-validator');
const index = require('./routes/index');
const app = express();
const debug = Debug('guestlistmgt:app');

/**
 * Load environment variables from .env file, where API keys and passwords are configured.
 */
dotenv.load({ path: '.env' });

/**
 * API keys and Passport configuration.
 */
const passportConfig = require('./config/passport');

/**
 * Connect to MongoDB.
 */
mongoose.Promise = global.Promise;
mongoose.connect(process.env.MONGODB_URI || process.env.MONGODLAB_URI, { useMongoClient: true } );
mongoose.connection.on('error', (err) => {
  console.error(err);
  console.log('%s MongoDB connection error. Please make sure MongoDB is running.', chalk.red('✗'));
  process.exit();
});

/**
 * Express configuration.
 */


//app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(expressValidator());
app.use(session({
  resave: false,
  saveUninitialized: true,
  secret: process.env.SESSION_SECRET,
  store: new MongoStore({
    url: process.env.MONGODB_URI || process.env.MONGODLAB_URI,
    autoReconnect: true,
    clear_interval: 3600
  })
  //cookie: {maxAge: 3600000}
}));

// view engine setup
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// uncomment after placing your favicon in /public
// app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
//app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));

app.use(cookieParser());
app.use(lessMiddleware(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
/* eslint no-unused-vars: 0 */
app.use((err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

/**
 * ROUTES
 */

const api = require('./routes/api')
const auth = require('./routes/auth')
const mainRoutes = require('./routes/mainroutes')
const secretRoutes = require('./routes/secretroutes')

app.use('/api', api)
app.use('/auth', auth)
app.use('/', mainRoutes)
app.use('/dashboard', secretRoutes)



// // Handle uncaughtException
// process.on('uncaughtException', (err) => {
//   debug('Caught exception: %j', err);
//   process.exit(1);
// });

/**
 * Start Express server.
 */
// app.listen(app.get('port'), () => {
//   console.log('%s App is running at http://localhost:%d in %s mode', chalk.green('✓'), app.get('port'), app.get('env')); 
//   console.log('  Press CTRL-C to stop\n');
// });
const port = 3000;
app.listen(port, function() {
  console.log("Guest list running on port " + port);
})


module.exports = app;
