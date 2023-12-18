import React, { useState } from 'react';
import Header from './Header';
import   './App.css' 


const App = () => {
    const [toDos, setToDos] = useState(() => {
        const storedToDos = localStorage.getItem('toDos');
        return storedToDos ? JSON.parse(storedToDos) : [];
       });
 const [task, setTask] = useState('');
 const [description, setDescription] = useState('');
 const [filter, setFilter] = useState('all');


 const saveToDos = () => {
    localStorage.setItem('toDos', JSON.stringify(toDos));
   };  


 const handleSubmit = (e) => {
    e.preventDefault();
    if (task !== '' && description !== '') {
      setToDos([...toDos, { task, description }]);
      setTask('');
      setDescription('');
    }
 };

 const handleFilterChange = (e) => {
    setFilter(e.target.value);
 };

 const handleDelete = (index) => {
    let newToDos = [...toDos];
    newToDos.splice(index, 1);
    setToDos(newToDos);
    saveToDos();
 };

 const handleEdit = (index) => {
    const updatedTask = prompt('Enter updated task name');
    const updatedDescription = prompt('Enter updated description');
    if (updatedTask !== '' && updatedDescription !== '') {
      const newToDos = [...toDos];
      newToDos[index] = { task: updatedTask, description: updatedDescription };
      setToDos(newToDos);
      saveToDos();
    }
 };


 const handleComplete = (todo) => {
    setToDos(
      toDos.map((index) => {
        if (index.task === todo.task) {
          return { ...index, completed: !index.completed };
        }
        return index;
      })
    );
    saveToDos();
 };

 const visibleToDos = toDos.filter((todo) => {
    if (filter === 'all') {
      return true;
    } else if (filter === 'completed') {
      return todo.completed;
    } else if (filter === 'uncompleted') {
      return !todo.completed;
    }
 });

 return (
    <div>
      <Header/>
      <form onSubmit={handleSubmit} id='formItem'>
        <input id='inputBox1'
          type="text"
          placeholder="Task"
          value={task}
          onChange={(e) => setTask(e.target.value)}
        />
        <br />
        <input id='inputBox2'
          type="text"
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        /><br />
        <button id='submitBtn' type="submit">Add Task</button>
      </form>
      <br />
      <div id='filterItems'>
      <label >Status Filter</label>
      <select value={filter} onChange={handleFilterChange} >
        <option value="all">All</option>
        <option value="completed">Completed</option>
        <option value="uncompleted">Uncompleted</option>
      </select>
      </div>
      
      <div className='listItems'>
        {visibleToDos.map((todo, index) => (
          <div key={index}className='taskItems'>
            <h3>{todo.task}</h3>
            <p>{todo.description}</p>
            <button className="btnItems"onClick={() => handleDelete(index)}>Delete</button>
            <button className="btnItems"onClick={() => handleEdit(index)}>Edit</button>
            <button className="btnItems"onClick={() => handleComplete(todo)}>
              {todo.completed ? 'Completed' : 'Mark as Completed'}
            </button>
            
          </div>
        ))}
      </div>
    </div>
 );
};

export default App;



