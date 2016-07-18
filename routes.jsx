var React = require('react')
var ReactRouter = require('react-router')
var IndexRoute = ReactRouter.IndexRoute
var Route = ReactRouter.Route

var App = require('./components/app.js')
var Home = require('./components/home.js')
var NotFound = require('./components/not-found.js')

var routes = (
  <Route path='/' component={App}>
    <IndexRoute component={Home} section={0} />
    <Route path='/links' component={Home} section={1} />
    <Route path='*' component={NotFound} />
  </Route>
)

module.exports = routes
