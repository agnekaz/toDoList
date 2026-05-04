import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ToDoListPage  from './ToDoListPage';

const localStorageMock = (() => {
    let store: Record<string, string> = {};
    return {
      getItem: vi.fn((key: string) => store[key] || null),
      setItem: vi.fn((key: string, value: string) => { store[key] = value; }),
      clear: vi.fn(() => { store = {}; }),
    };
  })();
  
Object.defineProperty(window, 'localStorage', { value: localStorageMock });

describe('ToDoListPage', () => {
    beforeEach(() => {
      localStorage.clear()
      vi.clearAllMocks()
    })

    it('renders the title', () => {
      render(<ToDoListPage />)
      expect(screen.getByText('To Do List')).toBeInTheDocument()
    })

    it('adds a new task when submitting', async () => {
      render(<ToDoListPage />)
      const user = userEvent.setup()

      const input = screen.getByPlaceholderText(/Start writing and press enter to create task/i)
      await user.type(input, 'Buy milk{Enter}')

      expect(screen.getByText('Buy milk')).toBeInTheDocument()
    })

    it('toggles a task as completed when checkbox is clicked', async () => {
      render(<ToDoListPage />)
      const user = userEvent.setup()

      const input = screen.getByPlaceholderText(/Start writing and press enter to create task/i)
      await user.type(input, 'Walk dog{Enter}')

      const checkbox = screen.getByRole('checkbox')
      expect(checkbox).not.toBeChecked()

      await user.click(checkbox)
      expect(checkbox).toBeChecked()
    })

    it('removes a task when delete is clicked', async () => {
      render(<ToDoListPage />)
      const user = userEvent.setup()

      const input = screen.getByPlaceholderText(/Start writing and press enter to create task/i)
      await user.type(input, 'Task to delete{Enter}')
      expect(screen.getByText('Task to delete')).toBeInTheDocument()

      const deleteButton = screen.getByRole('button', { name: /delete task/i })
      await user.click(deleteButton)

      expect(screen.queryByText('Task to delete')).not.toBeInTheDocument()
    })

    it('loads initial tasks from localStorage', () => {
      localStorage.setItem('tasks', JSON.stringify([
        { description: 'Stored task', isCompleted: false, id: '1' },
      ]))

      render(<ToDoListPage />)
      expect(screen.getByText('Stored task')).toBeInTheDocument()
    })

    it('persists tasks to localStorage when tasks change', async () => {
      render(<ToDoListPage />)
      const user = userEvent.setup()

      const input = screen.getByPlaceholderText(/Start writing and press enter to create task/i)
      await user.type(input, 'Persist me{Enter}')

      expect(localStorage.setItem).toHaveBeenCalledWith(
        'tasks',
        expect.stringContaining('Persist me'),
      )
    })
});