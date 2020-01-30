import React from 'react'
import ReactDOM from 'react-dom'
// import {queries} from '@testing-library/dom'
import {getQueriesForElement} from '@testing-library/dom'
import {FavoriteNumber} from '../favorite-number'

test('renders a number input with a label "Favorite Number', () => {
  const div = document.createElement('div')
  ReactDOM.render(<FavoriteNumber />, div)

  const {getByLabelText} = getQueriesForElement(div)
  // associate label and input together, that's what dom-testing-library does

  // const input = queries.getByLabelText(div, /favorite number/i)
  //returns form-control which is assigned to input variable

  const input = getByLabelText(/favorite number/i)
  expect(input).toHaveAttribute('type', 'number')
})
