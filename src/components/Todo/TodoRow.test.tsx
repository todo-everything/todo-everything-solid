import '@testing-library/jest-dom' // 👈 this is imported in order to use the jest-dom matchers
import {cleanup, fireEvent, render} from '@solidjs/testing-library'
import {vi} from 'vitest'

import type {ITodo} from '~/api/models'
import TodoRow from '~/components/Todo/TodoRow.tsx'

const MOCK_TODO: ITodo = {
  title: 'Thetitle',
  body: 'The body',
  completed: null,
  created_by: {email: 'wat@wat.com', id: 1}
}

const EMPTY_FUNCS = {
  onDelete: () => '',
  onSave: () => '',
  onComplete: () => '',
  onItemClick: () => '',
}


describe('<TodoRow />', () => {
  afterEach(cleanup)

  it('does not error out with empty Todo', async () => {
    const {queryByText, getByText} = render(() => (
      <TodoRow
        index={1}
        todo={{}}
        {...EMPTY_FUNCS}
      />
    ))
    expect(queryByText('<none>')).toBeInTheDocument()
    expect(getByText('Delete')).toBeInTheDocument()
  })
  it('displays row with data', async () => {
    const handleOnDelete = vi.fn()
    const {queryByText, getByText} = render(() => (
      <TodoRow
        index={1}
        todo={MOCK_TODO}
        {...EMPTY_FUNCS}
        onDelete={handleOnDelete}
      />
    ))
    expect(getByText(MOCK_TODO.title)).toBeInTheDocument()
    expect(queryByText(MOCK_TODO.body)).toBeNull()
    const deleteButton = (await queryByText('Delete')) as HTMLButtonElement
    expect(deleteButton).toBeInTheDocument()
    fireEvent.click(deleteButton)
    expect(handleOnDelete).toBeCalledTimes(1)
  })
})