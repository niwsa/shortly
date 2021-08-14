import { screen, render, waitFor, act } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import matchMediaPolyfill from 'mq-polyfill'
import PageHeader from '..'

beforeAll(() => {
  matchMediaPolyfill(window)
  window.resizeTo = function resizeTo(width, height) {
    Object.assign(this, {
      innerWidth: width,
      innerHeight: height,
      outerWidth: width,
      outerHeight: height,
    }).dispatchEvent(new this.Event('resize'))
  }
})
beforeEach(() => {
  // resize to smaller than 700px
  window.resizeTo(500, 900)
})

test('menu button activates the mobile navigation', () => {
  render(<PageHeader />)

  userEvent.click(screen.getByLabelText('Menu'))

  expect(screen.getByRole('list')).toHaveClass('nav__list--active')
})

test('menu button toggle closes the mobile navigation', () => {
  render(<PageHeader />)

  userEvent.dblClick(screen.getByLabelText('Menu'))

  expect(screen.getByRole('list')).not.toHaveClass('nav__list--active')
})

test('opened menu closes when window is resized to more than 700px', async () => {
  render(<PageHeader />)

  userEvent.click(screen.getByLabelText('Menu'))

  expect(screen.getByRole('list')).toHaveClass('nav__list--active')

  act(() => {
    window.resizeTo(900, 900)
  })

  await waitFor(() =>
    expect(screen.getByRole('list')).not.toHaveClass('nav__list--active')
  )
})
