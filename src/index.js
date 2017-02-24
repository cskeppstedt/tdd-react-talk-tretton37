import React from 'react'
import { render } from 'react-dom'
import Input from './components/Input'

import './index.css'

const root = document.getElementById('root')

let name = ''

const renderApp = () => {
  render(
    <Input label='Given name' value={name} onChange={(e) => { name = e.target.value; renderApp() }} />,
    root
  )
}

renderApp()

