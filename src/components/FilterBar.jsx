function FilterBar({
  search,
  onSearchChange,
  statusFilter,
  onStatusChange,
  priorityFilter,
  onPriorityChange,
  sortBy,
  onSortChange,
  taskCounts,
}) {
  const tabs = [
    { key: 'all', label: 'Semua', count: taskCounts.all },
    { key: 'active', label: 'Aktif', count: taskCounts.active },
    { key: 'completed', label: 'Selesai', count: taskCounts.completed },
  ]

  return (
    <div className="card tf-filterbar mb-4">
      <div className="card-body p-3">
        <div className="tf-search-wrapper mb-3">
          <i className="bi bi-search tf-search-icon" aria-hidden="true" />
          <input
            type="search"
            className="form-control"
            placeholder="Cari tugas berdasarkan judul atau deskripsi..."
            value={search}
            onChange={(e) => onSearchChange(e.target.value)}
            aria-label="Cari tugas"
          />
          {search && (
            <button
              type="button"
              className="tf-search-clear text-body-secondary"
              onClick={() => onSearchChange('')}
              aria-label="Hapus pencarian"
            >
              <i className="bi bi-x-circle-fill" />
            </button>
          )}
        </div>

        <div className="d-flex flex-wrap align-items-center justify-content-between gap-2">
          <ul className="nav nav-pills tf-filter-tabs flex-nowrap" role="tablist">
            {tabs.map(({ key, label, count }) => (
              <li className="nav-item" key={key} role="presentation">
                <button
                  type="button"
                  role="tab"
                  aria-selected={statusFilter === key}
                  className={`nav-link d-flex align-items-center gap-1 ${
                    statusFilter === key ? 'active' : 'text-body-secondary'
                  }`}
                  onClick={() => onStatusChange(key)}
                >
                  <span>{label}</span>
                  <span
                    className={`badge rounded-pill ms-1 ${
                      statusFilter === key
                        ? 'bg-light text-dark'
                        : 'bg-secondary bg-opacity-25 text-body'
                    }`}
                    style={{ fontSize: '0.7rem' }}
                  >
                    {count}
                  </span>
                </button>
              </li>
            ))}
          </ul>

          <div className="d-flex align-items-center gap-2 ms-auto flex-wrap">
            <div className="d-flex align-items-center gap-1">
              <label
                htmlFor="prioritySelect"
                className="text-body-secondary"
                style={{ fontSize: '0.8rem', whiteSpace: 'nowrap' }}
              >
                <i className="bi bi-flag me-1" />
                Prioritas:
              </label>
              <select
                id="prioritySelect"
                className="form-select form-select-sm"
                style={{ width: 'auto' }}
                value={priorityFilter}
                onChange={(e) => onPriorityChange(e.target.value)}
                aria-label="Filter berdasarkan prioritas"
              >
                <option value="all">Semua Prioritas</option>
                <option value="high">Tinggi</option>
                <option value="medium">Sedang</option>
                <option value="low">Rendah</option>
              </select>
            </div>

            <div className="d-flex align-items-center gap-1">
              <label
                htmlFor="sortSelect"
                className="text-body-secondary"
                style={{ fontSize: '0.8rem', whiteSpace: 'nowrap' }}
              >
                <i className="bi bi-arrow-down-up me-1" />
                Urutkan:
              </label>
              <select
                id="sortSelect"
                className="form-select form-select-sm"
                style={{ width: 'auto' }}
                value={sortBy}
                onChange={(e) => onSortChange(e.target.value)}
                aria-label="Urutkan tugas berdasarkan"
              >
                <option value="createdAt">Tanggal Dibuat</option>
                <option value="dueDate">Tenggat Waktu</option>
                <option value="priority">Prioritas</option>
              </select>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default FilterBar
