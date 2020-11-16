// import React from 'react'
// import ReactDOM from 'react-dom'
// import {getQueriesForElement} from '@testing-library/dom'
// import {FavoriteNumber} from '../favorite-number'

// function render(ui) {
//   const container = document.createElement('div')
//   ReactDOM.render(ui, container)
//   const queries = getQueriesForElement(container)
//   return {container, ...queries}
// }

// test('renders a number input with a label "Favorite Number', () => {
//   const {getByLabelText} = render(<FavoriteNumber />)
//   const input = getByLabelText(/favorite number/i)
//   expect(input).toHaveAttribute('type', 'number')
// })

import React from 'react'
import {render, screen} from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import {FavoriteNumber} from '../favorite-number'

test('renders a number input with a label "Favorite Number"', () => {
  // const {getByLabelText} = render(<FavoriteNumber />)
  render(<FavoriteNumber />)
  const input = screen.getByLabelText(/favorite number/i)
  expect(input).toHaveAttribute('type', 'number')
})
