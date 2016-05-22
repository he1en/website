var React = require('react')

var Chart = React.createClass({

  propTypes: {
    femaleData: React.PropTypes.number.isRequired,
    maleData: React.PropTypes.number.isRequired,
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

  render: function () {
    var margins = this.props.margins
    var height = this.props.height
    var width = this.props.width

    var graphStyle = {
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
      width: this.props.femaleData + '%',
      height: barStyle.height,
      lineHeight: barStyle.height,
      borderRadius: barStyle.borderRadius,
      fontWeight: barStyle.fontWeight,
      color: barStyle.color
    }
    var maleBarStyle = {
      backgroundColor: this.props.maleColor,
      width: this.props.maleData + '%',
      height: barStyle.height,
      lineHeight: barStyle.height,
      borderRadius: barStyle.borderRadius,
      fontWeight: barStyle.fontWeight,
      color: barStyle.color
    }

    return (
      <div>
        <h4>{ this.props.name }</h4>
        <div style={graphStyle}>
          <div style={femaleBarStyle}>
            { 'Women: ' + this.props.femaleData + '%'}
          </div>
          <div style={maleBarStyle}>
            { 'Men: ' + this.props.maleData + '%'}
          </div>
        </div>
      </div>
    )
  }

})

module.exports = Chart
