import React from 'react'

export default class Input extends React.Component {
  render () {
    return (
      <div>
        <input onChange={(e) => this.props.onChange(e)} value={this.props.value} />
      </div>
    )
  }
}

