import { useMemo } from 'react';
import { Reorder, AnimatePresence } from 'motion/react';
import TaskItem from './TaskItem';
import type { Task } from './task';
import '../App.scss';


interface TaskItemListProps{
    tasks: Task[];
    toggleIsCompleted: (id: string) => void;
    handleDeleteTask: (id: string) => void;
}

function TaskItemList({tasks, toggleIsCompleted, handleDeleteTask}: TaskItemListProps){
    useMemo(() => {
        return tasks.sort((a, b) => {
            if (a.isCompleted && !b.isCompleted) return 0;
            return a.isCompleted? 1:-1;
        });
    },[tasks]);
    
    return(
        <Reorder.Group 
            axis="y" 
            values={tasks} 
            onReorder={() => {}}
            className="row"
        >
            {tasks.map((task) => (
                <Reorder.Item 
                    key={task.id} 
                    value={task}
                    className="list-container"
                >
                    <TaskItem 
                        task={task}
                        toggleIsCompleted={toggleIsCompleted}
                        handleDeleteTask={handleDeleteTask}
                    />
                </Reorder.Item>
            ))}
        </Reorder.Group>

    );
}

export default TaskItemList;