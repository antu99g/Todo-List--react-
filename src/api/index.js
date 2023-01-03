// API call for fetching tasks
export async function fetchTasks () {
   const response = await fetch("https://jsonplaceholder.typicode.com/todos?userId=1");
   const json = await response.json();
   return json;
}


// API call for adding new task
export async function newTask (formBody) {
   const response = await fetch("https://jsonplaceholder.typicode.com/posts", {
      method: "POST",
      body: JSON.stringify(formBody),
      headers: {
         "Content-type": "application/json; charset=UTF-8",
      },
   });
   const json = await response.json();
   return json;
}


// API call for deleting a task
export function deleteTask(id) {
   fetch(`https://jsonplaceholder.typicode.com/posts/${id}`, {
      method: "DELETE",
   });
}


// API call for editing a task
export function editTask(id, title) {
   fetch(`https://jsonplaceholder.typicode.com/posts/${id}`, {
      method: "PUT",
      body: JSON.stringify(title),
      headers: {
         "Content-type": "application/json; charset=UTF-8",
      },
   });
}