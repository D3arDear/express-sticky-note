var createError = require('http-errors')
var express = require('express')
var path = require('path')
var cookieParser = require('cookie-parser')
var logger = require('morgan')
var cookieParser = require('cookie0parser')
var bodyParser = require('body-parser')
var passport = require('express-session')
var session = require('express-session')

var indexRouter = require('./routes/index')
var usersRouter = require('./routes/users')
var api = require('./routes/api')
var auth = require('./routes/auth')

var app = express()

// view engine setup
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')

app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'public')))

app.use(session({ secret: 'phenomenonProphet' }))
app.use(passport.initialize())
app.use(passport.session())

app.use('/stylesheets/style.html', function(req, res) {
    console.log('get style.css!!!!')
    res.send('get style.css!!!!!!')
})
app.use('/student', function(res, res, next) {
    res.send('hello Oracle')
})
app.use('/', indexRouter)
app.use('/users', usersRouter)
app.use('/auth', auth)
app.use('/api', api) //ajax 接口

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    next(createError(404))
})

// error handler
app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message
    res.locals.error = req.app.get('env') === 'development' ? err : {}

    // render the error page
    res.status(err.status || 500)
    res.render('error')
})

module.exports = app
