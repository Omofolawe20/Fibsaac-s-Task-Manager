import'./App.css'
import { useState, useEffect } from 'react'

function App() {
  const [task, setTask] = useState('')
  const [editingId, setEditingId] = useState(null)
  const [filter, setFilter] = useState('all')
const [tasks, setTasks] = useState([])

  const fetchTasks = async () => {
  const response = await fetch('http://127.0.0.1:5000/tasks')
  const data = await response.json()

  setTasks(data.tasks)
}

useEffect(() => {
  fetchTasks()
}, [])

const addTask = async () => {
  if (task.trim() === '') return

  const response = await fetch('http://127.0.0.1:5000/tasks', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      text: task.trim(),
    }),
  })

  const newTask = await response.json()

  setTasks([...tasks, newTask])
  setTask('')
}
const deleteTask = async (idToDelete) => {
  const response = await fetch(`http://127.0.0.1:5000/tasks/${idToDelete}`, {
    method: 'DELETE',
  })

  const data = await response.json()

  console.log(data)

  setTasks(tasks.filter((item) => item.id !== idToDelete))
}
const clearCompleted = async () => {
  const done = tasks.filter((t) => t.completed)
  await Promise.all(
    done.map((t) =>
      fetch(`http://127.0.0.1:5000/tasks/${t.id}`, { method: 'DELETE' })
    )
  )
  setTasks(tasks.filter((t) => !t.completed))
}

const toggleTask = async (idToToggle) => {
  const taskToUpdate = tasks.find((item) => item.id === idToToggle)

  const response = await fetch(`http://127.0.0.1:5000/tasks/${idToToggle}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      completed: !taskToUpdate.completed,
    }),
  })

  const updatedTask = await response.json()

  setTasks(
    tasks.map((item) =>
      item.id === idToToggle ? updatedTask : item
    )
  )
}

const editTask = (idToEdit, newText) => {
  
  setTasks(
    tasks.map((item) =>
      item.id === idToEdit
        ? { ...item, text: newText }
        : item
    )
  )
}

const startEditing = (id) => {
  setEditingId(id)
}

const cancelEditing = () => {
  setEditingId(null)
}

const saveEdit = async (id) => {
  const item = tasks.find((t) => t.id === id)
  const response = await fetch(`http://127.0.0.1:5000/tasks/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ text: item.text }),
  })
  const updated = await response.json()
  setTasks(tasks.map((t) => (t.id === id ? updated : t)))
  setEditingId(null)
}

  const filteredTasks = tasks.filter((item) => {
  if (filter === 'active') return !item.completed
  if (filter === 'completed') return item.completed
  return true
})

const activeTasks = tasks.filter((item) => !item.completed).length

  return (
    <div className="app">
     <h1>Fibsaac's Task Manager</h1>
      <p>Keep track of your tasks and stay organized.</p>

      <div className="task-input">
        <input
  type="text"
  placeholder="Enter a task..."
  value={task}
  onChange={(e) => setTask(e.target.value)}
  onKeyDown={(e) => {
    if (e.key === 'Enter') {
      addTask()
    }
  }}
/>
        <button onClick={addTask}>Add Task</button>
      </div>

      <div className="tasks">
        <h2>Your Tasks ({tasks.length})</h2>
<p className="task-count">
  {activeTasks} active task{activeTasks !== 1 ? 's' : ''}
</p>
       <div className="filters">
  <button
    className={filter === 'all' ? 'active-filter' : ''}
    onClick={() => setFilter('all')}
  >
    All
  </button>

  <button
    className={filter === 'active' ? 'active-filter' : ''}
    onClick={() => setFilter('active')}
  >
    Active
  </button>

  <button
    className={filter === 'completed' ? 'active-filter' : ''}
    onClick={() => setFilter('completed')}
  >
    Completed
  </button>

  <button
  onClick={clearCompleted}
  disabled={!tasks.some((item) => item.completed)}
>
  Clear Completed
</button>

  
</div>

        {tasks.length === 0 ? (
  <p className="empty-message">No tasks here yet.</p>
) : filteredTasks.length === 0 ? (
  <p className="empty-message">
    No {filter} tasks found.
  </p>
) : (
  <ul>

            {filteredTasks.map((item, index) => (
              <li key={item.id}>
                <div className="task-details">

  {editingId === item.id ? (
  <input
  type="text"
  value={item.text}
  onChange={(e) => editTask(item.id, e.target.value)}
  onKeyDown={(e) => {
    if (e.key === 'Enter') {
      setEditingId(null)
    }
  }}
/>
) : (
  <span
    style={{
      textDecoration: item.completed ? 'line-through' : 'none',
    }}
  >
    {item.text}
  </span>
)}


  <small>ID: {item.id}</small>
</div>
  

<div>
   
  {editingId === item.id ? (
  <>
    <button onClick={() => setEditingId(null)}>
      Save
    </button>

    <button onClick={cancelEditing}>
      Cancel
    </button>
  </>
) : (
  <button onClick={() => startEditing(item.id)}>
    Edit
  </button>
)}

<button onClick={() => toggleTask(item.id)}>
  {item.completed ? 'Undo' : 'Complete'}
</button>

<button onClick={() => deleteTask(item.id)}>
  Delete
</button>

</div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  )
}

export default App
