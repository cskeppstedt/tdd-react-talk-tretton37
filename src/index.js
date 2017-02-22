import React from 'react'
import { render } from 'react-dom'

import './index.css'
import Input from './components/Input'
import uncontrolled from './decorators/uncontrolled'

const UncontrolledInput = uncontrolled(Input, { upperCasify: true })

render(
  <UncontrolledInput onChange={e => console.log(e)} />,
  document.getElementById('root')
)

