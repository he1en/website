var React = require('react')
var Button = require('react-bootstrap').Button
var Glyphicon = require('react-bootstrap').Glyphicon

var Links = require('./links.js')
var BubbleContainer = require('./bubble-container.js')

var Link = require('react-router').Link

var Home = React.createClass({

  propTypes: {
    route: React.PropTypes.object
  },

  getInitialState: function () {
    return {section: this.props.route.section}
  },

  toggleSection: function () {
    this.setState({section: (this.state.section + 1) % 2})
  },

  renderButtonContents: function () {
    if (this.state.section === 0) {
      return (
        <div>
          <span>see more</span>
          <Glyphicon className='section-button-arrow' glyph='triangle-bottom' />
        </div>
      )
    }
    if (this.state.section === 1) {
      return (
        <div>
          <span>hello</span>
          <Glyphicon className='section-button-arrow' glyph='triangle-top' />
        </div>
      )
    }
  },

  renderSection: function () {
    if (this.state.section === 0) {
      return (
        <BubbleContainer>
          <div className='hello-container'>
            <div className='home-hello'>Hi, I&rsquo;m Helen.</div>
            <div className='under-hello'>
              I&rsquo;m a student and software engineer.
            </div>
            <div className='email-hello'>
              While I clean things up around here, reach me at helenh (at) cs
              (dot) stanford (dot) edu.
            </div>
          </div>
        </BubbleContainer>
      )
    }

    if (this.state.section === 1) {
      return (<Links />)
    }
  },

  render: function () {
    var switchLink = '/links'
    if (this.state.section === 1) {
      switchLink = '/'
    }
    return (
      <div className='home-container'>
        <div className='section'>
            { this.renderSection() }
        </div>
        <Link to={switchLink}>
          <Button className='section-button'
                  bsStyle='primary'
                  bsSize='large'
                  onClick={this.toggleSection} >
            { this.renderButtonContents() }
          </Button>
        </Link>
      </div>
      )
  }
})

module.exports = Home
