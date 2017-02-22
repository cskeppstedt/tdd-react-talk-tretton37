import React from 'react'

export default function uncontrolled (Target, { upperCasify } = {}) {
  return class Uncontrolled extends React.Component {
    constructor (props) {
      super(props)
      this.state = {
        value: ''
      }
    }
    render () {
      return <Target
        onChange={(e) => {
          const value = upperCasify ? e.target.value.toUpperCase() : e.target.value
          this.setState({ value: value })
          this.props.onChange && this.props.onChange(e)
        }}
        value={this.state.value}
      />
    }
  }
}
