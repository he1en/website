var React = require('react')

var Bubble = React.createClass({

  propTypes: {
    splitNum: React.PropTypes.number,
    r: React.PropTypes.number.isRequired,
    rLimit: React.PropTypes.number,
    cx: React.PropTypes.number.isRequired,
    cy: React.PropTypes.number.isRequired,
    keyName: React.PropTypes.string.isRequired
  },

  getDefaultProps: function () {
    return {
      splitNum: 0,
      rLimit: 2
    }
  },

  getInitialState: function () {
    return {splitNum: this.props.splitNum}
  },

  componentDidMount: function () {
    if (this.state.splitNum > 0) return

    var canSplit = (this.props.r > this.props.rLimit)
    if (canSplit) {
      this.refs[this.props.keyName].onmouseover = this.split
    }
  },

  split: function () {
    this.setState(function (previousState, currentProps) {
      return {splitNum: previousState.splitNum + 1}
    })
  },

  renderSplitBubbles: function () {
    var r = this.props.r / 2
    var splitBubbles = []
    var cxs = [this.props.cx - r, this.props.cx + r]
    var cys = [this.props.cy - r, this.props.cy + r]
    for (var ix = 0; ix < 2; ix++) {
      for (var iy = 0; iy < 2; iy++) {
        var cx = cxs[ix]
        var cy = cys[iy]
        var key = cx.toString() + '-' + cy.toString()
        splitBubbles.push(
          <Bubble key={key} keyName={key} r={r} cx={cx} cy={cy}
                  splitNum={this.state.splitNum - 1} />
        )
      }
    }
    return splitBubbles
  },

  chooseRandomColor: function () {
    var colors = ['#6E8894', '#8B2635', '#85BAA1', '#B8C4BB', '#0A2463',
                  '#3D2B3D']
    /* using a random index prevents isomorphism? */
    var ind =
      (this.props.cx % 3 * this.props.cy % 7 * this.props.r % 5) % colors.length
    return colors[ind]
  },

  render: function () {
    if (this.state.splitNum === 0) {
      var color = this.chooseRandomColor()
      return (
        <circle ref={this.props.keyName} fill={color}
                r={this.props.r} cx={this.props.cx} cy={this.props.cy}/>
      )
    } else {
      return (
        <g>{ this.renderSplitBubbles() }</g>
      )
    }
  }
})

module.exports = Bubble
