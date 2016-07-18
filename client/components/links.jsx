var React = require('react')
var Row = require('react-bootstrap').Row
var Col = require('react-bootstrap').Col
var Thumbnail = require('react-bootstrap').Thumbnail

var Links = React.createClass({

  renderLinks: function () {
    var linkNames = ['shepp_black', 'resume', 'github', 'linkedin']
    var links = ['http://sheplusplus.org',
                 '/resume',
                 'https://github.com/he1en',
                 'https://linkedin.com/in/helenbhastings']
    return linkNames.map(function (name, index) {
      return (
         <Col xs={ 6 } sm={ 6 } md={ 3 } lg={ 3 } key={ index }>
            <Thumbnail className='main-link'
              href={ links[index] } alt={ name } src={ '/img/' + name + '.png' } />
         </Col>
       )
    })
  },

  render: function () {
    return (
      <div className='link-container'>
        <Row>
          { this.renderLinks() }
        </Row>
      </div>
    )
  }
})

module.exports = Links
