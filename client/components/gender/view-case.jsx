var React = require('react')

var Grid = require('react-bootstrap').Grid
var Row = require('react-bootstrap').Row
var Col = require('react-bootstrap').Col
var Image = require('react-bootstrap').Image

var Cases = require('../../../public/resources/cases.js')

var ViewCase = React.createClass({

  renderCase: function (caseInfo) {
    var imgStyle = {
      width: '250px',
      height: '250px'
    }
    var style = {
      'paddingTop': '30px',
      'paddingBottom': '30px'
    }
    return (
      <a className='linklessAnchor' name={caseInfo.id}>
        <div style={style}>
          <h4>{caseInfo.name}</h4>
          <Grid>
            <Row>
              <Col xs={ 6 } md={ 4 }>
                <Image style={imgStyle}
                       src={'/img/cases/' + caseInfo.id + '.png'}
                       rounded />
              </Col>
              <Col xs={6} md={8}>
                <p>{caseInfo.description}</p>
              </Col>
            </Row>
          </Grid>
        </div>
      </a>
    )
  },

  renderAllCases: function () {
    return Cases.map(function (caseInfo) {
      return this.renderCase(caseInfo)
    }.bind(this))
  },

  render: function () {
    return (
      <div>
        <a href='/gender/cases'>Back to Cases List</a>
        { this.renderAllCases() }
      </div>

    )
  }
})

module.exports = ViewCase
