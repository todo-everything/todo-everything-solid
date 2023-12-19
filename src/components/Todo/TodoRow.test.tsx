import '@testing-library/jest-dom' // 👈 this is imported in order to use the jest-dom matchers
import {render} from '@solidjs/testing-library'
import TodoRow from './TodoRow.tsx'
import {ITodo} from '../../api/models'

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
  it('does not error out with empty Todo', async () => {
    const {queryByText, getByText, unmount } = render(() => (
      <TodoRow
        index={1}
        todo={{}}
        {...EMPTY_FUNCS}
      />
    ))
    expect(queryByText('<none>')).toBeInTheDocument()
    expect(getByText('Delete')).toBeInTheDocument()
    unmount()
  })
  it('displays row with data', async () => {
    const {queryByText, getByText, asFragment } = render(() => (
      <TodoRow
        index={1}
        todo={MOCK_TODO}
        {...EMPTY_FUNCS}
      />
    ))
    const res = await asFragment()
    console.log({ res })
    expect(getByText(MOCK_TODO.title)).toBeInTheDocument()
    expect(queryByText(MOCK_TODO.body)).toBeNull()
    expect(getByText('Delete')).toBeInTheDocument()
  })
})