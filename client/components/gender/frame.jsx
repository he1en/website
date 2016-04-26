var React = require('react')

var Nav = require('react-bootstrap').Nav
var NavItem = require('react-bootstrap').NavItem

var Data = require('./data.js')
var Cases = require('./cases.js')

var Frame = React.createClass({

  getInitialState: function () {
    return { tab: 0 }
  },

  handleSelect: function (eventKey) {
    this.setState({tab: eventKey})
  },

  renderTabs: function () {
    var tabs = ['Data', 'Case Studies', 'Video', 'About']
    return tabs.map(function (name, index) {
      return (
        <NavItem eventKey={index} key={index}> {name} </NavItem>
      )
    })
  },

  renderBody: function () {
    if (this.state.tab === 0) {
      return (<Data />)
    }
    if (this.state.tab === 1) {
      return (<Cases />)
    }
    if (this.state.tab === 2) {
      return (<h4>Watch our explanatory video for an overview.</h4>)
    }
    if (this.state.tab === 3) {
      return (<h4>About us.</h4>)
    }
  },

  render: function () {
    return (
      <div>
        <h1>Gender Preferences</h1>
        <h4 className='title-description'>Research-backed visualizations of what market share you're missing.</h4>
        <Nav bsStyle='tabs' activeKey={this.state.tab} onSelect={this.handleSelect}>
          { this.renderTabs() }
        </Nav>
        <div className='body'>
          { this.renderBody() }
        </div>
      </div>

    )
  }
})

module.exports = Frame
