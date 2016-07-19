var React = require('react')

var App = React.createClass({

  propTypes: {
    children: React.PropTypes.object
  },

  render: function () {
    return (
      <div className='app-container'>
        { this.props.children }
      </div>
    )
  }
})

module.exports = App
