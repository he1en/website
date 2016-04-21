var React = require('react/addons')
var Nav = require('react-bootstrap').Nav
var NavItem = require('react-bootstrap').NavItem

var Landing = React.createClass({

  getInitialState: function () {
    return { tab: 0 }
  },

  handleSelect: function (eventKey) {
    alert('hi')
    this.setState({tab: eventKey})
  },

  renderTabs: function () {
    var tabs = ['Data', 'Case Studies', 'Video', 'About']
      return tabs.map(function (name, index) {
         return (
           <NavItem eventKey={index}> {name} </NavItem>
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
  },

  render: function () {
    return (
      <div>
        <h1>Gender Preferences</h1>
        <Nav bsStyle='tabs' activeKey={0} onSelect={this.handleSelect}>
          { this.renderTabs() }
        </Nav>
        <div className='body'>
          { this.renderBody() }
        </div>
      </div>

      )
  }
})

module.exports = Landing
