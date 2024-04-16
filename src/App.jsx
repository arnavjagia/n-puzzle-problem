import { Routes, Route } from "react-router-dom";
import Grid from "./components/Grid/grid";
import "./App.css";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Grid />} />
      </Routes>
    </>
  );
}

export default App;
