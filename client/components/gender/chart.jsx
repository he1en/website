var d3 = require('d3')
var React = require('react')
var ReactFauxDOM = require('react-faux-dom')

var Chart = React.createClass({

  propTypes: {
    name: React.PropTypes.string.isRequired
  },

  getInitialState: function () {
    return {
      maleData:
        require('../../../public/resources/' + this.props.name + '_male.js'),
      femaleData:
        require('../../../public/resources/' + this.props.name + '_female.js')
    }
  },

  renderChart: function () {
    // define dimensions of graph
    var m = [80, 80, 80, 80] // margins
    var w = 800 - m[1] - m[3] // width
    var h = 400 - m[0] - m[2] // height

  // X scale will fit all values from data[] within pixels 0-w
    var x = d3.scale.linear().domain([1, 10]).range([0, w])
    var y = d3.scale.linear().domain([0, 0.2]).range([h, 0])

    // create a line function that can convert data[] into x and y points
    var lineFn = d3.svg.line()
      // assign the X function to plot our line as we wish
      .x(function (d) {
        return x(d.val)
      })
      .y(function (d) {
        return y(d.cdf)
      })

    // Add an SVG element with the desired dimensions and margin.
    var svg = d3.select(ReactFauxDOM.createElement('svg'))
      .attr('width', w + m[1] + m[3])
      .attr('height', h + m[0] + m[2])

    var graph = svg.append('svg:g')
      .attr('transform', 'translate(' + m[3] + ',' + m[0] + ')')

    // create yAxis
    var xAxis = d3.svg.axis().scale(x).tickSize(-h).tickSubdivide(true)
    // Add the x-axis.
    graph.append('svg:g')
          .attr('class', 'x axis')
          .attr('transform', 'translate(0,' + h + ')')
          .call(xAxis)

    // create left yAxis
    var yAxisLeft = d3.svg.axis().scale(y).ticks(4).orient('left')
    // Add the y-axis to the left
    graph.append('svg:g')
          .attr('class', 'y axis')
          .attr('transform', 'translate(-25,0)')
          .call(yAxisLeft)

      // Add the line by appending an svg:path element with the data line we created above
    // do this AFTER the axes above so that the line is above the tick-lines
    graph.append('svg:path')
      .attr('d', lineFn(this.state.maleData))
      .attr('stroke', 'steelblue')
      .attr('stroke-width', 2)
      .attr('fill', 'none')
    graph.append('svg:path')
        .attr('d', lineFn(this.state.femaleData))
        .attr('stroke', 'crimson')
        .attr('stroke-width', 2)
        .attr('fill', 'none')

    return svg.node().toReact()
  },

  render: function () {
    var title = this.props.name.charAt(0).toUpperCase() +
                this.props.name.slice(1)
    return (
      <div>
        <h4> { title + ' data'}</h4>
        { this.renderChart() }
      </div>
    )
  }
})

module.exports = Chart
