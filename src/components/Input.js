import React from 'react'
import styles from './Input.css'

export default class Input extends React.Component {
  render () {
    const rootClassName = this.props.value
      ? `${styles.root} ${styles['has-value']}`
      : styles.root

    return (
      <div className={rootClassName}>
        <label className={styles.label}>
          {this.props.label}
        </label>
        <input
          value={this.props.value}
          className={styles.input}
          onChange={(e) => this.props.onChange(e)}
        />
      </div>
    )
  }
}

