import React from 'react'
import Input from './Input'
import { shallow } from 'enzyme'
import sinon from 'sinon'
import styles from './Input.css'

describe('components / Input', () => {
  it('should render', () => {
    const component = shallow(<Input />)
    expect(component.hasClass(styles.root)).toBe(true, `root should have className ${styles.root}`)
  })
  it('should contain a label', () => {
    const component = shallow(<Input label='Nickname' />)
    const label = component.find('label')
    expect(label.length).toBe(1, 'there should be a label')
    expect(label.text()).toBe('Nickname')
    expect(label.hasClass(styles.label)).toBe(true, `label should have className ${styles.label}`)
  })
  it('should contain an input', () => {
    const component = shallow(<Input value='Skepparn' />)
    const input = component.find('input')
    expect(input.length).toBe(1, 'there should be an input')
    expect(input.prop('value')).toBe('Skepparn')
    expect(input.hasClass(styles.input)).toBe(true, `input should have className ${styles.input}`)
  })
  it('should add the has-focus class when the input is focused', () => {
    const component = shallow(<Input />)
    const input = component.find('input')
    input.simulate('focus')
    expect(component.hasClass(styles['root'])).toBe(true, `root should have className ${styles['root']}`)
    expect(component.hasClass(styles['has-focus'])).toBe(true, `root should have className ${styles['has-focus']}`)
  })
  it('should remove the has-focus class when the input loses focus', () => {
    const component = shallow(<Input />)
    const input = component.find('input')
    input.simulate('focus')
    input.simulate('blur')
    expect(component.hasClass(styles['root'])).toBe(true, `root should have className ${styles['root']}`)
    expect(component.hasClass(styles['has-focus'])).toBe(false, `root should not have className ${styles['has-focus']}`)
  })
  it('should add the has-value class when the input has value', () => {
    const component = shallow(<Input value='foo' />)
    expect(component.hasClass(styles['has-value'])).toBe(true, `root should have className ${styles['has-value']}`)
  })
  it('should not add the has-value class when the input has no value', () => {
    const component = shallow(<Input />)
    expect(component.hasClass(styles['has-value'])).toBe(false, `root should not have className ${styles['has-value']}`)
  })
  it('should propagate the onChange event from the input', () => {
    const handler = sinon.spy()
    const component = shallow(<Input onChange={handler} />)
    const input = component.find('input')
    input.simulate('change', { target: { value: 'foo bar' } })
    expect(handler.called).toBe(true, 'handler should be called')
    expect(handler.calledWithExactly({ target: { value: 'foo bar' } })).toBe(true, 'handler should be called with the original event')
  })
})
