import React from 'react';
import type { SyntheticEvent } from 'react';
import { useState } from "react";

interface InputProps{
    addTodo: (text: string) => void;
}
function Input({addTodo}: InputProps){
    const [description, setDescription] = useState("");
    const handleSubmit = (e: SyntheticEvent) => {
        e.preventDefault();
        addTodo(description);
        setDescription("");
    };
    return(
        <form >
            <div>
                <input type="text" 
                value={description}
                onChange={(e) => setDescription(e.target.value)}>
                </input>
                <button type="submit" onClick={handleSubmit}>Add task</button>
            </div>
        </form>
        
    )
}

export default Input;