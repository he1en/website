var React = require('react')
var Link = require('react-router').Link

var Grid = require('react-bootstrap').Grid
var Row = require('react-bootstrap').Row
var Col = require('react-bootstrap').Col
var Image = require('react-bootstrap').Image

var Cases = require('../../../public/resources/cases.js')

var Case = React.createClass({

  propTypes: {
    id: React.PropTypes.string.isRequired
  },

  getInitialState: function () {
    for (var i = 0; i < Cases.length; i++) {
      if (Cases[i].id === this.props.id) return Cases[i]
    }
    return Cases[0]
  },

  render: function () {
    //         <Link to='/gender/cases'>Back to Cases List</Link>

    return (
      <div>
        <a href='/gender/cases'>Back to Cases List</a>
        <h4>{this.state.name}</h4>
        <Grid>
          <Row>
            <Col xs={ 6 } md={ 4 }>
              <Image src={'/img/cases/' + this.state.id + '.png'} rounded />
            </Col>
            <Col xs={6} md={8}>
              <p>{this.state.description}</p>
            </Col>
          </Row>
        </Grid>
      </div>

    )
  }
})

module.exports = Case
