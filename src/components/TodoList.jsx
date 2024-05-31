import React, { useState, useEffect } from 'react';
import '../App.css';

const TodoList = () => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');
  const [taskDate, setTaskDate] = useState('');
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    const storedTasks = JSON.parse(localStorage.getItem('tasks'));
    if (storedTasks) {
      setTasks(storedTasks);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  const handleAddTask = () => {
    if (newTask.trim() === '') {
      alert('Task cannot be empty');
      return;
    }
    if (taskDate === '') {
      alert('Please select a date');
      return;
    }
    const task = {
      id: Date.now(),
      text: newTask.trim(),
      completed: false,
      date: taskDate,
    };
    setTasks([...tasks, task]);
    setNewTask('');
    setTaskDate('');
  };

  const handleRemoveTask = (id) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  const handleToggleCompletion = (id) => {
    setTasks(tasks.map(task => task.id === id ? { ...task, completed: !task.completed } : task));
  };

  const handleRegenerateTasks = () => {
    setTasks([]);
    localStorage.removeItem('tasks');
  };

  const filteredTasks = tasks.filter(task => {
    if (filter === 'completed') return task.completed;
    if (filter === 'active') return !task.completed;
    return true;
  });

  return (
    <div className="todo-list">
      <h1>Todo List</h1>
      <input
        type="text"
        value={newTask}
        onChange={(e) => setNewTask(e.target.value)}
        placeholder="Add a new task"
        className="todo-input"
      />
      <input
        type="date"
        value={taskDate}
        onChange={(e) => setTaskDate(e.target.value)}
        className="todo-input"
      />
      <button onClick={handleAddTask} className="todo-button add">Add Task</button>
      <button onClick={handleRegenerateTasks} className="todo-button regenerate">Regenerate Tasks</button>
      <div className="filter-buttons">
        <button onClick={() => setFilter('all')} className="todo-button filter">All</button>
        <button onClick={() => setFilter('active')} className="todo-button filter">Active</button>
        <button onClick={() => setFilter('completed')} className="todo-button filter">Completed</button>
      </div>
      <ul className="task-list">
        {filteredTasks.map(task => (
          <li key={task.id} className={`task-item ${task.completed ? 'completed' : ''}`}>
            <span onClick={() => handleToggleCompletion(task.id)} className="task-text">{task.text}</span>
            <span className="task-date">{task.date}</span>
            <button onClick={() => handleRemoveTask(task.id)} className="todo-button remove">Remove</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TodoList;
