import { Routes, Route } from "react-router-dom";
import Landing from "./Landing/landing";
import "./App.css";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Landing />} />
      </Routes>
    </>
  );
}

export default App;
