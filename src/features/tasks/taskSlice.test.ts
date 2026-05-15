import type { Task } from './task';
import { tasksReducer, addTask, toggleTaskCompleted, deleteTask } from './tasksSlice';

describe('taskSlice', ()=>{

    it('Should add a task when given a valid string', ()=>{
        const initialState: Task[] = [];

        const snapshot = structuredClone(initialState);
        const nextState = tasksReducer(initialState, addTask('Buy oat milk'));
        
        expect(nextState).not.toEqual(initialState);
        expect(nextState).toHaveLength(1);
        expect(nextState[0].description).toBe('Buy oat milk');
        expect(nextState[0].isCompleted).toBe(false);
        expect(initialState).toEqual(snapshot);
        expect(initialState).toHaveLength(0);
    });

    it('Should reject empty or white space - only add strings', ()=>{
        const initialState: Task[] = [];

        const stateAfterEmpty = tasksReducer(initialState, addTask(''));
        expect(stateAfterEmpty).toHaveLength(0);

        const stateAfterSpaces = tasksReducer(initialState, addTask('     '));
        expect(stateAfterSpaces).toHaveLength(0);
    });

    it('Should toggle a task status from incomplete to complete', ()=>{
        const initialState: Task[] = [{
            description: 'Buy oat milk',
            isCompleted: false,
            id: '123',
        }];

        const snapshot = structuredClone(initialState);

        const nextState = tasksReducer(initialState, toggleTaskCompleted('123'));
        expect(nextState[0].isCompleted).toBe(true);

        expect(initialState).toEqual(snapshot);
        expect(initialState[0].isCompleted).toBe(false);
    });

    it('Should remove task by its unique id identifier', ()=>{
        const initialState: Task[] = [
            { id: '1', description: 'Keep me', isCompleted: false },
            { id: '2', description: 'Remove me', isCompleted: false }
        ];

        const snapshot = structuredClone(initialState);
        const nextState = tasksReducer(initialState, deleteTask('2'));
        
        expect(nextState).toHaveLength(1);
        expect(nextState[0].id).toBe('1');
        expect(initialState).toEqual(snapshot);
        expect(initialState).toHaveLength(2);
    });
});
