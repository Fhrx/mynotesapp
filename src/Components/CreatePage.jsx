import { useState } from "react"
import { FiCheckCircle } from "react-icons/fi"
import { FiX, FiSave } from "react-icons/fi"

const CreatePage = ({ onClose }) => {
  const [formData, setFormData] = useState({
    judul: "",
    note: "",
  })

  const [success, setSuccess] = useState(false)

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSave = () => {
    if (!formData.judul || !formData.note) return

    const oldData = JSON.parse(localStorage.getItem("notesData")) || []

    const newData = {
      id: Date.now(),
      ...formData,
      createdAt: new Date().toISOString(),
    }

    localStorage.setItem(
      "notesData",
      JSON.stringify([...oldData, newData])
    )

    setSuccess(true)

    setTimeout(() => {
      setSuccess(false)
      onClose()
      window.location.reload()
    }, 1200)
  }

  return (
    <>
      {/* BLUR BACKGROUND */}
      <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40" />

      {/* MODAL */}
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div className="w-full max-w-3xl bg-base-100 rounded-2xl shadow-xl p-6">

          {/* HEADER */}
          <div className="flex items-center justify-between mb-6">

            {/* CLOSE / X */}
            <button
              onClick={onClose}
              className="p-2 rounded-lg bg-base-200 hover:bg-base-300 transition"
              aria-label="Tutup"
            >
              <FiX size={18} />
            </button>

            {/* SAVE */}
            <button
              onClick={handleSave}
              className="flex items-center gap-2 px-4 py-2 rounded-lg bg-base-200 hover:bg-base-300 transition"
            >
              <FiSave size={16} />
              Simpan
            </button>

          </div>


          {/* TITLE */}
          <input
            type="text"
            name="judul"
            placeholder="Judul catatan..."
            value={formData.judul}
            onChange={handleChange}
            className="w-full text-3xl font-bold bg-transparent outline-none mb-4 placeholder:text-base-300"
          />

          {/* NOTE */}
          <textarea
            name="note"
            placeholder="Mulai menulis catatan..."
            value={formData.note}
            onChange={handleChange}
            className="w-full h-[55vh] resize-none bg-transparent outline-none"
          />
        </div>
      </div>

      {/* SUCCESS POPUP */}
      {success && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center">
          <div className="bg-base-100 rounded-xl p-6 text-center shadow-xl">
            <FiCheckCircle size={48} className="mx-auto text-success mb-3" />
            <p className="font-semibold">Catatan berhasil disimpan</p>
          </div>
        </div>
      )}
    </>
  )
}

export default CreatePage