var React = require('react')
var ReactDOM = require('react-dom')
var Router = require('react-router').Router
var routes = require('./routes')
var createHashHistory = require('history').createHashHistory

var mountNode = document.getElementById('container')
ReactDOM.render(React.createElement(Router,
  {routes: routes, history: createHashHistory()}), mountNode)
