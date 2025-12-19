import { useState } from "react"
import Home from "./Components/Home"
import CreatePage from "./Components/CreatePage"
import "./assets/main.css"

export default function App() {
  const [showCreate, setShowCreate] = useState(false)

  return (
    <div data-theme="cupcake" className="min-h-screen bg-base-200 p-10">
      <Home onAdd={() => setShowCreate(true)} />

      {showCreate && (
        <CreatePage onClose={() => setShowCreate(false)} />
      )}
    </div>
  )
}