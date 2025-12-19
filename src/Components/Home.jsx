import { useEffect, useState } from "react"
import { FiGrid, FiList, FiEdit, FiMoreVertical, FiEye, FiTrash } from "react-icons/fi"
import UpdatePage from "./UpdatePage"
import PreviewModal from "./PreviewModal"

const Home = ({ onAdd }) => {
  const [notes, setNotes] = useState([])
  const [view, setView] = useState("grid")

  const [selectedNote, setSelectedNote] = useState(null)
  const [showUpdate, setShowUpdate] = useState(false)
  const [showPreview, setShowPreview] = useState(false)

  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false)
  const [noteToDelete, setNoteToDelete] = useState(null)

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("notesData")) || []
    setNotes(data)
  }, [])

  const refreshNotes = () => {
    const data = JSON.parse(localStorage.getItem("notesData")) || []
    setNotes(data)
  }

  const handleDelete = (id) => {
    const filtered = notes.filter((n) => n.id !== id)
    localStorage.setItem("notesData", JSON.stringify(filtered))
    setNotes(filtered)
  }

  return (
    <div className="max-w-7xl mx-auto bg-base-100 rounded-2xl shadow-lg p-6">

      {/* HEADER */}
      <div className="flex items-center justify-between mb-6">
        <button
          onClick={onAdd}
          className="flex items-center gap-2 px-4 py-2 rounded-lg bg-base-200 hover:bg-base-300 transition"
        >
          <FiEdit />
          Tambahkan Catatan
        </button>

        <div className="flex gap-2">
          <button
            onClick={() => setView("grid")}
            className={`p-2 rounded-lg ${view === "grid"
              ? "bg-base-300"
              : "bg-base-200 hover:bg-base-300"
              }`}
          >
            <FiGrid />
          </button>

          <button
            onClick={() => setView("list")}
            className={`p-2 rounded-lg ${view === "list"
              ? "bg-base-300"
              : "bg-base-200 hover:bg-base-300"
              }`}
          >
            <FiList />
          </button>
        </div>
      </div>

      <h2 className="text-xl font-semibold mb-4">My Notes</h2>

      {/* CONTENT */}
      {notes.length === 0 ? (
        <p className="text-base-content/50">Belum ada catatan</p>
      ) : (
        <div
          className={
            view === "grid"
              ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4"
              : "flex flex-col gap-3 max-h-[70vh] overflow-y-auto pr-2"
          }
        >
          {notes.map((note) => (
            <div
              key={note.id}
              className={`relative bg-base-100 rounded-xl p-4 shadow-sm hover:shadow-md transition ${view === "list" && "flex flex-col"
                }`}
            >
              {/* MORE OPTION */}
              <div className="absolute top-3 right-3 dropdown dropdown-end">
                <button
                  tabIndex={0}
                  className="p-1 rounded hover:bg-base-200 transition"
                >
                  <FiMoreVertical />
                </button>

                <ul
                  tabIndex={0}
                  className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-40 z-50"
                >
                  <li>
                    <button
                      className="flex items-center gap-2 rounded-lg hover:bg-base-200 transition"
                      onClick={() => {
                        setSelectedNote(note)
                        setShowUpdate(true)
                        document.activeElement.blur() // 🔥 AUTO CLOSE
                      }}
                    >
                      <FiEdit />
                      Edit
                    </button>
                  </li>

                  <li>
                    <button
                      className="flex items-center gap-2 rounded-lg hover:bg-base-200 transition"
                      onClick={() => {
                        setSelectedNote(note)
                        setShowPreview(true)
                        document.activeElement.blur() // 🔥 AUTO CLOSE
                      }}
                    >
                      <FiEye />
                      Preview
                    </button>
                  </li>
                  <li>
                    <button
                      className="flex items-center gap-2 rounded-lg hover:bg-error/10 text-error transition"
                      onClick={() => {
                        setNoteToDelete(note)
                        setShowDeleteConfirm(true)
                        document.activeElement.blur() // auto close dropdown
                      }}
                    >
                      <FiTrash />
                      Delete
                    </button>
                  </li>
                </ul>
              </div>


              {/* CONTENT */}
              <h3 className="font-semibold mb-1 line-clamp-1 pr-6">
                {note.judul}
              </h3>

              <p className="text-sm text-base-content/70 line-clamp-3 break-words">
                {note.note}
              </p>

              <div className="text-xs text-base-content/50 mt-3 flex justify-between">
                <span>
                  {new Date(note.createdAt).toLocaleDateString("id-ID")}
                </span>
                <span>
                  {new Date(note.createdAt).toLocaleTimeString("id-ID", {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* UPDATE MODAL */}
      {showUpdate && selectedNote && (
        <UpdatePage
          note={selectedNote}
          onClose={() => {
            setShowUpdate(false)
            setSelectedNote(null)
          }}
          onUpdated={refreshNotes}
        />
      )}

      {/* PREVIEW MODAL */}
      {showPreview && selectedNote && (
        <PreviewModal
          note={selectedNote}
          onClose={() => {
            setShowPreview(false)
            setSelectedNote(null)
          }}
        />
      )}

      {/* DELETE MODAL */}
      {showDeleteConfirm && noteToDelete && (
        <>
          {/* BACKDROP */}
          <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40" />

          {/* MODAL */}
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div className="bg-base-100 rounded-2xl shadow-xl p-6 w-full max-w-sm">

              <h3 className="text-lg font-semibold mb-2">
                Hapus Catatan?
              </h3>

              <p className="text-sm text-base-content/70 mb-6">
                Catatan <span className="font-semibold">"{noteToDelete.judul}"</span> akan dihapus
                dan tidak bisa dikembalikan.
              </p>

              <div className="flex justify-end gap-3">
                <button
                  onClick={() => {
                    setShowDeleteConfirm(false)
                    setNoteToDelete(null)
                  }}
                  className="px-4 py-2 rounded-lg bg-base-200 hover:bg-base-300 transition"
                >
                  Batal
                </button>

                <button
                  onClick={() => {
                    handleDelete(noteToDelete.id)
                    setShowDeleteConfirm(false)
                    setNoteToDelete(null)
                  }}
                  className="px-4 py-2 rounded-lg bg-error text-error-content hover:bg-error/80 transition"
                >
                  Hapus
                </button>
              </div>
            </div>
          </div>
        </>
      )}

    </div>
  )
}

export default Home 