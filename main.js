var React = require('react')
var ReactDOM = require('react-dom')
var Router = require('react-router').Router
var routes = require('./build/routes.js')
var createHistory = require('history').createHistory

var mountNode = document.getElementById('container')
var history = createHistory()
var reactApp = React.createElement(Router, {routes: routes, history: history})
ReactDOM.render(reactApp, mountNode)
