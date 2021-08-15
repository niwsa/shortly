import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import DataCard from '..'

beforeAll(() => {
  Object.assign(navigator, {
    clipboard: {
      writeText: () => Promise.resolve(),
    },
  })
  jest.spyOn(navigator.clipboard, 'writeText')
})

afterEach(() => {
  jest.resetAllMocks()
})

test('clicking "Copy" button puts value into clipboard', () => {
  render(<DataCard item="Foo" value="bar" />)

  const copyBtn = screen.getByText(/Copy/i)
  userEvent.click(copyBtn)

  expect(navigator.clipboard.writeText).toHaveBeenCalledWith('bar')
})
