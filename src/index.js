import React from 'react'
import { render } from 'react-dom'
import Input from './components/Input'

import './index.css'

const App = () => {
  const root = document.getElementById('root')
  const label = 'Given name'
  let value = 'Christoffer'

  const onChange = (e) => {
    value = e.target.value
    renderApp()
  }

  const renderApp = () => render(
    <Input label={label} value={value} onChange={onChange} />,
    root
  )

  renderApp()
}

App()
