var React = require('react/addons');
var Home = require('./build/components/home');

var mountNode = document.getElementById('container');

React.render(React.createElement(Home), mountNode);
