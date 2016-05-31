var React = require('react')

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
        <h4 style={{paddingTop: '20px', paddingBottom: '20px'}}>
          Case Studies: Improving products through gender analysis.
        </h4>
        <Row style={{paddingRight: '200px'}}>
          { this.renderCases() }
        </Row>
      </div>

    )
  }
})

module.exports = Cases
