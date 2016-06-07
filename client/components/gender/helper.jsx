var React = require('react')

var Button = require('react-bootstrap').Button
var Glyphicon = require('react-bootstrap').Glyphicon
var OverlayTrigger = require('react-bootstrap').OverlayTrigger
var Popover = require('react-bootstrap').Popover

var Helper = React.createClass({

  propTypes: {
    title: React.PropTypes.string.isRequired,
    contents: React.PropTypes.array.isRequired
  },

  render: function () {
    return (
      <div>
        <OverlayTrigger trigger='click' placement='right' overlay={
            <Popover title='About this graph' id={'popover-' + this.props.title }>
              {
                this.props.contents.map(function (content) {
                  return (<p>{content}</p>)
                })
              }
            </Popover>
        }>
          <Button bsStyle='default'>
            <Glyphicon glyph='question-sign' />
          </Button>
        </OverlayTrigger>
      </div>
    )
  }

})

module.exports = Helper
