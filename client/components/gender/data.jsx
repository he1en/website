var React = require('react')

var Button = require('react-bootstrap').Button
var ButtonGroup = require('react-bootstrap').ButtonGroup

var Chart = require('./chart.js')

var Data = React.createClass({

  propTypes: {
    lineGraphs: React.PropTypes.array,
    barCharts: React.PropTypes.array
  },

  getDefaultProps: function () {
    return {
      lineGraphs: [
        {
          id: 'function',
          name: 'Functionality',
          description: 'Extent of agreement that function is more important than design.'
        },
        {
          id: 'design',
          name: 'Design',
          description: 'Extent of agreement that focus is on design when choosing new products.'
        }
      ],
      barCharts: [
        'Entertainment',
        'News',
        'Chat and Messaging',
        'Smart Phones',
        'TVs',
        'Stationary Computers',
        'Tablets'
      ]
    }
  },

  renderLineGraphs: function () {
    return this.props.lineGraphs.map(function (graphData) {
      return (
        <a className='linklessAnchor' name={graphData.id}>
          <Chart name={graphData.name}
                id={graphData.id}
                description={graphData.description} />
        </a>
      )
    })
  },

  renderLineButtons: function () {
    return this.props.lineGraphs.map(function (graphData) {
      return (<Button href={'#' + graphData.id}>{graphData.name}</Button>)
    })
  },

  renderBarButtons: function () {
    return this.props.barCharts.map(function (graphData) {
      return (<Button>{graphData}</Button>)
    })
  },

  renderSideBar: function () {
    var style = {
      position: 'fixed',
      right: '100px',
      top: '250px'
    }

    return (
      <div>
        <ButtonGroup vertical style={style}>
          { this.renderLineButtons() }
          { this.renderBarButtons() }
        </ButtonGroup>
      </div>
    )
  },

  render: function () {
    var style = {
      'padding-bottom': '40px'
    }
    return (
      <div>
        <h4 style={style}>Visualizing the research, disaggregated by trait.</h4>
        {this.renderLineGraphs()}
        {this.renderSideBar()}
      </div>
    )
  }

})

module.exports = Data
