var React = require('react')

var Grid = require('react-bootstrap').Grid
var Row = require('react-bootstrap').Row
var Col = require('react-bootstrap').Col
var Image = require('react-bootstrap').Image

var Cases = require('../../../public/resources/cases.js')

var ViewCase = React.createClass({

  renderLinks: function (links) {
    return links.map(function (link) {
      return (<a>{ link }</a>)
    })
  },

  renderContents: function (caseInfo) {
    return caseInfo.sections.map(function (section) {
      return (
        <p>
          {
            section.map(function (sectionPiece) {
              if (sectionPiece[1]) {
                return (
                  <a href={sectionPiece[1]}>
                    {sectionPiece[0]}
                  </a>
                )
              } else {
                return (<span>{sectionPiece[0]}</span>)
              }
            })
          }
        </p>
      )
    })
  },

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
      <div style={style}>
        <a className='linklessAnchor' name={caseInfo.id}>
          <h4>{caseInfo.name}</h4>
        </a>
        <Grid>
          <Row>
            <Col xs={ 6 } md={ 4 }>
              <Image style={imgStyle}
                     src={'/img/cases/' + caseInfo.id + '.png'}
                     rounded />
            </Col>
            <Col xs={6} md={8}>
              <p>
                { this.renderContents(caseInfo) }
              </p>
            </Col>
          </Row>
        </Grid>
      </div>
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
