import { useEffect, useState } from "react";
import Grid from "../components/Grid/grid";
import "./landing.css";
import axios from "axios";

function Landing() {
  const [gridSize, setGridSize] = useState(3); // Initial grid size, e.g., 3x3 grid
  const [initialGridCells, setInitialGridCells] = useState([]);
  const [goalGridCells, setGoalGridCells] = useState([]);

  // Goal test
  const areArraysEqual = JSON.stringify(initialGridCells) === JSON.stringify(goalGridCells);

  const initGridState = async () => {
    try {
      const response = await axios.get(`/generate/${gridSize}`);
      const { initialGrid } = response.data;
      const { goalGrid } = response.data;
      console.log("Initial grid state:", initialGrid);
      console.log("Goal grid state:", goalGrid);
      setInitialGridCells(initialGrid);
      setGoalGridCells(goalGrid);
    } catch (error) {
      console.error("Error sending grid state:", error);
    }
  };

  const nextGridState = async () => {
    try {
      const response = await axios.post("/api/solve", {
        initialGrid: initialGridCells,
        goalGrid: goalGridCells,
      });
      console.log("Response:", response.data);
      const { nextGridCells } = await response.data;
      // console.log("Next grid state:", nextGridCells);
      setInitialGridCells(nextGridCells);
    } catch (error) {
      console.error("Error getting next grid state:", error);
    }
  }

  useEffect(() => {
    initGridState();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [gridSize]);

  // Function to handle slider change and update grid size
  const handleSliderChange = (event) => {
    const newSize = parseInt(event.target.value, 10);
    setGridSize(newSize);
    setInitialGridCells([]);
    setGoalGridCells([]);
  };

  return (
    <super-landing-wrapper>
      <h1>N puzzle problem solver</h1>
      <input
        type="range"
        min="2"
        max="4"
        value={gridSize}
        onChange={handleSliderChange}
      />
      {/* Display the current grid size */}
      <p>
        Grid Size: {gridSize}x{gridSize}
      </p>
      <landing-wrapper>
        {/* Slider to control grid size */}
        <Grid
          gridsize={gridSize}
          updateGridSize={setGridSize}
          gridCells={initialGridCells}
          updateGridCells={setInitialGridCells}
        />
        <Grid
          gridsize={gridSize}
          updateGridSize={setGridSize}
          gridCells={goalGridCells}
          updateGridCells={setGoalGridCells}
        />
      </landing-wrapper>
      <button onClick={nextGridState}>Next Grid State</button>
      <p>Goal state reached? {areArraysEqual ? "Yes" : "No"}</p>
    </super-landing-wrapper>
  );
}

export default Landing;
