function StatsSummary({ tasks }) {
  const total = tasks.length
  const completed = tasks.filter((t) => t.completed).length
  const pending = total - completed
  const pct = total === 0 ? 0 : Math.round((completed / total) * 100)

  const stats = [
    {
      label: 'Total Tugas',
      value: total,
      icon: 'bi-list-task',
      iconBg: 'bg-primary bg-opacity-10',
      iconColor: 'text-primary',
      valueCls: 'text-primary',
    },
    {
      label: 'Belum Selesai',
      value: pending,
      icon: 'bi-hourglass-split',
      iconBg: 'bg-warning bg-opacity-10',
      iconColor: 'text-warning',
      valueCls: 'text-warning',
    },
    {
      label: 'Selesai',
      value: completed,
      icon: 'bi-check-circle-fill',
      iconBg: 'bg-success bg-opacity-10',
      iconColor: 'text-success',
      valueCls: 'text-success',
    },
    {
      label: 'Progres',
      value: `${pct}%`,
      icon: 'bi-bar-chart-fill',
      iconBg: 'bg-info bg-opacity-10',
      iconColor: 'text-info',
      valueCls: 'text-info',
    },
  ]

  return (
    <section aria-label="Statistik tugas" className="mb-4">
      <div className="row g-3">
        {stats.map(({ label, value, icon, iconBg, iconColor, valueCls }) => (
          <div key={label} className="col-6 col-lg-3">
            <div className="card tf-stat-card h-100">
              <div className="card-body d-flex align-items-center gap-3 py-3">
                <div className={`tf-stat-icon ${iconBg}`}>
                  <i className={`bi ${icon} ${iconColor}`} aria-hidden="true" />
                </div>
                <div className="min-w-0">
                  <div className={`fw-bold fs-4 lh-1 mb-1 ${valueCls}`}>{value}</div>
                  <div className="text-body-secondary" style={{ fontSize: '0.78rem', fontWeight: 500 }}>
                    {label}
                  </div>
                </div>
              </div>
              {label === 'Progres' && total > 0 && (
                <div className="card-footer pt-0 pb-2 px-3 border-0 bg-transparent">
                  <div
                    className="progress"
                    style={{ height: 4 }}
                    role="progressbar"
                    aria-label="Persentase penyelesaian"
                    aria-valuenow={pct}
                    aria-valuemin={0}
                    aria-valuemax={100}
                  >
                    <div
                      className="progress-bar bg-info"
                      style={{ width: `${pct}%`, transition: 'width 0.5s ease' }}
                    />
                  </div>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

export default StatsSummary
