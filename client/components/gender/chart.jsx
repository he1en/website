var React = require('react')

var Dropdown = require('./dropdown.js')

var Chart = React.createClass({

  propTypes: {
    data: React.PropTypes.array.isRequired,
    name: React.PropTypes.string.isRequired,
    id: React.PropTypes.string.isRequired,
    height: React.PropTypes.number,
    width: React.PropTypes.number,
    margins: React.PropTypes.array,
    femaleColor: React.PropTypes.string,
    maleColor: React.PropTypes.string
  },

  getDefaultProps: function () {
    var margins = [0, 0, 20, 0]
    return {
      margins: margins,
      width: 800,
      height: 80,
      femaleColor: '#8C181B',
      maleColor: '#266294'
    }
  },

  getInitialState: function () {
    return {
      chosenChart: 0
    }
  },

  onSelect: function (eventKey) {
    this.setState({chosenChart: eventKey})
  },

  renderChart: function () {
    var data = this.props.data[this.state.chosenChart]
    var femaleData = data.femaleData
    var maleData = data.maleData

    var margins = this.props.margins
    var height = this.props.height
    var width = this.props.width

    var chartStyle = {
      paddingTop: margins[0] + 'px',
      paddingBottom: margins[2] + 'px',
      paddingLeft: margins[1] + 'px',
      paddingRight: margins[3] + 'px',
      width: width + 'px',
      height: height + 'px'
    }
    var barStyle = {
      height: (height - margins[0] - margins[2]) / 2 + 'px',
      borderRadius: '0px 5px 5px 0px',
      fontWeight: '700',
      color: 'black'
    }
    var femaleBarStyle = {
      backgroundColor: this.props.femaleColor,
      width: femaleData + '%',
      height: barStyle.height,
      lineHeight: barStyle.height,
      borderRadius: barStyle.borderRadius,
      fontWeight: barStyle.fontWeight,
      color: barStyle.color
    }
    var maleBarStyle = {
      backgroundColor: this.props.maleColor,
      width: maleData + '%',
      height: barStyle.height,
      lineHeight: barStyle.height,
      borderRadius: barStyle.borderRadius,
      fontWeight: barStyle.fontWeight,
      color: barStyle.color
    }

    return (
      <div style={chartStyle}>
        <div style={femaleBarStyle}>
          { 'Women: ' + femaleData + '%'}
        </div>
        <div style={maleBarStyle}>
          { 'Men: ' + maleData + '%'}
        </div>
      </div>
    )
  },

  render: function () {
    var dropdownStyle = {
      paddingBottom: '20px',
      left: this.props.width - this.props.margins[3] + 'px'
    }
    var dropdownTitle = this.props.data[this.state.chosenChart].title
    return (
      <div>
        <h4>{ this.props.name }</h4>
        <Dropdown
          style={dropdownStyle}
          title={dropdownTitle}
          names={this.props.data.map(function (data) { return data.title })}
          onSelectFn={this.onSelect}
        />
        { this.renderChart() }
      </div>
    )
  }

})

module.exports = Chart
