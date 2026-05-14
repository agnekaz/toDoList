import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithRedux } from '../test/renderWithRedux.tsx';
import ToDoListPage from './ToDoListPage.tsx';

describe('ToDoListPage', ()=>{
  it('Should render components', () => {
    renderWithRedux(<ToDoListPage />);
  
    const header = screen.getByText('To Do List');
    const input = screen.getByRole('textbox');
    const taskList = screen.getByRole('list');
  
    expect(header).toBeInTheDocument();
    expect(input).toBeInTheDocument();
    expect(taskList).toBeInTheDocument();
  });
  
  it('Should render tasks from preloaded Redux state', () => {
    const preloadedState = {
      tasks: [
        { description: 'Learn testing', isCompleted: false, id: '1' },
        { description: 'Ship the app', isCompleted: true, id: '2' },
      ],
    };
  
    renderWithRedux(<ToDoListPage />, {preloadedState});
  

    const listItems = screen.getAllByRole('listitem');
    const checkBoxes = screen.getAllByRole('checkbox');
  
    expect(listItems).toHaveLength(2);
    expect(screen.getByText('Learn testing')).toBeInTheDocument();
    expect(screen.getByText('Ship the app')).toBeInTheDocument();
    expect(checkBoxes[0]).not.toBeChecked();
    expect(checkBoxes[1]).toBeChecked();
  });
  
  it('Should trigger task creation flow on submit', async ()=>{
    const preloadedState = {
      tasks: [],
    };

    const {store} = renderWithRedux(<ToDoListPage/>, {preloadedState});

    expect(screen.queryByText('Wash dishes')).not.toBeInTheDocument();

    const input = screen.getByRole('textbox');
    const button = screen.getByRole('button', {name: /add task/i});

    await userEvent.type(input, 'Wash dishes');
    await userEvent.click(button);

    expect(store.getState().tasks).toHaveLength(1);
    expect(store.getState().tasks[0]).toMatchObject({description: 'Wash dishes', isCompleted: false,});
    
    const newTask = await screen.findByText('Wash dishes');
    expect(newTask).toBeInTheDocument();
  });

  it('Should trigger task status toggle flow on task click', async ()=>{
    const preloadedState = {
      tasks: [
        { description: 'Learn testing', isCompleted: false, id: '1' }
      ],
    };

    const {store} = renderWithRedux(<ToDoListPage/>, {preloadedState});

    const checkbox = screen.getByRole('checkbox');

    expect(checkbox).not.toBeChecked();

    await userEvent.click(checkbox);

    expect(checkbox).toBeChecked();
    expect(store.getState().tasks[0]).toMatchObject({
      description: 'Learn testing', 
      isCompleted: true, 
      id: '1'
    });
  });

  it('Should trigger task removal on delete click', async()=>{
    const preloadedState = {
      tasks: [
        { description: 'Task to be deleted', isCompleted: false, id: '1' }
      ],
    };

    const {store} = renderWithRedux(<ToDoListPage/>, {preloadedState});

    expect(screen.getByText('Task to be deleted')).toBeInTheDocument();

    const deleteButton = screen.getByRole('button', {name: /delete task/i});
    await userEvent.click(deleteButton);

    expect(store.getState().tasks).toHaveLength(0);
    expect(screen.queryByText('Task to be deleted')).not.toBeInTheDocument();
  });
})
