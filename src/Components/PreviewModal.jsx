const PreviewModal = ({ note, onClose }) => {
  return (
    <>
      <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40" />

      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div className="w-full max-w-3xl bg-base-100 rounded-2xl p-6">

          <div className="flex justify-between mb-4">
            <h2 className="text-2xl font-bold">{note.judul}</h2>
            <button onClick={onClose}>✕</button>
          </div>

          <div className="max-h-[60vh] overflow-y-auto whitespace-pre-wrap">
            {note.note}
          </div>
        </div>
      </div>
    </>
  )
}

export default PreviewModal