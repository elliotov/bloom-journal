import { useState } from "react";

export default function Dashboard (){
    const [toDos, setToDos] =useState([]);
    const [newToDo, setNewToDo] =useState('');
    
    const handleAdd = () => {
        if(newToDo.trim() === '') return;
        setToDos([...toDos, {text: newToDo, completed: false}]);
        setNewToDo('');
    };

    const toggleComplete = (index) => {
        const updated = [...toDos];
        updated[index].completed = !updated[index].completed;
        setToDos(updated);
    };
    return (
        <div style={{padding: '1rem'}}>
            <h2>To-Do List</h2>
            <input
                type="text"
                value={newToDo}
                onChange={(e) => setNewToDo(e.target.value)}
                placeholder="Add a new task"
            />
            <button onClick={handleAdd}>Add task</button>
            <ul>
                {toDos.map((toDo,i) => (
                    <li key={i}>
                        <label style={{textDecoration: toDo.completed ? 'line-through' : 'none'}}>
                            <input
                                type="checkbox"
                                checked={toDo.completed}
                                onChange={() => toggleComplete(i)}
                            />
                            {toDo.text}
                        </label>
                    </li>
                ))}
            </ul>

            <h2>Habbit Tracker</h2>
            <p>coming soon...</p>

            <h2>Reading List</h2>
            <p>coming soon...</p>
        </div>
    );
}