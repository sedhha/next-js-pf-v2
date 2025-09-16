import { render } from '@testing-library/react'
import Home from '@/pages/index'

it('renders homepage unchanged', () => {
  const { container } = render(<Home lastBuild='NA' />)
  expect(container).toMatchSnapshot()
})
