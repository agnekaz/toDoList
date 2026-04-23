import React from 'react';
import { useState } from 'react';
import type { Task } from './task';

interface TaskItemProps{
    task: Task;
    toggleIsCompleted: (id: string) => void;
    handleDeleteTask: (id: string) => void;
}
function TaskItem({task, toggleIsCompleted, handleDeleteTask}: TaskItemProps){
    return(
        <div className="flex-row">
            <div>
                <input type="checkbox"
                className="isCompleted"
                checked={task.isCompleted}
                onChange={() => toggleIsCompleted(task.id)}
                />
                <span className="discription">{task.description}</span>
            </div>
            <button className="bordered"
            onClick={() => handleDeleteTask(task.id)}>Delete</button>
        </div>
    );
}

export default TaskItem;