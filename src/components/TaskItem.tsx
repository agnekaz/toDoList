import type { Task } from './task';
import '../App.scss';

interface TaskItemProps{
    task: Task;
    toggleIsCompleted: (id: string) => void;
    handleDeleteTask: (id: string) => void;
}
function TaskItem({task, toggleIsCompleted, handleDeleteTask}: TaskItemProps){
    return(
        <div className="task-conatiner">
            <div className="task-description">
                <input type="checkbox"
                className="isCompleted"
                checked={task.isCompleted}
                onChange={() => toggleIsCompleted(task.id)}
                />
                <span className="discription">{task.description}</span>
                <button className="button-delete"
                    onClick={() => handleDeleteTask(task.id)}>
                    <span className="fa fa-remove"></span>
                </button>
            </div>
        </div>
    );
}

export default TaskItem;