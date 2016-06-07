var React = require('react')

var Button = require('react-bootstrap').Button
var ButtonToolbar = require('react-bootstrap').ButtonToolbar
var Row = require('react-bootstrap').Row
var Col = require('react-bootstrap').Col

var Chart = require('./chart.js')
var Graph = require('./graph.js')
var Helper = require('./helper.js')

var Categories = require('../../../public/resources/gender-data.js')

var Data = React.createClass({

  renderBarCharts: function (barCharts) {
    return barCharts.map(function (graphData) {
      return (
        <Chart name={graphData.name}
              id={graphData.id}
              data={graphData.data}
          />
      )
    })
  },

  renderCategory: function (category) {
    if (category.lineGraphs) {
      return category.lineGraphs.map(function (graphData) {
        return (
          <Graph name={graphData.name}
                id={graphData.id}
                description={graphData.description}
                data={graphData.data}
                helperText={graphData.helperText}
                citation={graphData.citation}
                graphTitle={graphData.graphTitle}
            />
        )
      })
    }
    if (category.barCharts) {
      return (
        <div style={{paddingBottom: '60px'}}>
          <Row style={{paddingBottom: '20px'}}>
            <Col xs={ 5 } md={ 5 } >
              <h4>{ category.explanation }</h4>
            </Col>
            <Col xs={ 2 } md={ 2 } >
              <Helper title={'About this Graph'}
                      contents={category.helperText} />
            </Col>
          </Row>
          { this.renderBarCharts(category.barCharts) }
          <div className='citation'>{ category.citation }</div>
        </div>
      )
    }
  },

  renderCategories: function () {
    var style = {
      paddingBottom: '15px'
    }

    return Categories.map(function (category) {
      return (
        <div>
          <a className='linklessAnchor' name={category.id}>
            <h3 style={style}>
              { category.longTitle ? category.longTitle : category.title }
            </h3>
          </a>
          { this.renderCategory(category) }
        </div>
      )
    }.bind(this))
  },

  renderButtons: function () {
    return Categories.map(function (category) {
      return (<Button href={'#' + category.id}>{category.title}</Button>)
    })
  },

  renderNavBar: function () {
    var style = {
      paddingTop: '40px',
      paddingBottom: '30px'
    }

    return (
      <div>
        <ButtonToolbar style={style}>
          { this.renderButtons() }
        </ButtonToolbar>
      </div>
    )
  },

  render: function () {
    return (
      <div>
        {this.renderNavBar()}
        {this.renderCategories()}
      </div>
    )
  }

})

module.exports = Data
