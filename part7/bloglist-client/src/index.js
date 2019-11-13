
import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import App from './App'
import store from './store'

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>, 
  document.getElementById('root')
)

// expose store when run in Cypress
if (window.Cypress) {
  window.store = store
}
