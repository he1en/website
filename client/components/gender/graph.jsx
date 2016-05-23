var d3 = require('d3')
var React = require('react')
var ReactFauxDOM = require('react-faux-dom')

var Row = require('react-bootstrap').Row
var Col = require('react-bootstrap').Col
var DropdownButton = require('react-bootstrap').DropdownButton
var MenuItem = require('react-bootstrap').MenuItem

var Helper = require('./helper.js')

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
      .datum(maleData)
      .attr('class', 'area')
      .attr('d', areaFn)
      .attr('fill', this.props.maleColor)

    graph.append('svg:path')
      .datum(femaleData)
      .attr('class', 'area')
      .attr('d', areaFn)
      .attr('fill', this.props.femaleColor)

    var both_data = maleData.map(function (d) {
      for (var i = 0; i < femaleData.length; i++) {
        var f_d = femaleData[i]
        if (d.val === f_d.val) {
          var new_d = {}
          new_d.val = d.val
          new_d.cdf = d.cdf < f_d.cdf ? d.cdf : f_d.cdf
          return new_d
        }
      }
    })

    graph.append('svg:path')
        .datum(both_data)
        .attr('class', 'area')
        .attr('d', areaFn)
        .style('fill', this.props.bothColor)

    // Add key labels
    graph.append('svg:text')
        .attr('class', 'key')
        .attr('text-anchor', 'end')
        .attr('x', (width + margins[1]) / 5.0)
        .attr('y', (height + margins[0] + margins[2]) / 4.0)
        .attr('fill', this.props.femaleColor)
        .attr('font-weight', 'bold')
        .text('Women')

    graph.append('svg:text')
        .attr('class', 'key')
        .attr('text-anchor', 'end')
        .attr('x', (width + margins[1]) * 4.0 / 5.0)
        .attr('y', (height + margins[0] + margins[2]) / 4.0)
        .attr('fill', this.props.maleColor)
        .attr('font-weight', 'bold')
        .text('Men')

    return svg.node().toReact()
  },

  onSelectAlert: function (eventKey) {
    this.setState({chosenGraph: eventKey})
  },

  renderDropdown: function () {
    if (this.props.data.length === 1) return null
    var title = this.props.data[this.state.chosenGraph].title
    return (
      <div>
        <DropdownButton title={title} id={title}>
          { this.props.data.map(function (data, i) {
              return (
                <MenuItem eventKey={i} onSelect={this.onSelectAlert}>
                 { data.title }
                </MenuItem>)
            }.bind(this))
          }
        </DropdownButton>
      </div>
    )
  },

  render: function () {
    var style = {
      paddingBottom: '30px'
    }
    return (
      <div>
        <Row style={style}>
          <Col xs={ 3 } md={ 3 } >
            <h4>{ this.props.name }</h4>
          </Col>
          <Col xs={ 2 } md={ 2 } >
            <Helper title={'About this Graph'} contents={this.props.helperText} />
          </Col>
        </Row>
        { this.renderDropdown() }
        { this.renderGraph() }
      </div>
    )
  }
})

module.exports = Graph
