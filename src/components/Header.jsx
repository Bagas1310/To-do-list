function Header({ theme, onThemeToggle }) {
  const isLight = theme === 'light'

  return (
    <header className="tf-header py-2">
      <div className="container-xl">
        <div className="d-flex align-items-center justify-content-between">
          <div className="d-flex align-items-center gap-2">
            <span
              className="d-flex align-items-center justify-content-center rounded-3 p-2"
              style={{ background: 'linear-gradient(135deg, #0d6efd, #6610f2)', width: 42, height: 42 }}
              aria-hidden="true"
            >
              <i className="bi bi-check2-all text-white fs-5" />
            </span>
            <div>
              <span className="tf-brand text-body-emphasis d-block lh-1">TaskFlow</span>
              <span className="text-body-secondary" style={{ fontSize: '0.7rem', letterSpacing: '0.08em' }}>
                MANAJEMEN TUGAS
              </span>
            </div>
          </div>

          <button
            type="button"
            className="btn btn-outline-secondary btn-sm d-flex align-items-center gap-2 rounded-pill px-3"
            onClick={onThemeToggle}
            aria-label={`Beralih ke mode ${isLight ? 'gelap' : 'terang'}`}
            title={`Beralih ke mode ${isLight ? 'gelap' : 'terang'}`}
          >
            {isLight ? (
              <>
                <i className="bi bi-moon-stars-fill" />
                <span className="d-none d-sm-inline">Mode Gelap</span>
              </>
            ) : (
              <>
                <i className="bi bi-sun-fill text-warning" />
                <span className="d-none d-sm-inline">Mode Terang</span>
              </>
            )}
          </button>
        </div>
      </div>
    </header>
  )
}

export default Header
