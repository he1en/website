var express = require('express')
var path = require('path')
var favicon = require('serve-favicon')
var logger = require('morgan')
var cookieParser = require('cookie-parser')
var bodyParser = require('body-parser')
var env = require('node-env-file')
env(__dirname + '/.env')
require('node-jsx').install()
var React = require('react')
var Router = require('react-router')
var RouterContext = Router.RoutingContext
var ReactDOMServer = require('react-dom/server')
var routes = require('./routes')

var app = express()

// view engine setup
app.set('views', path.join(__dirname, '/client/views'))
app.set('view engine', 'ejs')

app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')))
app.use(logger('dev'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'public')))

// to import from node modules
app.use('/bootstrap',
	express.static(path.join(__dirname, 'node_modules/bootstrap/dist/')))

// host resume
app.use('/resume', function (req, res) {
  res.redirect('/resume.pdf')
})

// Main site content here.
function router (req, res) {
  Router.match({
    routes: routes,
    location: req.url
  }, function (err, redirectLocation, renderProps) {
    if (redirectLocation) {
      res.redirect(301, redirectLocation.pathname + redirectLocation.search)
    } else if (err) {
      res.send(500, err.message)
    } else if (renderProps === null) {
      res.status(404)
        .send('Not found')
    } else {
      res.render('index.ejs', {content: ReactDOMServer.renderToString(
        React.createElement(RouterContext,
                            {router: renderProps.router,
                             routes: renderProps.routes,
                             params: renderProps.params,
                             location: renderProps.location,
                             components: renderProps.components,
                             history: renderProps.history,
                             matchContext: renderProps.matchContext
                            })
       ) })
    }
  })
}
app.use(router)

// set 404
app.get('*', function (req, res) {
  var NotFound = React.createFactory(require('./client/components/not-found.jsx'))
  res.render('index.ejs', {content: React.renderToString(NotFound({}))})
})

module.exports = app
