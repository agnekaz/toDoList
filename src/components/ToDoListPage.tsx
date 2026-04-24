import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import Input from './Input';
import type { Task } from './task';
import TaskItemList from './TaskItemList'
import '../App.scss';

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
        
        <div className="container">
        <h2>To Do List</h2>
          <Input addTodo={addTodo}/>
          <TaskItemList tasks={tasks}
          toggleIsCompleted={toggleIsCompleted}
          handleDeleteTask={handleDeleteTask}/>
        </div>
        </>
    );
}

export default ToDoListPage;