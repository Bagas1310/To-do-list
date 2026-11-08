function getDueStatus(dueDateStr) {
  if (!dueDateStr) return null

  const today = new Date()
  today.setHours(0, 0, 0, 0)

  const [y, m, d] = dueDateStr.split('-').map(Number)
  const due = new Date(y, m - 1, d)
  const diffDays = Math.round((due - today) / (1000 * 60 * 60 * 24))

  if (diffDays < 0) {
    return {
      label: `Terlewat ${Math.abs(diffDays)} hari`,
      cls: 'tf-due-overdue',
      icon: 'bi-exclamation-triangle-fill',
    }
  } else if (diffDays === 0) {
    return {
      label: 'Hari ini',
      cls: 'tf-due-today',
      icon: 'bi-clock-fill',
    }
  } else if (diffDays === 1) {
    return {
      label: 'Besok',
      cls: 'tf-due-normal',
      icon: 'bi-calendar-event',
    }
  } else {
    return {
      label: `${diffDays} hari lagi`,
      cls: 'tf-due-normal',
      icon: 'bi-calendar-event',
    }
  }
}

const PRIORITY_BADGES = {
  high: { label: 'Tinggi', cls: 'tf-priority-high' },
  medium: { label: 'Sedang', cls: 'tf-priority-medium' },
  low: { label: 'Rendah', cls: 'tf-priority-low' },
}

function TaskItem({ task, onToggleComplete, onEdit, onDelete }) {
  const { id, title, description, category, priority, dueDate, completed } = task
  const dueStatus = getDueStatus(dueDate)
  const priorityInfo = PRIORITY_BADGES[priority] || PRIORITY_BADGES.medium

  return (
    <article
      className={`card tf-task-card mb-2 ${completed ? 'completed-card' : ''}`}
      aria-label={`Tugas: ${title}`}
    >
      <div className="card-body p-3">
        <div className="d-flex align-items-start gap-3">
          <div className="pt-1">
            <input
              type="checkbox"
              className="form-check-input tf-checkbox"
              checked={completed}
              onChange={() => onToggleComplete(id)}
              aria-label={`Tandai "${title}" sebagai ${completed ? 'belum selesai' : 'selesai'}`}
              title={`Tandai sebagai ${completed ? 'belum selesai' : 'selesai'}`}
            />
          </div>

          <div className="flex-grow-1 min-w-0">
            <div className={`tf-task-title mb-1 ${completed ? 'completed-text' : 'text-body-emphasis'}`}>
              {title}
            </div>

            {description && (
              <p className="tf-task-desc text-body-secondary mb-2">
                {description}
              </p>
            )}

            <div className="d-flex flex-wrap align-items-center gap-2">
              {category && (
                <span className="badge bg-secondary bg-opacity-10 text-body border" style={{ fontSize: '0.72rem' }}>
                  <i className="bi bi-tag me-1" />
                  {category}
                </span>
              )}

              <span className={`badge ${priorityInfo.cls}`} style={{ fontSize: '0.72rem' }}>
                <i className="bi bi-flag-fill me-1" />
                {priorityInfo.label}
              </span>

              {dueStatus && (
                <span className={`tf-due-badge d-inline-flex align-items-center gap-1 ${dueStatus.cls}`}>
                  <i className={`bi ${dueStatus.icon}`} />
                  <span>{dueStatus.label}</span>
                </span>
              )}
            </div>
          </div>

          <div className="d-flex align-items-center gap-1 ms-2 flex-shrink-0">
            <button
              type="button"
              className="btn btn-sm btn-outline-secondary d-flex align-items-center justify-content-center p-1 px-2"
              onClick={() => onEdit(task)}
              aria-label={`Edit tugas "${title}"`}
              title="Edit tugas"
            >
              <i className="bi bi-pencil" />
            </button>

            <button
              type="button"
              className="btn btn-sm btn-outline-danger d-flex align-items-center justify-content-center p-1 px-2"
              onClick={() => onDelete(task)}
              aria-label={`Hapus tugas "${title}"`}
              title="Hapus tugas"
            >
              <i className="bi bi-trash3" />
            </button>
          </div>
        </div>
      </div>
    </article>
  )
}

export default TaskItem
