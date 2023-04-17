import React from 'react'
import { render, screen, cleanup } from '@testing-library/react-native'
import AddMatch from '../AddMatch'
import aft

afterEach(() => {
  cleanup()
})

test('Should render Add Match component', () => {
  render(<AddMatch />)
  // make sure the outmost modal renders
  expect(screen.getByTestId('add-match-modal')).toBeTruthy()
  // expect the title to be New Match
  expect(screen.getByTestId('add-match-title').children[0]).toBe('New Match')
})
