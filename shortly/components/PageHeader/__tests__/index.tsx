import { screen, render } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import PageHeader from '..'

beforeEach(() => {
  global.innerWidth = 500
  global.dispatchEvent(new Event('resize'))
})

test('menu button activates the mobile navigation', async () => {
  render(<PageHeader />)

  userEvent.click(screen.getByLabelText('Menu'))

  expect(screen.getByRole('list')).toHaveClass('nav__list--active')
})

test('menu button toggle closes the mobile navigation', async () => {
  render(<PageHeader />)

  userEvent.dblClick(screen.getByLabelText('Menu'))

  expect(screen.getByRole('list')).not.toHaveClass('nav__list--active')
})
