import { beforeEach } from "vitest";
import {loadTasksFromStorage, TASKS_STORAGE_KEY} from './tasksStorage';
import type { Task } from "../features/tasks/task";

beforeEach(()=>{
    localStorage.clear();
});

describe('taskStorage', ()=>{
    it('Should load data when valid data exists', ()=>{
        const mockTasks: Task[] = [{
            description: 'Buy oat milk',
            isCompleted: false,
            id: '1'
        }];

        localStorage.setItem(TASKS_STORAGE_KEY, JSON.stringify(mockTasks));

        const result = loadTasksFromStorage();

        expect(result).toEqual(mockTasks);
        expect(result).toHaveLength(1);
    });

    it('Should return an empty array if the key does not exist in local storage', ()=>{
        localStorage.removeItem(TASKS_STORAGE_KEY);

        const result = loadTasksFromStorage();
        expect(result).toEqual([]);
    });

    it('Should return an empty array and catch the error if localStorage has invalid JSON data', ()=>{
        localStorage.setItem(TASKS_STORAGE_KEY, 'invalid-json-string{[');

        const result = loadTasksFromStorage();
        expect(result).toEqual([]);
    });

    it('Should return empty array when stored value is empty string', ()=>{
        localStorage.setItem(TASKS_STORAGE_KEY, '');

        const result = loadTasksFromStorage();

        expect(result).toEqual([]);
    });

    it('Should return empty array when JSON is null', ()=>{
        localStorage.setItem(TASKS_STORAGE_KEY, 'null');
        
        const result = loadTasksFromStorage();

        expect(result).toEqual([]);
    });

    it('Should load multiple tasks when valid JSON array is stored', ()=>{
        const mockTasks: Task[] = [
            {description: 'Call mom', isCompleted: false, id: '1'},
            {description: 'Go for a walk', isCompleted: true, id: '2'},
            {description: 'Finish testing', isCompleted: false, id: '3'},
        ];

        localStorage.setItem(TASKS_STORAGE_KEY, JSON.stringify(mockTasks));

        const result = loadTasksFromStorage();

        expect(result).toHaveLength(3);
        expect(result).toEqual(mockTasks);
    });
})