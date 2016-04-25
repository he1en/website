var React = require('react')
var ReactRouter = require('react-router')
var IndexRoute = ReactRouter.IndexRoute
var Route = ReactRouter.Route

var App = require('./build/components/app.js')
var Home = require('./build/components/home.js')
var Gender = require('./build/components/gender/frame.js')

var routes = (
  <Route path='/' component={App}>
    <IndexRoute component={Home} />
    <Route path='/gender' component={Gender} />
  </Route>
)

module.exports = routes
