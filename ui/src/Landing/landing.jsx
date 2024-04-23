import { useEffect, useState } from "react";
import Grid from "../components/Grid/grid";
import "./landing.css";
import axios from "axios";

// axios.defaults.baseURL = "https://f9jw97h7-8000.inc1.devtunnels.ms";
axios.defaults.baseURL = "http://localhost:8000";

function Landing() {
  const [gridSize, setGridSize] = useState(3); // Initial grid size, e.g., 3x3 grid
  const [initialGridCells, setInitialGridCells] = useState([]);
  const [goalGridCells, setGoalGridCells] = useState([]);
  const [heuristic, setHeuristic] = useState(0); // Heuristic function to use [manhattan, misplaced, custom
  const [flag, setFlag] = useState(false);

  // Goal test
  const areArraysEqual = JSON.stringify(initialGridCells) === JSON.stringify(goalGridCells);

  const getHeuristic = async () => {
    try {
      const response = await axios.post("/api/heuristic", {
        initialGrid: initialGridCells,
        goalGrid: goalGridCells,
      });
      console.log("Response:", response.data);
      const { heuristic } = await response.data;
      setHeuristic(heuristic);
    } catch (error) {
      console.error("Error getting heuristic:", error);
    }
  }

  // Function to initialize grid state
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
      const { heuristic } = await response.data;
      // console.log("Next grid state:", nextGridCells);
      setInitialGridCells(nextGridCells);
      setHeuristic(heuristic);
      setFlag(false);
    } catch (error) {
      console.error("Error getting next grid state:", error);
    }
  }

  useEffect(() => {
    initGridState();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [gridSize]);
  
  useEffect(() => {
    if (flag) {
      getHeuristic();
    }
    setFlag(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initialGridCells])
  
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
      <p>Heuristic: {heuristic}</p>
      <p>Goal state reached? {areArraysEqual ? "Yes" : "No"}</p>

    </super-landing-wrapper>
  );
}

export default Landing;
