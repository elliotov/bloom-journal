import { useState } from "react";
import { db } from "./firebase";
import { useAuth } from "./AuthContext";
import { v4 as uuidv4 } from 'uuid';



export default function Dashboard (){
    //const's for ToDo list
    const [toDos, setToDos] =useState([]);
    const [newToDo, setNewToDo] =useState('');
    
    const handleAddToDo = () => {
        if(newToDo.trim() === '') return;
        setToDos([...toDos, { id: uuidv4(), text: newToDo, completed: false}]);
        setNewToDo('');
    };

    const toggleToDo = (id) => {
        const updated = toDos.map((toDo) =>
            toDo.id === id ? {...toDo, completed: !toDo.completed} : toDo
            );
        setToDos(updated);
    };


    //const's for habits
    const [habits, setHabits]= useState([]);
    const [newHabit, setNewHabit] = useState('');
    const today = new Date().toISOString().slice(0,10);

    const handleAddHabit = () => {
        if (newHabit.trim() === '') return;
        setHabits([...habits, {id: uuidv4(), name: newHabit, log: {}}]);
        setNewHabit('');
    };

    const toggleHabit = (index) => {
        const updated = [...habits];
        const habit = updated[index];
        const alreadyCompleted = habit.log?.[today]?.completed || false;

        habit.log[today] = {
            completed: !alreadyCompleted,
            timestamp: !alreadyCompleted ? new Date().toISOString(): null
        };
        setHabits(updated);
    };

    
    
    
    return (
        <div style={{padding: '1rem'}}>
            <h2>To-Do List</h2>
            <form onSubmit={(e) => {e.preventDefault(); handleAddToDo();}}>
                <input
                    type="text"
                    value={newToDo}
                    onChange={(e) => setNewToDo(e.target.value)}
                    placeholder="Add a new task"
                />
                <button type="submit">Add task</button>
            </form>
            <p>{toDos.filter(t => t.completed).length} / {toDos.length} tasks completed</p>
            <ul>
                {[...toDos].sort((a,b) => a.completed - b.completed).map((toDo) => (
                    <li key={toDo.id}>
                        <label style={{textDecoration: toDo.completed ? 'line-through' : 'none'}}>
                            <input
                                type="checkbox"
                                checked={toDo.completed}
                                onChange={() => toggleToDo(toDo.id)}
                            />
                            {toDo.text}
                        </label>
                        <button onClick={() => {
                            const updated = toDos.filter((toDo) => toDo.id !== toDo.id);
                            setToDos(updated);
                        }} style = {{marginLeft: '0.5rem'}}>❌</button>
                    </li>
                ))}
            </ul>



            <h2>Habit Tracker</h2>
            <form onSubmit={(e) => {e.preventDefault(); handleAddHabit();}}>
                <input
                    type="text"
                    value={newHabit}
                    onChange={(e) => setNewHabit(e.target.value)}
                    placeholder="Add a new Habit"
                />
                <button type="submit">Add Habit</button>
            </form>
            <p>{habits.filter(h => h.log?.[today]?.completed).length} / {habits.length} habits done today</p>

            <ul>
            {[...habits]
                .sort((a, b) => {
                    const aDone = a.log?.[today]?.completed || false;
                    const bDone = b.log?.[today]?.completed || false;
                return aDone - bDone;
                })
                .map((habit) => {
                    const log = habit.log?.[today];
                    const isDone = log?.completed || false;
                    const loggedTime = log?.timestamp
                        ? new Date(log.timestamp).toLocaleTimeString([], {hour: '2-digit', minute: '2-digit'})
                        : '';
                return (
                    <li key={habit.id}>
                        <label>
                            <input
                                type="checkbox"
                                checked={isDone}
                                onChange={() => toggleHabit(habit.id)}
                            />
                            <span style={{textDecoration: isDone ? 'line-through' : 'none'}}>
                                {habit.name}
                            </span>
                            {isDone && (
                                <span style={{marginLeft: '0.5rem', fontSize: '0.9rem', color: 'green'}}>
                                    |Done at {loggedTime}|
                                </span>
                            )}
                        </label>
                        <button onClick={() => {
                            const updated = habits.filter((habit) => habit.id !== habit.id);
                            setHabits(updated);
                        }} style = {{marginLeft: '0.5rem'}}>❌</button>
                    </li>
                );
                })}
            </ul>
            <h2>Reading List</h2>
            <p>coming soon...</p>
        </div>
    );   
}