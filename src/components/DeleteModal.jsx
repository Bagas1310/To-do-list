import { useEffect, useRef } from 'react'

function DeleteModal({ task, onConfirm, onCancel }) {
  const confirmBtnRef = useRef(null)

  useEffect(() => {
    if (task) {
      confirmBtnRef.current?.focus()
    }
  }, [task])

  if (!task) return null

  return (
    <>
      <div
        className="modal-backdrop fade show"
        style={{ zIndex: 1050 }}
        onClick={onCancel}
      />

      <div
        className="modal fade show d-block"
        tabIndex="-1"
        role="dialog"
        aria-modal="true"
        aria-labelledby="deleteModalTitle"
        style={{ zIndex: 1055 }}
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content border-0 shadow-lg">
            <div className="modal-header border-0 pb-0">
              <h5 className="modal-title d-flex align-items-center gap-2 text-danger" id="deleteModalTitle">
                <i className="bi bi-exclamation-triangle-fill" />
                <span>Hapus Tugas</span>
              </h5>
              <button
                type="button"
                className="btn-close"
                aria-label="Tutup"
                onClick={onCancel}
              />
            </div>
            <div className="modal-body py-3">
              <p className="mb-1 text-body">
                Apakah Anda yakin ingin menghapus tugas ini?
              </p>
              <div className="p-2 rounded bg-body-tertiary border mt-2">
                <strong className="d-block text-truncate">{task.title}</strong>
                {task.description && (
                  <small className="text-body-secondary text-truncate d-block">
                    {task.description}
                  </small>
                )}
              </div>
              <small className="text-danger d-block mt-2">
                Tindakan ini tidak dapat dibatalkan.
              </small>
            </div>
            <div className="modal-footer border-0 pt-0">
              <button
                type="button"
                className="btn btn-secondary btn-sm"
                onClick={onCancel}
              >
                Batal
              </button>
              <button
                ref={confirmBtnRef}
                type="button"
                className="btn btn-danger btn-sm px-3"
                onClick={onConfirm}
              >
                <i className="bi bi-trash3 me-1" />
                Hapus
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default DeleteModal
