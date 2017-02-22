import React from 'react'
import { shallow } from 'enzyme'
import sinon from 'sinon'
import uncontrolled from './uncontrolled'

class Dummy extends React.Component {
  render () {
    return <div {...this.props} />
  }
}

const Decorated = uncontrolled(Dummy)

describe('decorators / uncontrolled', () => {
  it('should be a function', () => {
    expect(typeof uncontrolled).toBe('function')
  })

  it('should return a React component that renders the given component', () => {
    const component = shallow(<Decorated />)
    const dummy = component.find(Dummy)
    expect(dummy.length).toBe(1, 'it should render a Dummy component')
  })

  it('should listen to onChange and set the value prop on the given component', () => {
    // given
    const component = shallow(<Decorated />)
    const onChange = component.find(Dummy).prop('onChange')
    // when
    onChange({ target: { value: 'foo' } })
    // then
    const dummy = component.find(Dummy)
    expect(dummy.prop('value')).toBe('foo')
  })

  it('should propagate onChange to the parent component', () => {
    // given
    const handler = sinon.spy()
    const component = shallow(<Decorated onChange={handler} />)
    const onChange = component.find(Dummy).prop('onChange')
    // when
    onChange({ target: { value: 'foo' } })
    // then
    expect(handler.calledOnce).toBe(true, 'onChange handler should be called once')
    expect(handler.calledWithExactly({ target: { value: 'foo' } })).toBe(true, 'onChange should be called with the original event')
  })

  describe('options', () => {
    it('should support upper-casing', () => {
      // given
      const options = { upperCasify: true }
      const WithUpperCasify = uncontrolled(Dummy, options)
      const component = shallow(<WithUpperCasify />)
      const onChange = component.find(Dummy).prop('onChange')
      // when
      onChange({ target: { value: 'foo' } })
      // then
      expect(component.find(Dummy).prop('value')).toBe('FOO')
    })
  })
})

