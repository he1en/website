var React = require('react')
var ReactRouter = require('react-router')
var IndexRoute = ReactRouter.IndexRoute
var Route = ReactRouter.Route
var Redirect = ReactRouter.Redirect

var App = require('./components/app.js')
var Home = require('./components/home.js')
var Gender = require('./components/gender/frame.js')

var routes = (
  <Route path='/' component={App}>
    <IndexRoute component={Home} />
    <Redirect from='/gender' to='gender/data' />
    <Route path='/gender/data' component={Gender} tab={0} />
    <Route path='/gender/cases' component={Gender} tab={1} />
    <Route path='/gender/video' component={Gender} tab={2} />
    <Route path='/gender/about' component={Gender} tab={3} />
    <Route path='/gender/viewcases' component={Gender} tab={4} />
  </Route>
)

module.exports = routes
