import React from 'react'

import styles from './Input.css'

export default class Input extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      hasFocus: false
    }
  }

  render () {
    let rootClassName = styles.root
    if (this.state.hasFocus) {
      rootClassName += ' ' + styles['has-focus']
    }
    if (this.props.value) {
      rootClassName += ' ' + styles['has-value']
    }

    return (
      <div className={rootClassName}>
        <label className={styles.label}>
          {this.props.label}
        </label>

        <input
          className={styles.input}
          onBlur={() => this.setState({ hasFocus: false })}
          onFocus={() => this.setState({ hasFocus: true })}
          onChange={(e) => this.props.onChange(e)}
          value={this.props.value}
        />
      </div>
    )
  }
}

