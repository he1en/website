var React = require('react')
var Nav = require('react-bootstrap').Nav
var NavItem = require('react-bootstrap').NavItem

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
      return (<div>Data</div>)
    }
    if (this.state.tab === 1) {
      return (<div>Case Studies</div>)
    }
    if (this.state.tab === 2) {
      return (<div>Video</div>)
    }
    if (this.state.tab === 3) {
      return (<div>About</div>)
    }
  },

  render: function () {
    return (
      <div>
        <h1>Gender Preferences</h1>
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
