import CanvasModel from "./canvas"
import Customiser from "./pages/Customiser"
import Home from "./pages/Home"

function App() {
  return (
    <main className="app transition-all ease-in">
      <Home/>
      <CanvasModel/>
      <Customiser/>
    </main>
  )
}

export default App
