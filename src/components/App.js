import { useState, useEffect } from 'react';
import '../styles/App.css';
import Task from "./Task";
import { fetchTasks, newTask } from "../api";

function App() {
  const [tasks, setTasks] = useState([]);
  const [newTaskData, setNewTaskData] = useState("");

	useEffect(() => {
		(async () => {
         const json = await fetchTasks();
         setTasks(json);
      })();
   }, []);


   // Form submission for new task
   const handleNewTask = async (e) => {
      e.preventDefault();
      e.target.reset();
      const formData = { title: newTaskData, completed: false };
      const json = await newTask(formData);
      setTasks([json, ...tasks]);
   };


	return (
      <div className="App">
         <h1>Todo List</h1>

         <form onSubmit={handleNewTask} className='taskAddForm'>
            <h3>Description</h3>
            <input
               type="text"
               name="title"
               onChange={({ target }) => {
                  setNewTaskData(target.value);
               }}
               placeholder='Type here..'
               required
            />
            <button type="submit">Add Task</button>
         </form>

         <div className="tasks-container">
            {tasks.map((task) => {
               return <Task key={`${task.id}-${task.title}`} task={task} />;
            })}
         </div>
      </div>
   );
}

export default App;
