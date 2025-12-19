import { useState } from "react"
import { FiCheckCircle } from "react-icons/fi"

const UpdatePage = ({ note, onClose, onUpdated }) => {
  const [formData, setFormData] = useState({
    judul: note.judul,
    note: note.note,
  })

  const [success, setSuccess] = useState(false)

  const handleSave = () => {
    const oldData = JSON.parse(localStorage.getItem("notesData")) || []

    const updatedData = oldData.map((item) =>
      item.id === note.id
        ? { ...item, ...formData }
        : item
    )

    localStorage.setItem("notesData", JSON.stringify(updatedData))
    setSuccess(true)

    setTimeout(() => {
      onUpdated(updatedData)
      onClose()
    }, 1000)
  }

  return (
    <>
      {/* BLUR BACKGROUND */}
      <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40" />

      {/* MODAL */}
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div className="w-full max-w-3xl bg-base-100 rounded-2xl shadow-xl p-6">

          {/* HEADER */}
          <div className="flex justify-between mb-6">
            <button onClick={onClose}>✕</button>

            <button
              onClick={handleSave}
              className="px-4 py-2 rounded-md bg-base-300 hover:bg-base-400"
            >
              Simpan Perubahan
            </button>
          </div>

          {/* TITLE */}
          <input
            type="text"
            value={formData.judul}
            onChange={(e) =>
              setFormData({ ...formData, judul: e.target.value })
            }
            className="w-full text-3xl font-bold bg-transparent outline-none mb-4"
          />

          {/* NOTE */}
          <textarea
            value={formData.note}
            onChange={(e) =>
              setFormData({ ...formData, note: e.target.value })
            }
            className="w-full h-[55vh] resize-none bg-transparent outline-none"
          />
        </div>
      </div>

      {/* SUCCESS */}
      {success && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="bg-base-100 p-6 rounded-xl shadow">
            <FiCheckCircle size={40} className="mx-auto text-success mb-2" />
            <p>Catatan diperbarui</p>
          </div>
        </div>
      )}
    </>
  )
}

export default UpdatePage