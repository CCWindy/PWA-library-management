var createError = require('http-errors');
var express = require('express');
var webpush = require('web-push');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var booksRouter = require('./routes/books');
var pushRouter = require('./routes/push');
var subscribeRouter = require('./routes/subscribe');

const vapidKeys = {
  publicKey: 'BOEQSjdhorIf8M0XFNlwohK3sTzO9iJwvbYU-fuXRF0tvRpPPMGO6d_gJC_pUQwBT7wD8rKutpNTFHOHN3VqJ0A',
  privateKey: 'TVe_nJlciDOn130gFyFYP8UiGxxWd3QdH6C5axXpSgM',
};

// 设置web-push的VAPID值
webpush.setVapidDetails('mailto:alienzhou16@163.com', vapidKeys.publicKey, vapidKeys.privateKey);

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(function(req, res, next) {
  res.set({
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET,POST,PUT,DELETE,PATCH,OPTIONS',
    'Access-Control-Allow-Headers': 'content-type',
  });
  next();
});

app.use('/books', booksRouter);
app.use('/push', pushRouter);
app.use('/subscribe', subscribeRouter);

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
