var React = require('react')

var DropdownButton = require('react-bootstrap').DropdownButton
var MenuItem = require('react-bootstrap').MenuItem

var Dropdown = React.createClass({

  propTypes: {
    title: React.PropTypes.string.isRequired,
    onSelectFn: React.PropTypes.func,
    names: React.PropTypes.array.isRequired,
    style: React.PropTypes.object
  },

  render: function () {
    var title = this.props.title
    if (this.props.names.length === 1) return null
    return (
      <div style={this.props.style}>
        <DropdownButton title={title} id={title}>
          { this.props.names.map(function (name, i) {
              return (
                <MenuItem
                  eventKey={i}
                  onSelect={this.props.onSelectFn}
                  style={this.props.style}
                >
                 { name }
                </MenuItem>)
            }.bind(this))
          }
        </DropdownButton>
      </div>
    )
  }

})

module.exports = Dropdown
