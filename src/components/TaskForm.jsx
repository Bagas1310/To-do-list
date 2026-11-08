import { useState, useEffect } from "react";

const CATEGORIES = [
  "Pekerjaan",
  "Pribadi",
  "Mendesak",
  "Kesehatan",
  "Belajar",
  "Lainnya",
];
const PRIORITIES = [
  { value: "low", label: "Rendah" },
  { value: "medium", label: "Sedang" },
  { value: "high", label: "Tinggi" },
];

function TaskForm({ onSave, editingTask, onCancelEdit }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("Pekerjaan");
  const [priority, setPriority] = useState("medium");
  const [dueDate, setDueDate] = useState("");
  const [validated, setValidated] = useState(false);

  useEffect(() => {
    if (editingTask) {
      setTitle(editingTask.title);
      setDescription(editingTask.description || "");
      setCategory(editingTask.category || "Pekerjaan");
      setPriority(editingTask.priority || "medium");
      setDueDate(editingTask.dueDate || "");
      setValidated(false);
    } else {
      resetForm();
    }
  }, [editingTask]);

  const resetForm = () => {
    setTitle("");
    setDescription("");
    setCategory("Pekerjaan");
    setPriority("medium");
    setDueDate("");
    setValidated(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setValidated(true);

    if (!title.trim()) return;

    onSave({
      id: editingTask ? editingTask.id : undefined,
      title: title.trim(),
      description: description.trim(),
      category,
      priority,
      dueDate,
      completed: editingTask ? editingTask.completed : false,
      createdAt: editingTask ? editingTask.createdAt : new Date().toISOString(),
    });

    resetForm();
  };

  return (
    <section
      aria-label={editingTask ? "Edit Tugas" : "Tambah Tugas Baru"}
      className="mb-4"
    >
      <div className="card tf-form-card">
        <div className="card-header bg-transparent d-flex align-items-center justify-content-between pt-3 pb-2 border-0">
          <div className="d-flex align-items-center gap-2">
            <i
              className={`bi ${editingTask ? "bi-pencil-square text-warning" : "bi-plus-circle text-primary"} fs-5`}
            />
            <h2 className="fs-6 fw-semibold mb-0">
              {editingTask ? "Edit Tugas" : "Tambah Tugas Baru"}
            </h2>
          </div>
          {editingTask && (
            <button
              type="button"
              className="btn btn-sm btn-outline-secondary"
              onClick={onCancelEdit}
            >
              Batal Edit
            </button>
          )}
        </div>

        <div className="card-body pt-1">
          <form
            onSubmit={handleSubmit}
            noValidate
            className={validated ? "was-validated" : ""}
          >
            <div className="form-floating mb-3">
              <input
                type="text"
                id="taskTitle"
                className="form-control"
                placeholder="Apa yang perlu dikerjakan?"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
                maxLength={120}
                aria-required="true"
              />
              <label htmlFor="taskTitle">Judul Tugas *</label>
              <div className="invalid-feedback">
                Silakan masukkan judul tugas.
              </div>
            </div>

            <div className="form-floating mb-3">
              <textarea
                id="taskDesc"
                className="form-control"
                placeholder="Rincian tambahan..."
                style={{ height: "75px", resize: "vertical" }}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                maxLength={400}
              />
              <label htmlFor="taskDesc">Deskripsi (opsional)</label>
            </div>

            <div className="row g-2 mb-3">
              <div className="col-12 col-md-4">
                <div className="form-floating">
                  <select
                    id="taskCategory"
                    className="form-select"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    aria-label="Kategori"
                  >
                    {CATEGORIES.map((cat) => (
                      <option key={cat} value={cat}>
                        {cat}
                      </option>
                    ))}
                  </select>
                  <label htmlFor="taskCategory">Kategori</label>
                </div>
              </div>

              <div className="col-6 col-md-4">
                <div className="form-floating">
                  <select
                    id="taskPriority"
                    className="form-select"
                    value={priority}
                    onChange={(e) => setPriority(e.target.value)}
                    aria-label="Tingkat prioritas"
                  >
                    {PRIORITIES.map((p) => (
                      <option key={p.value} value={p.value}>
                        {p.label}
                      </option>
                    ))}
                  </select>
                  <label htmlFor="taskPriority">Prioritas</label>
                </div>
              </div>

              <div className="col-6 col-md-4">
                <div className="form-floating">
                  <input
                    type="date"
                    id="taskDueDate"
                    className="form-control"
                    value={dueDate}
                    onChange={(e) => setDueDate(e.target.value)}
                    required
                    aria-label="Tenggat waktu"
                  />
                  <label htmlFor="taskDueDate">Tenggat Waktu *</label>
                </div>
              </div>
            </div>

            <div className="d-flex justify-content-end gap-2">
              {editingTask && (
                <button
                  type="button"
                  className="btn btn-outline-secondary px-3"
                  onClick={onCancelEdit}
                >
                  Batal
                </button>
              )}
              <button
                type="submit"
                className={`btn ${editingTask ? "btn-warning text-dark" : "btn-primary"} px-4 d-flex align-items-center gap-2`}
              >
                <i
                  className={`bi ${editingTask ? "bi-check2" : "bi-plus-lg"}`}
                />
                <span>{editingTask ? "Simpan Perubahan" : "Tambah Tugas"}</span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}

export default TaskForm;
