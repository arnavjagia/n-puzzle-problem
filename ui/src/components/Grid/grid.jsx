import axios from "axios";
import PropTypes from "prop-types";
import "./grid.css";

axios.defaults.baseURL = "http://127.0.0.1:8000";


// eslint-disable-next-line no-unused-vars
function Grid({ gridsize, updateGridSize, gridCells, updateGridCells }) {
  // Function to handle tile click
  const handleTileClick = (clickedIndex) => {
    const emptyIndex = gridCells.indexOf(gridsize * gridsize); // Find index of the empty cell
    if (isAdjacent(clickedIndex, emptyIndex)) {
      // Swap the clicked tile with the empty tile
      const newGridCells = [...gridCells];
      [newGridCells[emptyIndex], newGridCells[clickedIndex]] = [
        newGridCells[clickedIndex],
        newGridCells[emptyIndex],
      ];
      updateGridCells(newGridCells);
    }
  };

  // Function to check if two cells are adjacent
  const isAdjacent = (index1, index2) => {
    const row1 = Math.floor(index1 / gridsize);
    const col1 = index1 % gridsize;
    const row2 = Math.floor(index2 / gridsize);
    const col2 = index2 % gridsize;

    return (
      Math.abs(row1 - row2) + Math.abs(col1 - col2) === 1 // Check if they are adjacent (horizontally or vertically)
    );
  };

// Render the grid based on the gridSize and gridCells
  const renderGrid = () => {
    const cellSize = `${100 / gridsize}+5%`; // Calculate cell size dynamically

    return gridCells.map((cellIndex, index) => (
      <div
        key={cellIndex}
        className={`grid-cell ${
          cellIndex === gridsize * gridsize ? "empty-cell" : ""
        }`}
        style={{ width: cellSize, height: cellSize }} // Set dynamic width and height
        onClick={() => handleTileClick(index)}
      >
        {/* Display the tile number (or empty space) */}
        {cellIndex !== gridsize * gridsize ? cellIndex : ""}
      </div>
    ));
  };

  // Calculate grid template columns dynamically based on gridSize
  const gridTemplateColumns = `repeat(${gridsize}, 1fr)`; // E.g., "repeat(3, 1fr)"

  // Function to return grid state as a string
  const displayGridState = (cells) => {
    return cells.join("\t");
  };

  // Function to send grid state to the server
  const sendGridState = async () => {
    try {
      const response = await axios.post("/api/grid", {'GridConfiguration': gridCells });
      const { newGridCells } = response.data;
      console.log("New grid state:", newGridCells);
      console.log(typeof newGridCells);
      updateGridCells(newGridCells);
    } catch (error) {
      console.error("Error sending grid state:", error);
    }
  };

  return (
    <grid-wrap>
      <div className="grid-container">
        {/* Render the grid based on the gridSize */}
        <div
          className="grid"
          style={{
            gridTemplateColumns: gridTemplateColumns,
            maxHeight: "100%",
            maxWidth: "100%",
          }}
        >
          {renderGrid()}
        </div>
        <p>Board State: {displayGridState(gridCells)}</p>
      </div>
      <button onClick={sendGridState}>Send Grid State</button>
    </grid-wrap>
  );
}

Grid.propTypes = {
  gridsize: PropTypes.number.isRequired,
  updateGridSize: PropTypes.func.isRequired,
  gridCells: PropTypes.array.isRequired,
  updateGridCells: PropTypes.func.isRequired,
}

export default Grid;
