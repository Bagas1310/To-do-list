import TaskItem from './TaskItem'

function TaskList({ tasks, onToggleComplete, onEdit, onDelete, totalTasksCount, onResetFilters }) {
  if (tasks.length === 0) {
    const isFiltered = totalTasksCount > 0

    return (
      <div className="card border-0 shadow-sm rounded-3 py-5 text-center">
        <div className="card-body">
          <div className="text-secondary opacity-50 mb-3">
            <i className={`bi ${isFiltered ? 'bi-search' : 'bi-clipboard2-check'} display-3`} />
          </div>
          <h3 className="fs-5 fw-semibold mb-1">
            {isFiltered ? 'Tidak ada tugas yang cocok' : 'Belum ada tugas'}
          </h3>
          <p className="text-body-secondary small mb-3">
            {isFiltered
              ? 'Coba sesuaikan kata kunci pencarian atau kriteria filter Anda.'
              : 'Tambahkan tugas pertama Anda di atas untuk memulai hari yang produktif.'}
          </p>
          {isFiltered && (
            <button
              type="button"
              className="btn btn-sm btn-outline-primary"
              onClick={onResetFilters}
            >
              Reset semua filter
            </button>
          )}
        </div>
      </div>
    )
  }

  return (
    <div className="tf-task-list" role="list" aria-label="Daftar tugas">
      {tasks.map((task) => (
        <TaskItem
          key={task.id}
          task={task}
          onToggleComplete={onToggleComplete}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </div>
  )
}

export default TaskList
