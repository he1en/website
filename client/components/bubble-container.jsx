var React = require('react')

var Bubble = require('./bubble.js')

var BubbleContainer = React.createClass({

  propTypes: {
    children: React.PropTypes.object,
    width: React.PropTypes.number,
    height: React.PropTypes.number,
    initialRadius: React.PropTypes.number
  },

  getDefaultProps: function () {
    return {
      width: 2048,
      height: 1024,
      initialRadius: 128
    }
  },

  renderBubbles: function () {
    var bubblesToRender = []
    var r = this.props.initialRadius
    var diameter = r * 2
    var numRows = this.props.height / diameter
    var numCols = this.props.width / diameter
    for (var row = 0; row < numRows; row++) {
      for (var col = 0; col < numCols; col++) {
        var cx = col * diameter + r
        var cy = row * diameter + r
        var key = cx.toString() + '-' + cy.toString()
        bubblesToRender.push(
          <Bubble key={key} keyName={key} r={r} cx={cx} cy={cy} />
        )
      }
    }
    return bubblesToRender
  },

  render: function () {
    return (
      <div>
        <svg className='bubble-svg'
             width={this.props.width} height={this.props.height}>
          { this.renderBubbles() }
        </svg>
        { this.props.children }
      </div>
    )
  }
})

module.exports = BubbleContainer
