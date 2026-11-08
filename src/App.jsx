import { useState, useMemo, useEffect } from 'react'
import { v4 as uuidv4 } from 'uuid'
import useLocalStorage from './hooks/useLocalStorage'
import Header from './components/Header'
import StatsSummary from './components/StatsSummary'
import TaskForm from './components/TaskForm'
import FilterBar from './components/FilterBar'
import TaskList from './components/TaskList'
import DeleteModal from './components/DeleteModal'

const today = new Date().toISOString().split('T')[0]
const tomorrow = new Date(Date.now() + 86400000).toISOString().split('T')[0]
const threeDay = new Date(Date.now() + 86400000 * 3).toISOString().split('T')[0]
const fiveDay = new Date(Date.now() + 86400000 * 5).toISOString().split('T')[0]

const INITIAL_TASKS = [
  {
    id: 'mock-1',
    title: 'Selesaikan Arsitektur Proyek',
    description: 'Pastikan struktur folder modular, praktik kode bersih, dan integrasi Bootstrap 5.3.',
    category: 'Pekerjaan',
    priority: 'high',
    dueDate: tomorrow,
    completed: false,
    createdAt: new Date(Date.now() - 3600000 * 5).toISOString(),
  },
  {
    id: 'mock-2',
    title: 'Desain Palet Tema Mode Gelap',
    description: 'Sesuaikan warna teks kontras tinggi dan kartu permukaan untuk aksesibilitas optimal.',
    category: 'Pekerjaan',
    priority: 'medium',
    dueDate: today,
    completed: true,
    createdAt: new Date(Date.now() - 3600000 * 24).toISOString(),
  },
  {
    id: 'mock-3',
    title: 'Belanja Groceries dan Siapkan Makanan',
    description: 'Ambil sayuran segar, minyak zaitun, dan siapkan makan siang untuk minggu depan.',
    category: 'Pribadi',
    priority: 'low',
    dueDate: threeDay,
    completed: false,
    createdAt: new Date(Date.now() - 3600000 * 12).toISOString(),
  },
  {
    id: 'mock-4',
    title: 'Review Ulang Fitur CRUD',
    description: 'Pastikan semua operasi Create, Read, Update, Delete berfungsi sempurna tanpa bug.',
    category: 'Pekerjaan',
    priority: 'high',
    dueDate: tomorrow,
    completed: false,
    createdAt: new Date(Date.now() - 3600000 * 2).toISOString(),
  },
  {
    id: 'mock-5',
    title: 'Olahraga dan Kesehatan',
    description: 'Lari pagi 5 km dan sesi latihan kekuatan.',
    category: 'Kesehatan',
    priority: 'medium',
    dueDate: today,
    completed: false,
    createdAt: new Date(Date.now() - 3600000 * 8).toISOString(),
  },
]

function App() {
  const [theme, setTheme] = useLocalStorage('taskflow_theme', 'light')
  const [tasks, setTasks] = useLocalStorage('taskflow_tasks', INITIAL_TASKS)
  const [editingTask, setEditingTask] = useState(null)
  const [taskToDelete, setTaskToDelete] = useState(null)
  const [search, setSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const [priorityFilter, setPriorityFilter] = useState('all')
  const [sortBy, setSortBy] = useState('createdAt')

  useEffect(() => {
    document.documentElement.setAttribute('data-bs-theme', theme)
  }, [theme])

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'))
  }

  const handleSaveTask = (taskData) => {
    if (taskData.id) {
      setTasks((prev) =>
        prev.map((t) => (t.id === taskData.id ? { ...t, ...taskData } : t))
      )
      setEditingTask(null)
    } else {
      const newTask = {
        ...taskData,
        id: uuidv4(),
      }
      setTasks((prev) => [newTask, ...prev])
    }
  }

  const handleToggleComplete = (id) => {
    setTasks((prev) =>
      prev.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t))
    )
  }

  const handleRequestDelete = (task) => {
    setTaskToDelete(task)
  }

  const handleConfirmDelete = () => {
    if (!taskToDelete) return
    setTasks((prev) => prev.filter((t) => t.id !== taskToDelete.id))
    if (editingTask && editingTask.id === taskToDelete.id) {
      setEditingTask(null)
    }
    setTaskToDelete(null)
  }

  const handleCancelDelete = () => {
    setTaskToDelete(null)
  }

  const handleStartEdit = (task) => {
    setEditingTask(task)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const handleCancelEdit = () => {
    setEditingTask(null)
  }

  const handleResetFilters = () => {
    setSearch('')
    setStatusFilter('all')
    setPriorityFilter('all')
    setSortBy('createdAt')
  }

  const filteredTasks = useMemo(() => {
    let result = [...tasks]

    if (search.trim()) {
      const q = search.trim().toLowerCase()
      result = result.filter(
        (t) =>
          t.title.toLowerCase().includes(q) ||
          (t.description && t.description.toLowerCase().includes(q))
      )
    }

    if (statusFilter === 'active') {
      result = result.filter((t) => !t.completed)
    } else if (statusFilter === 'completed') {
      result = result.filter((t) => t.completed)
    }

    if (priorityFilter !== 'all') {
      result = result.filter((t) => t.priority === priorityFilter)
    }

    const priorityWeights = { high: 3, medium: 2, low: 1 }

    result.sort((a, b) => {
      if (sortBy === 'priority') {
        const weightA = priorityWeights[a.priority] || 0
        const weightB = priorityWeights[b.priority] || 0
        return weightB - weightA
      }

      if (sortBy === 'dueDate') {
        if (!a.dueDate) return 1
        if (!b.dueDate) return -1
        return new Date(a.dueDate) - new Date(b.dueDate)
      }

      return new Date(b.createdAt) - new Date(a.createdAt)
    })

    return result
  }, [tasks, search, statusFilter, priorityFilter, sortBy])

  const taskCounts = useMemo(() => {
    return {
      all: tasks.length,
      active: tasks.filter((t) => !t.completed).length,
      completed: tasks.filter((t) => t.completed).length,
    }
  }, [tasks])

  return (
    <div className="d-flex flex-column min-vh-100">
      <Header theme={theme} onThemeToggle={toggleTheme} />

      <main className="tf-main flex-grow-1">
        <div className="container-xl">
          <StatsSummary tasks={tasks} />

          <div className="row g-4">
            <div className="col-12 col-lg-5">
              <div className="sticky-lg-top" style={{ top: '5.5rem' }}>
                <TaskForm
                  onSave={handleSaveTask}
                  editingTask={editingTask}
                  onCancelEdit={handleCancelEdit}
                />
              </div>
            </div>

            <div className="col-12 col-lg-7">
              <FilterBar
                search={search}
                onSearchChange={setSearch}
                statusFilter={statusFilter}
                onStatusChange={setStatusFilter}
                priorityFilter={priorityFilter}
                onPriorityChange={setPriorityFilter}
                sortBy={sortBy}
                onSortChange={setSortBy}
                taskCounts={taskCounts}
              />

              <TaskList
                tasks={filteredTasks}
                onToggleComplete={handleToggleComplete}
                onEdit={handleStartEdit}
                onDelete={handleRequestDelete}
                totalTasksCount={tasks.length}
                onResetFilters={handleResetFilters}
              />
            </div>
          </div>
        </div>
      </main>

      <DeleteModal
        task={taskToDelete}
        onConfirm={handleConfirmDelete}
        onCancel={handleCancelDelete}
      />

      <footer className="py-3 border-top text-center text-body-secondary small mt-auto">
        <div className="container-xl">
          <span>TaskFlow &bull; Dibangun dengan React &amp; Bootstrap 5.3</span>
        </div>
      </footer>
    </div>
  )
}

export default App
