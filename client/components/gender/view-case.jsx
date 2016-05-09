var React = require('react')

var Grid = require('react-bootstrap').Grid
var Row = require('react-bootstrap').Row
var Col = require('react-bootstrap').Col
var Image = require('react-bootstrap').Image

var Cases = require('../../../public/resources/cases.js')

var ViewCase = React.createClass({

  renderCase: function (caseInfo) {
    var style = {
      width: '100px',
      height: '250px'
    }
    return (
      <a className='linklessAnchor' name={caseInfo.id}>
        <h4>{caseInfo.name}</h4>
        <Grid>
          <Row>
            <Col xs={ 6 } md={ 4 }>
              <Image style={style}
                     src={'/img/cases/' + caseInfo.id + '.png'}
                     rounded />
            </Col>
            <Col xs={6} md={8}>
              <p>{caseInfo.description}</p>
            </Col>
          </Row>
        </Grid>
      </a>
    )
  },

  renderAllCases: function () {
    return Cases.map(function (caseInfo) {
      return this.renderCase(caseInfo)
    })
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
