import { render, screen } from '@testing-library/react'
import { it, expect } from 'vitest'

// Simple React component test to verify snapshot functionality
function SimpleComponent({ text }: { text: string }) {
  return <div>Hello {text}</div>
}

it('renders simple component unchanged', () => {
  const { container } = render(<SimpleComponent text="World" />)
  expect(container).toMatchSnapshot()
})

it('renders component with testing library assertions', () => {
  render(<SimpleComponent text="Testing" />)
  expect(screen.getByText('Hello Testing')).toBeInTheDocument()
})
