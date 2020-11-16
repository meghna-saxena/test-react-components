import React from 'react'
import ReactDOM from 'react-dom'
import '@testing-library/jest-dom/extend-expect'
// import {queries} from '@testing-library/dom'
// eslint-disable-next-line testing-library/no-dom-import
import {getQueriesForElement} from '@testing-library/dom'
import {FavoriteNumber} from '../favorite-number'

test('renders a number input with a label "Favorite Number', () => {
  const div = document.createElement('div')
  ReactDOM.render(<FavoriteNumber />, div)

  const {getByLabelText} = getQueriesForElement(div)
  // associate label and input together, that's what dom-testing-library does

  // const input = queries.getByLabelText(div, /favorite number/i)
  //returns form-control which is assigned to input variable

  // eslint-disable-next-line testing-library/prefer-screen-queries
  const input = getByLabelText(/favorite number/i)
  expect(input).toHaveAttribute('type', 'number')
})
