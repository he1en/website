var React = require('react')

var Grid = require('react-bootstrap').Grid
var Row = require('react-bootstrap').Row
var Col = require('react-bootstrap').Col
var Thumbnail = require('react-bootstrap').Thumbnail

var CaseInfo = require('../../../public/resources/cases.js')

var Cases = React.createClass({

  getDefaultProps: function () {
    return {
      caseNames: CaseInfo.map(function (caseInfo) { return caseInfo.name })
    }
  },

  renderCases: function () {
    return this.props.caseNames.map(function (caseName, index) {
      return (
        <Col xs={ 6 } md={ 3 } key={ index }>
          <Thumbnail className='main-link'
            href={ '' } alt={ caseName } src={ '/img/github.png' }>
            <p>{ caseName }</p>
          </Thumbnail>
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
