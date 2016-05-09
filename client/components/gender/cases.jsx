var React = require('react')

var Grid = require('react-bootstrap').Grid
var Row = require('react-bootstrap').Row
var Col = require('react-bootstrap').Col
var Thumbnail = require('react-bootstrap').Thumbnail

var CaseInfo = require('../../../public/resources/cases.js')

var Cases = React.createClass({

  renderCases: function () {
    return CaseInfo.map(function (caseDict, index) {
      return (
        <Col xs={ 6 } md={ 3 } key={ index }>
          <a href={ '/gender/viewcases#' + caseDict.id } >
          <Thumbnail className='main-link'
           alt={ caseDict.name }
            src={ '/img/cases/' + caseDict.id + '.png'}>
            <div>{ caseDict.name }</div>
          </Thumbnail>
          </a>
        </Col>
        )
    })
  },

  render: function () {
    return (
      <div>
        <h4>Case studies of failure when gender is not taken into account.</h4>
        <Grid>
          <Row>
            { this.renderCases() }
          </Row>
        </Grid>
      </div>

    )
  }
})

module.exports = Cases
