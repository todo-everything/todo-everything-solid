import {cleanup, fireEvent, render, screen} from '@solidjs/testing-library'
import TodoInput from './TodoInput.tsx'
import {vi} from 'vitest'


describe('<TodoInput />', () => {
  afterEach(cleanup)

  it('works', async () => {
    const handleSubmit = vi.fn()
    render(() => <TodoInput onSubmit={handleSubmit} />)
    const component = screen.getByRole('form')
    expect(component).toBeInTheDocument()
    const input = screen.getByPlaceholderText('Add todo...')
    expect(input).toBeInTheDocument()

    fireEvent.input(input, {target: {value: 'test'}})
    expect(input).toHaveValue('test')
  })

  it('debounces submit', async () => {
    const handleSubmit = vi.fn()
    render(() => <TodoInput onSubmit={handleSubmit} />)
    const input = screen.getByPlaceholderText('Add todo...')

    for (const _ of Array(5)) {
      fireEvent.submit(input)
    }

    await vi.waitFor(() => {
      expect(handleSubmit).toHaveBeenCalledTimes(1)
    })
  })
})