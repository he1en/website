var React = require('react/addons')
var Grid = require('react-bootstrap').Grid
var Row = require('react-bootstrap').Row
var Col = require('react-bootstrap').Col
var Thumbnail = require('react-bootstrap').Thumbnail


var Home = React.createClass({

  renderLinks: function () {
    var linkNames = ['shepp_black', 'resume', 'github', 'linkedin']
      var links = ['http://sheplusplus.org', '/resume', 'https://github.com/he1en',
                   'https://linkedin.com/in/helenbhastings']
      return linkNames.map(function (name, index) {
         return (
           <Col xs={ 3 } md={ 3 } key={ index }>
              <Thumbnail className='main-link'
                href={ links[index] } alt={ name } src={ '/img/' + name + '.png' } />
           </Col>
         )
      })
  },

  render: function () {
    return (
      <div>
        <h1 className='main-hello'>Hi, I'm Helen.</h1>
          <h4 className='under-hello'>I'm a student and software engineer.</h4>
          <h4 className='email-hello'>While I clean things up around here, reach me at helenh (at) cs (dot) stanford (dot) edu.</h4>
          <div className='link-container'>
            <Grid>
              <Row>
                { this.renderLinks() }
              </Row>
            </Grid>
           </div>
       </div>
      )
    }
});

module.exports = Home
