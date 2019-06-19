import React from 'react'
import { BrowserRouter, Route } from 'react-router-dom'
import PropTypes from 'prop-types'
import Run from "./Run"
class MyRouter extends React.Component {
  render () {
    return (
      <BrowserRouter>
        <Route path='/' component={Run} />
      </BrowserRouter>
    )
  }
}
