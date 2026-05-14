import Input from './Input';
import TaskItemList from './tasks/TaskItemList';
import { addTask, deleteTask, toggleTaskCompleted } from './tasks/tasksSlice';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import '../App.scss';

function ToDoListPage() {
  const tasks = useAppSelector((state) => state.tasks);
  const dispatch = useAppDispatch();

  return (
    <>
      <div className="container">
        <h2>To Do List</h2>
        <Input addTodo={(text) => dispatch(addTask(text))} />
        <TaskItemList
          tasks={tasks}
          toggleIsCompleted={(id) => dispatch(toggleTaskCompleted(id))}
          handleDeleteTask={(id) => dispatch(deleteTask(id))}
        />
      </div>
    </>
  );
}

export default ToDoListPage;
