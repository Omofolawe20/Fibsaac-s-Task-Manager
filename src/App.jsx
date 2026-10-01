import'./App.css'
import { useState, useEffect } from 'react'

function App() {
  const [task, setTask] = useState('')
  const [editingId, setEditingId] = useState(null)
  const [filter, setFilter] = useState('all')
  const [tasks, setTasks] = useState(() => {
    const saved = localStorage.getItem('tasks')
    return saved ? JSON.parse(saved) : []
  })

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks))
  }, [tasks])

 const addTask = () => {
  if (task.trim() === '') return

  const newTask = {
    id: Date.now(),
    text: task.trim(),
    completed: false,
  }

  setTasks([...tasks, newTask])
  setTask('')
}

const deleteTask = (idToDelete) => {
  setTasks(tasks.filter((item) => item.id !== idToDelete))
}

const clearCompleted = () => {
  setTasks(tasks.filter((item) => !item.completed))
}

const toggleTask = (idToToggle) => {
  setTasks(
    tasks.map((item) =>
      item.id === idToToggle
        ? { ...item, completed: !item.completed }
        : item
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
