import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import Input from './Input';
import type { Task } from './task';
import TaskItemList from './TaskItemList'

/* const initialTasks: Task[] = [
  {
    description: "task one",
    isCompleted: false,
    id: "1",
  },
  {
    description: "task two",
    isCompleted: false,
    id: "2",
  },
]; */
function ToDoListPage(){
    const [tasks, setTasks] = useState<Task[]>([]);
    const addTodo = (description: string) => {
      const newTask = {
        description,
        isCompleted: false,
        id: uuidv4(),
      };
      setTasks([...tasks, newTask]);
    };
    const toggleIsCompleted = (id: string) => {
      setTasks(tasks.map( task =>
        task.id === id ? {
        ...task,
        isCompleted: !task.isCompleted} : task
      ));
    };
    const handleDeleteTask = (id: string) => {
      setTasks(tasks.filter((t) => t.id !== id));
    };
    return(
        <>
        <Input addTodo={addTodo}/>
        <TaskItemList tasks={tasks}
        toggleIsCompleted={toggleIsCompleted}
        handleDeleteTask={handleDeleteTask}
        />
        </>
    );
}

export default ToDoListPage;