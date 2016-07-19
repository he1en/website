var React = require('react')

var Nav = require('react-bootstrap').Nav
var NavItem = require('react-bootstrap').NavItem

var Data = require('./data.js')
var Cases = require('./cases.js')
var ViewCase = require('./view-case.js')

var Frame = React.createClass({

  propTypes: {
    route: React.PropTypes.object
  },

  getInitialState: function () {
    return {tab: this.props.route.tab}
  },

  renderTabs: function () {
    var tabs = ['Data', 'Case Studies', 'Video', 'About']
    var links = ['data', 'cases', 'video', 'about']
    return tabs.map(function (name, index) {
      return (
        <NavItem eventKey={index} key={index} href={'/gender/' + links[index]}>
          {name}
        </NavItem>

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
    if (this.state.tab === 4) {
      return (<ViewCase />)
    }
  },

  render: function () {
    var activeKey = this.state.tab === 4 ? 1 : this.state.tab
    return (
      <div>
        <h1>Gendered Innovations in Design</h1>
        <h4 className='title-description'>
          Accounting for gender differences can increase your market share.
        </h4>
        <Nav bsStyle='tabs' activeKey={activeKey}>
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