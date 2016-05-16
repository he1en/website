var d3 = require('d3')
var React = require('react')
var ReactFauxDOM = require('react-faux-dom')

var Grid = require('react-bootstrap').Grid
var Row = require('react-bootstrap').Row
var Col = require('react-bootstrap').Col
var Button = require('react-bootstrap').Button
var Glyphicon = require('react-bootstrap').Glyphicon
var OverlayTrigger = require('react-bootstrap').OverlayTrigger
var Popover = require('react-bootstrap').Popover

var Chart = React.createClass({

  propTypes: {
    femaleData: React.PropTypes.array.isRequired,
    maleData: React.PropTypes.array.isRequired,
    name: React.PropTypes.string.isRequired,
    id: React.PropTypes.string.isRequired,
    description: React.PropTypes.string.isRequired,
    height: React.PropTypes.number,
    width: React.PropTypes.number,
    margins: React.PropTypes.array,
    helperText: React.PropTypes.string.isRequired
  },

  getDefaultProps: function () {
    var margins = [10, 80, 80, 80]
    return {
      margins: margins,
      width: 800 - margins[1] - margins[3],
      height: 400 - margins[0] - margins[2]
    }
  },

  renderChart: function () {
    var width = this.props.width
    var height = this.props.height
    var margins = this.props.margins

    // X scale will fit all values from data[] within pixels 0-w
    var x = d3.scale.linear().domain([1, 10]).range([0, width])
    var y = d3.scale.linear().domain([0, 0.2]).range([height, 0])

    // create a area function to fill area under cdf data
    var areaFn = d3.svg.area()
      .x(function (d) {
        return x(d.val)
      })
      .y0(height)
      .y1(function (d) {
        return y(d.cdf)
      })

    // Add an SVG element with the desired dimensions and margin.
    var svg = d3.select(ReactFauxDOM.createElement('svg'))
      .attr('width', width + margins[1] + margins[3])
      .attr('height', height + margins[0] + margins[2])

    var graph = svg.append('svg:g')
      .attr('transform', 'translate(' + margins[3] + ',' + margins[0] + ')')

    // create yAxis
    var xAxis = d3.svg.axis().scale(x).tickSize(height * -1).tickSubdivide(true)
    // Add the x-axis.
    graph.append('svg:g')
          .attr('class', 'x axis')
          .attr('transform', 'translate(0,' + height + ')')
          .call(xAxis)

    // create left yAxis
    var yAxisLeft = d3.svg.axis().scale(y).ticks(4).orient('left')
    // Add the y-axis to the left
    graph.append('svg:g')
          .attr('class', 'y axis')
          .attr('transform', 'translate(-25,0)')
          .call(yAxisLeft)

    graph.append('svg:text')
        .attr('class', 'x label')
        .attr('text-anchor', 'end')
        .attr('x', (width + margins[1]) / 2.0)
        .attr('y', height + margins[0] + margins[2] - 50)
        .text('Agreement Level')

    // Add the line by appending an svg:path element with the data line we created above
    // do this AFTER the axes above so that the line is above the tick-lines
    graph.append('svg:path')
      .datum(this.props.maleData)
      .attr('class', 'area')
      .attr('d', areaFn)
      .attr('fill', 'royalblue')

    graph.append('svg:path')
      .datum(this.props.femaleData)
      .attr('class', 'area')
      .attr('d', areaFn)
      .attr('fill', 'maroon')

    var both_data = this.props.maleData.map(function (d) {
      for (var i = 0; i < this.props.femaleData.length; i++) {
        var f_d = this.props.femaleData[i]
        if (d.val === f_d.val) {
          var new_d = {}
          new_d.val = d.val
          new_d.cdf = d.cdf < f_d.cdf ? d.cdf : f_d.cdf
          return new_d
        }
      }
    }.bind(this))

    graph.append('svg:path')
        .datum(both_data)
        .attr('class', 'area')
        .attr('d', areaFn)
        .style('fill', 'midnightblue')

    return svg.node().toReact()
  },

  renderHelper: function () {
    var padding =
      (this.props.height - this.props.margins[0] - this.props.margins[2]) / 2
    var style = {
      paddingTop: padding
    }
    return (
      <div style={style}>
        <OverlayTrigger trigger='click' placement='right' overlay={
            <Popover title='About this graph' id={'popover-' + this.props.id }>
              { this.props.helperText }
            </Popover>
        }>
          <Button bsStyle='default'>
            <Glyphicon glyph='question-sign' />
          </Button>
        </OverlayTrigger>
      </div>
    )
  },

  render: function () {
    var style = {
      paddingTop: '30px'
    }
    return (
      <div style={style}>
        <h4>{ this.props.name }</h4>
        <p>{ this.props.description }</p>
        <Grid><Row>
          <Col xs={10} md={8}>
            { this.renderChart() }
          </Col>
          <Col xs={2} md={4}>
            { this.renderHelper() }
          </Col>
        </Row></Grid>
      </div>
    )
  }
})

module.exports = Chart
