import { render, screen, cleanup } from '@testing-library/react'
import Hello from '../components/hello'

afterEach(cleanup)
test('Test that component renders', () => {
  const message = 'Tomorrow'
  render(<Hello message={message} />)
  screen.getByText(message)
})
