import React from 'react';
import TaskItem from './TaskItem';
import type { Task } from './task';

interface TaskItemListProps{
    tasks: Task[];
    toggleIsCompleted: (id: string) => void;
    handleDeleteTask: (id: string) => void;
}

function TaskItemList({tasks, toggleIsCompleted, handleDeleteTask}: TaskItemListProps){
    const items = tasks.map((task) => (
        <div key={task.id}>
            <TaskItem task={task}
            toggleIsCompleted={toggleIsCompleted}
            handleDeleteTask={handleDeleteTask}/>
        </div>
    ))
    return(
        <div className="row">{items}</div>
    );
}

export default TaskItemList;