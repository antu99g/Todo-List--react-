import { useState, useEffect } from 'react';
import '../styles/App.css';
import Task from "../components/Task";
import { fetchTasks, newTask } from "../api";

function App () {
   const [tasks, setTasks] = useState([]);
   const [newTaskData, setNewTaskData] = useState("");

   useEffect(() => {
      (async () => {
         const response = await fetchTasks();
         setTasks(response);
      })();
   }, []);


   // Form submission for new task
   const handleNewTask = async (e) => {
      e.preventDefault();
      e.target.reset();
      const formData = { title: newTaskData, completed: false };
      const response = await newTask(formData);
      setTasks([...tasks, response]);
   };


   return (
      <div className="App">
         <h1>Todo List</h1>

         <form onSubmit={handleNewTask} className="taskAddForm">
            <h3>Description</h3>
            <input
               type="text"
               name="title"
               onChange={(e) => setNewTaskData(e.target.value)}
               placeholder="Type here.."
               required
            />
            <button type="submit">Add Task</button>
         </form>

         <div className="tasks-container">
            {tasks.map((task, index) => {
               return <Task task={task} key={index} />;
            })}
         </div>
      </div>
   );
}

export default App;