//import {toHaveAttribute, toHaveTextContent} from '@testing-library/jest-dom'
// import * as jestDOM from '@testing-library/jest-dom'

// import '@testing-library/jest-dom/extend-expect' get rid of importing jest dom and extending expect manually

// we can remove the above improt since this line has been inluded in the jest config so all test files have coverage of this import
import React from 'react'
import ReactDOM from 'react-dom'
import {FavoriteNumber} from '../favorite-number'

// expect.extend(jestDOM)

test('renders a number input with a label "Favorite Number"', () => {
  const div = document.createElement('div')
  ReactDOM.render(<FavoriteNumber />, div)
  expect(div.querySelector('input')).toHaveAttribute('type', 'number')
  expect(div.querySelector('label')).toHaveTextContent('Favorite Number')
})
