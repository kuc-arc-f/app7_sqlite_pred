var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
//
var indexRouter = require('./routes/index');
var task2Router = require('./routes/task2');
var mdatsRouter = require('./routes/mdats');
//
var apiRouter = require('./routes/api');
var apiMdatsRouter = require('./routes/api_mdats');
var apiPredRouter = require('./routes/api_pred');

var app = express();
const expressLayouts = require('express-ejs-layouts');
app.use(expressLayouts);

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(function(req,res,next){
  //req.db = db;
  next();
});

app.use('/', indexRouter);
app.use('/task2', task2Router );
app.use('/mdats', mdatsRouter  );
//
app.use('/api', apiRouter );
app.use('/api_mdats', apiMdatsRouter );
app.use('/api_pred', apiPredRouter );
//

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
