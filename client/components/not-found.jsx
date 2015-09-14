var React = require('react/addons');

var NotFound = React.createClass({

      render: function () {
        return (
          <div>
		<h1>Route not found, sorry!</h1>
          </div>
        )
      }
});

module.exports = NotFound
