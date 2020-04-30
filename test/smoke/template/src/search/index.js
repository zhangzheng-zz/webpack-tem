'use strict'
import React from 'react'
import ReactDOM from 'react-dom'
import './search.less'

class TestReact extends React.Component {
  render() {
    return (
      <div className="search">
        我是search
      </div>
    )
  }
}

ReactDOM.render(
  <TestReact />,
  document.getElementById('root')
)
