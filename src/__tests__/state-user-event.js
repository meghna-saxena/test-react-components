import * as React from 'react'
// NOTE: in the videos I called this "user" but I think
// it makes more sense to call it "userEvent"
// (you'll run into fewer "variable shadowing" problems) that way.
import userEvent from '@testing-library/user-event'
import {render, screen} from '@testing-library/react'
import {FavoriteNumber} from '../favorite-number'

test('entering an invalid value shows an error message', () => {
  render(<FavoriteNumber />)
  const input = screen.getByLabelText(/favorite number/i)
  userEvent.type(input, '10')
  expect(screen.getByRole('alert')).toHaveTextContent(/the number is invalid/i)
})
