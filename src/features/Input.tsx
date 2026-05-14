import React from 'react';
import { useState } from "react";
import '../App.scss';

interface InputProps{
    addTodo: (text: string) => void;
}
function Input({addTodo}: InputProps){
    const [description, setDescription] = useState("");
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const trimmed = description.trim();
        if (!trimmed) return;
        addTodo(trimmed);
        setDescription("");
    };
    return(
        <form className="input-group" onSubmit={handleSubmit}>
            <input
              className="input"
              type="text"
              placeholder="Start writing and press enter to create task"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
            <button className="button-submit" type="submit" aria-label="Add task">
              ↵
            </button>
        </form>
        
    )
}

export default Input;