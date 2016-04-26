var React = require('react')

var Button = require('react-bootstrap').Button
var ButtonGroup = require('react-bootstrap').ButtonGroup

var Data = React.createClass({

  render: function () {
    var style = {
      position: 'absolute',
      right: '100px',
      top: '250px'
    }
    return (
      <div>
        <h4>Visualizing the research, disaggregated by trait.</h4>
        <ButtonGroup vertical style={style}>
          <Button>Tinkering</Button>
          <Button>Design</Button>
          <Button>Functionality</Button>
          <Button>Entertainment</Button>
          <Button>News</Button>
          <Button>Chat and Messaging</Button>
        </ButtonGroup>
      </div>
    )
  }
})

module.exports = Data
