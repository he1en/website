var d3 = require('d3')
var React = require('react')
var ReactFauxDOM = require('react-faux-dom')

var Row = require('react-bootstrap').Row
var Col = require('react-bootstrap').Col

var Helper = require('./helper.js')
var Dropdown = require('./dropdown.js')

var Graph = React.createClass({

  propTypes: {
    data: React.PropTypes.array.isRequired,
    name: React.PropTypes.string.isRequired,
    id: React.PropTypes.string.isRequired,
    height: React.PropTypes.number,
    width: React.PropTypes.number,
    margins: React.PropTypes.array,
    helperText: React.PropTypes.string.isRequired,
    selectText: React.PropTypes.string,
    femaleColor: React.PropTypes.string,
    maleColor: React.PropTypes.string,
    bothColor: React.PropTypes.string
  },

  getDefaultProps: function () {
    var margins = [10, 80, 80, 80]
    return {
      margins: margins,
      width: 800 - margins[1] - margins[3],
      height: 400 - margins[0] - margins[2],
      femaleColor: '#8C181B',
      maleColor: '#266294',
      bothColor: '#3D111E'
    }
  },

  getInitialState: function () {
    return {
      chosenGraph: 0
    }
  },

  dataAverage: function (data) {
    var sum = 0
    for (var i = 0; i < data.length; i++) {
      sum += data[i].val * data[i].pdf
    }
    return sum * 1.0 / data.length
  },

  renderGraph: function () {
    var data = this.props.data[this.state.chosenGraph]
    var femaleData = data.femaleData
    var maleData = data.maleData

    var width = this.props.width
    var height = this.props.height
    var margins = this.props.margins

    // X scale will fit all values from data[] within pixels 0-w
    var x = d3.scale.linear().domain([1, 10]).range([0, width])
    var y = d3.scale.linear().domain([0, 0.25]).range([height, 0])

    // create a area function to fill area under pdf data
    var areaFn = d3.svg.area()
      .x(function (d) {
        return x(d.val)
      })
      .y0(height)
      .y1(function (d) {
        return y(d.pdf)
      })

    // Add an SVG element with the desired dimensions and margin.
    var svg = d3.select(ReactFauxDOM.createElement('svg'))
      .attr('width', width + margins[1] + margins[3])
      .attr('height', height + margins[0] + margins[2])

    var graph = svg.append('svg:g')
      .attr('transform', 'translate(' + margins[3] + ',' + margins[0] + ')')

    // create x Axis
    var xAxis = d3.svg.axis().scale(x).tickSize(height * -1).tickSubdivide(true)
    graph.append('svg:g')
      .attr('class', 'x axis')
      .attr('transform', 'translate(0,' + height + ')')
      .call(xAxis)

    graph.append('svg:text')
      .attr('text-anchor', 'end')
      .attr('class', 'x label')
      .attr('x', margins[1])
      .attr('y', height + margins[0] + margins[2] - 50)
      .text('High Disagreement')
    graph.append('svg:text')
      .attr('text-anchor', 'end')
      .attr('class', 'x label')
      .attr('x', width)
      .attr('y', height + margins[0] + margins[2] - 50)
      .text('High Agreement')

    // create left yAxis
    var yAxisLeft = d3.svg.axis().scale(y).ticks(4).orient('left')

    graph.append('svg:g')
      .attr('class', 'y axis')
      .attr('transform', 'translate(-25,0)')
      .call(yAxisLeft)

    graph.append('svg:text')
      .attr('class', 'y label')
      .attr('transform', 'rotate(-90)')
      .attr('text-anchor', 'end')
      .attr('x', 0 - margins[1])
      .attr('y', 0 - margins[0])
      .text('Percentage of Respondents')

    // Add the line by appending an svg:path element with the data line we created above
    // do this AFTER the axes above so that the line is above the tick-lines
    graph.append('svg:path')
      .datum(maleData)
      .attr('class', 'area')
      .attr('d', areaFn)
      .attr('fill', this.props.maleColor)

    graph.append('svg:path')
      .datum(femaleData)
      .attr('class', 'area')
      .attr('d', areaFn)
      .attr('fill', this.props.femaleColor)

    var defs = graph.append('defs')

    defs.append('clipPath')
      .attr('id', this.props.id + '-clip-female')
      .append('path')
      .datum(femaleData)
      .attr('d', areaFn)

    defs.append('clipPath')
      .attr('id', this.props.id + '-clip-male')
      .append('path')
      .datum(maleData)
      .attr('clip-path', 'url(#' + this.props.id + '-clip-female)')
      .attr('d', areaFn)

    var both_data = []
    var num_points = femaleData.length
    for (var i = 0; i < num_points; i++) {
      var new_d = {}
      var f_d = femaleData[i]
      var m_d = maleData[i]
      new_d.val = f_d.val
      new_d.pdf = m_d.pdf > f_d.pdf ? m_d.pdf : f_d.pdf
      both_data.push(new_d)
    }

    graph.append('svg:path')
      .datum(both_data)
      .attr('class', 'area')
      .attr('d', areaFn)
      .attr('clip-path', 'url(#' + this.props.id + '-clip-male)')
      .style('fill', this.props.bothColor)

    // Add key labels
    var labelHeight = (height + margins[0] + margins[2]) / 4.0
    var leftLabelWidth = (width + margins[1] + margins[3]) / 6.0
    var rightLabelWidth = (width + margins[1] + margins[3]) * 3.0 / 4.0
    var femaleLabelWidth, maleLabelWidth
    if (this.dataAverage(femaleData) < this.dataAverage(maleData)) {
      femaleLabelWidth = leftLabelWidth
      maleLabelWidth = rightLabelWidth
    } else {
      femaleLabelWidth = rightLabelWidth
      maleLabelWidth = leftLabelWidth
    }
    graph.append('svg:text')
        .attr('class', 'key')
        .attr('text-anchor', 'end')
        .attr('x', femaleLabelWidth)
        .attr('y', labelHeight)
        .attr('fill', this.props.femaleColor)
        .attr('font-weight', 'bold')
        .text('Women')

    graph.append('svg:text')
        .attr('class', 'key')
        .attr('text-anchor', 'end')
        .attr('x', maleLabelWidth)
        .attr('y', labelHeight)
        .attr('fill', this.props.maleColor)
        .attr('font-weight', 'bold')
        .text('Men')

    return svg.node().toReact()
  },

  onSelect: function (eventKey) {
    this.setState({chosenGraph: eventKey})
  },

  render: function () {
    var style = {
      paddingBottom: '30px'
    }
    var dropdownStyle = {
      paddingBottom: '20px',
      left: this.props.width - this.props.margins[3] + 'px'
    }
    var dropdownTitle = this.props.data[this.state.chosenGraph].title
    return (
      <div>
        <Row style={style}>
          <Col xs={ 4 } md={ 4 } >
            <h4>{ this.props.name }</h4>
          </Col>
          <Col xs={ 2 } md={ 2 } >
            <Helper title={'About this Graph'} contents={this.props.helperText} />
          </Col>
        </Row>
        <Dropdown
          style={dropdownStyle}
          title={dropdownTitle}
          names={this.props.data.map(function (data) { return data.title })}
          onSelectFn={this.onSelect}
        />
        { this.renderGraph() }
      </div>
    )
  }
})

module.exports = Graph
