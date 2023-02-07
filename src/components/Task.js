import { useState, useRef } from 'react';
// Fetch APIs
import { deleteTask, editTask } from "../api";

function Task ({task}) {
   // State for checkbox status
   const [taskDone, setTaskDone] = useState(false);
   // State for hiding a task (after deleting)
   const [hideTask, setHideTask] = useState(false);
   // State for editing a task
   const [taskTitle, setTaskTitle] = useState(task.title);
   // State for hiding edit-button when a task is done
   const [editingTitle, setEditingTitle] = useState(false);

   // Input field to edit a task
   const editInputRef = useRef(null);


   // Function for checkbox click
   const handleCheckboxClick = (e) => {
      setTaskDone(e.target.checked);
      const body = { completed: !(task.completed) };
      editTask(task.id, body);
   };


   // Function for deleting a task
   const handleDeleteTask = (id) => {
      setHideTask(true);
      deleteTask(id);
   }


   // Function for editing a task
   const handleEditTask = (id) => {
      if(editInputRef.current.value === ''){
         setEditingTitle(false);
         return;
      }
      setTaskTitle(editInputRef.current.value);
      const body = {title: taskTitle};
      editTask(id, body);
   }


   return (
      <div className={`task ${taskDone && "taskdone"} ${hideTask && "hidden"}`}>
         <input type="checkbox" onClick={handleCheckboxClick} />

         <span>
            <h4>Task</h4>

            {!taskDone && (
               <img
                  src={
                     editingTitle
                        ? "https://cdn-icons-png.flaticon.com/512/1632/1632708.png"
                        : "https://cdn-icons-png.flaticon.com/512/1828/1828270.png"
                  }
                  alt="edit"
                  className={editingTitle ? "editCross" : "editBtn"}
                  onClick={() => setEditingTitle(!editingTitle)}
               />
            )}

            {editingTitle ? (
               <div className="editTaskInput">
                  <input
                     type="text"
                     ref={editInputRef}
                     placeholder="Type here"
                  />
                  <button
                     onClick={() => {
                        handleEditTask(task.id);
                     }}
                  >
                     Save
                  </button>
               </div>
            ) : (
               <p>{taskTitle}</p>
            )}
         </span>

         <img
            src="https://cdn-icons-png.flaticon.com/512/8995/8995303.png"
            alt="delete"
            className="deleteBtn"
            onClick={() => {
               handleDeleteTask(task.id);
            }}
         />
      </div>
   );
}

export default Task;