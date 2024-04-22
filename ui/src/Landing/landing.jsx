import { useEffect, useState } from "react";
import Grid from "../components/Grid/grid";
import "./landing.css";
import axios from "axios";

function Landing() {
  const [gridSize, setGridSize] = useState(3); // Initial grid size, e.g., 3x3 grid
  const [gridCells, setGridCells] = useState([]);

  
  useEffect(() => {
    const sendGridState = async () => {
      try {
        const response = await axios.get(`/generate/${gridSize}`);
        const { initialGrid } = response.data;
        console.log("New grid state:", initialGrid);
        console.log(typeof initialGrid);
        setGridCells(initialGrid);
      } catch (error) {
        console.error("Error sending grid state:", error);
      }
    };
    sendGridState();
  }, [gridSize])

  return (
    <>
      <landing-wrapper>
        <Grid gridsize={gridSize} updateGridSize={setGridSize} gridCells={gridCells} updateGridCells={setGridCells} />
        <Grid gridsize={gridSize} updateGridSize={setGridSize} gridCells={gridCells} updateGridCells={setGridCells} />
      </landing-wrapper>
    </>
  );
}

export default Landing;
