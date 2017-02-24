import React from 'react'
import Input from './Input'
import { shallow } from 'enzyme'
import styles from './Input.css'
import sinon from 'sinon'

describe('Input', () => {
  it('should render', () => {
    shallow(<Input />)
  })
  it('should have the root className', () => {
    const component = shallow(<Input />)
    expect(component.hasClass(styles.root)).toBe(true, `it should have the ${styles.root} className`)
  })
  it('should have a label with the text from the `label` prop', () => {
    const component = shallow(<Input label='foo bar' />)
    const label = component.find('label')
    expect(label.length).toBe(1, 'there should be a label')
    expect(label.text()).toBe('foo bar')
    expect(label.hasClass(styles.label)).toBe(true, `it should have the ${styles.label} className`)
  })
  it('should have an input', () => {
    const component = shallow(<Input value='bar foo' />)
    const input = component.find('input')
    expect(input.length).toBe(1, 'there should be an input')
    expect(input.prop('value')).toBe('bar foo')
    expect(input.hasClass(styles.input)).toBe(true, `it should have the ${styles.input} className`)
  })
  it('should add the has-value class when input has a value', () => {
    const component = shallow(<Input value='bar foo' />)
    expect(component.hasClass(styles.root)).toBe(true, 'it should have the root class')
    expect(component.hasClass(styles['has-value'])).toBe(true, 'it should have the has-value class')
  })
  it('should propagate the onChange from the input', () => {
    const handler = sinon.spy()
    const component = shallow(<Input onChange={handler} />)
    const input = component.find('input')
    input.simulate('change', { target: { value: 'f' } })
    expect(handler.calledOnce).toBe(true, 'the handler should be called once')
    expect(handler.calledWithExactly({ target: { value: 'f' } })).toBe(true, 'it should pass on the original event')
  })
})

