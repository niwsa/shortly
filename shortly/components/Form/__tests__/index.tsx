import {
  render,
  screen,
  waitFor,
  waitForElementToBeRemoved,
} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import 'whatwg-fetch'
import { rest } from 'msw'
import { setupServer } from 'msw/node'
import Form from '..'

const server = setupServer(
  rest.get(`${process.env.NEXT_PUBLIC_API_BASE}/shorten`, (req, res, ctx) => {
    const original_link = req.url.searchParams.get('url')
    return res(
      ctx.json({
        ok: true,
        result: {
          code: 'stE2dB',
          short_link: 'shrtco.de/stE2dB',
          full_short_link: 'https://shrtco.de/stE2dB',
          short_link2: '9qr.de/stE2dB',
          full_short_link2: 'https://9qr.de/stE2dB',
          short_link3: 'shiny.link/stE2dB',
          full_short_link3: 'https://shiny.link/stE2dB',
          share_link: 'shrtco.de/share/stE2dB',
          full_share_link: 'https://shrtco.de/share/stE2dB',
          original_link,
        },
      })
    )
  })
)

beforeAll(() => server.listen({ onUnhandledRequest: 'error' }))
afterAll(() => server.close())
afterEach(() => server.resetHandlers())

test('fetches shortUrl on form submit', async () => {
  const addShrtCodeToList = jest.fn()
  render(<Form addShrtCodeToList={addShrtCodeToList} />)
  const urlInput = screen.getByLabelText(/URL to shorten/i)
  const submitBtn = screen.getByText(/Shorten It!/i)
  userEvent.type(urlInput, 'https://nextjs.org')
  userEvent.click(submitBtn)
  await waitForElementToBeRemoved(() =>
    screen.getByLabelText(/Fetching short link/i)
  )
  expect(addShrtCodeToList).toHaveBeenCalled()
  await waitFor(() => screen.getByText(/Shorten It!/i))
  expect(urlInput).toHaveValue('')
})

test('empty input makes input invalid', async () => {
  const addShrtCodeToList = jest.fn()
  render(<Form addShrtCodeToList={addShrtCodeToList} />)
  // const form = screen.getByRole('form')
  const urlInput = screen.getByLabelText(/URL to shorten/i)
  // const submitBtn = screen.getByText(/Shorten It!/i)
  urlInput.focus()
  urlInput.blur()
  // screen.debug()
  // userEvent.click(submitBtn)
  await waitFor(() => expect(urlInput).toBeInvalid())
  // screen.debug()
  await waitFor(() =>
    expect(screen.getByText(/Please add a link/i)).toBeInTheDocument()
  )
  expect(addShrtCodeToList).not.toHaveBeenCalled()
})

test('http link shows error', async () => {
  const addShrtCodeToList = jest.fn()
  render(<Form addShrtCodeToList={addShrtCodeToList} />)
  // const form = screen.getByRole('form')

  const urlInput = screen.getByLabelText(/URL to shorten/i)
  const submitBtn = screen.getByText(/Shorten It!/i)
  userEvent.type(urlInput, 'http://nextjs.org')
  urlInput.blur()
  // screen.debug()
  userEvent.click(submitBtn)
  await waitFor(() => expect(urlInput).toBeInvalid())
  // expect(screen.getByText(/Only HTTPS urls allowed/i)).toBeInTheDocument()
  expect(addShrtCodeToList).not.toHaveBeenCalled()
})

test('invalid https url shows error', async () => {
  // NOTE: For some reason I am not able to test for the presence of error messages in this test

  const addShrtCodeToList = jest.fn()
  render(<Form addShrtCodeToList={addShrtCodeToList} />)
  // const form = screen.getByRole('form')

  const urlInput = screen.getByLabelText(/URL to shorten/i)
  // const submitBtn = screen.getByText(/Shorten It!/i)
  // not able to
  userEvent.type(urlInput, 'https://<dasd')
  urlInput.blur()
  expect(
    screen.getByText(/Please enter a valid https:\/\/ url/i)
  ).toBeInTheDocument()
  // screen.debug()
  // userEvent.click(submitBtn)
  await waitFor(() => expect(urlInput).toBeInvalid())
  expect(addShrtCodeToList).not.toHaveBeenCalled()
})

// TODO: Test to check if the error messages are cleared on valid submit
