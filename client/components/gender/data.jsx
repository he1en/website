var React = require('react')

var Button = require('react-bootstrap').Button
var ButtonGroup = require('react-bootstrap').ButtonGroup

var Chart = require('./chart.js')

var Data = React.createClass({

  propTypes: {
    lineGraphs: React.PropTypes.array
  },

  getDefaultProps: function () {
    return {
      lineGraphs: ['function']
    }
  },

  renderLineGraphs: function () {
    return this.props.lineGraphs.map(function (graphName) {
      return (
        <Chart name={graphName} />
      )
    })
  },

  renderSideBar: function () {
    var style = {
      position: 'absolute',
      right: '100px',
      top: '250px'
    }

    return (
      <div>
        <ButtonGroup vertical style={style}>
          <Button>Design</Button>
          <Button>Functionality</Button>
          <Button>Entertainment</Button>
          <Button>News</Button>
          <Button>Chat and Messaging</Button>
          <Button>Smart Phones</Button>
          <Button>TVs</Button>
          <Button>Stationary Computers</Button>
          <Button>Tablets</Button>
        </ButtonGroup>
      </div>
    )
  },

  render: function () {
    return (
      <div>
        <h4>Visualizing the research, disaggregated by trait.</h4>
        {this.renderLineGraphs()}
        {this.renderSideBar()}
      </div>
    )
  }

})

module.exports = Data
