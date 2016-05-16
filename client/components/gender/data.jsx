var React = require('react')

var Button = require('react-bootstrap').Button
var ButtonGroup = require('react-bootstrap').ButtonGroup

var Chart = require('./chart.js')

var Graphs = require('../../../public/resources/gender-data.js')

var Data = React.createClass({

  propTypes: {
    lineGraphs: React.PropTypes.array,
    barCharts: React.PropTypes.array
  },

  renderLineGraphs: function () {
    return Graphs.lineGraphs.map(function (graphData) {
      return (
        <a className='linklessAnchor' name={graphData.id}>
          <Chart name={graphData.name}
                id={graphData.id}
                description={graphData.description}
                femaleData={graphData.femaleData}
                maleData={graphData.maleData}
                helperText={graphData.helperText}
            />
        </a>
      )
    })
  },

  renderLineButtons: function () {
    return Graphs.lineGraphs.map(function (graphData) {
      return (<Button href={'#' + graphData.id}>{graphData.name}</Button>)
    })
  },

  renderBarButtons: function () {
    return Graphs.barCharts.map(function (graphData) {
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
