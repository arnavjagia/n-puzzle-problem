import { useState } from "react";
import "./grid.css";

function Grid() {
  const [gridSize, setGridSize] = useState(3); // Initial grid size, e.g., 3x3 grid
  const [gridCells, setGridCells] = useState(generateGridCells(gridSize));
  const [oldGridCells, setOldGridCells] = useState(generateGridCells(gridSize));

  // Function to generate initial grid cells
  function generateGridCells(size) {
    const cells = [];
    for (let i = 0; i < size * size; i++) {
      cells.push(i);
    }
    return cells;
  }

  // Function to handle tile click
  const handleTileClick = (clickedIndex) => {
    const emptyIndex = gridCells.indexOf(gridSize * gridSize - 1); // Find index of the empty cell
    if (isAdjacent(clickedIndex, emptyIndex)) {
      // Swap the clicked tile with the empty tile
      const newGridCells = [...gridCells];
      [newGridCells[emptyIndex], newGridCells[clickedIndex]] = [
        newGridCells[clickedIndex],
        newGridCells[emptyIndex],
      ];
      setOldGridCells(gridCells);
      setGridCells(newGridCells);
    }
  };

  // Function to check if two cells are adjacent
  const isAdjacent = (index1, index2) => {
    const row1 = Math.floor(index1 / gridSize);
    const col1 = index1 % gridSize;
    const row2 = Math.floor(index2 / gridSize);
    const col2 = index2 % gridSize;

    return (
      Math.abs(row1 - row2) + Math.abs(col1 - col2) === 1 // Check if they are adjacent (horizontally or vertically)
    );
  };

  // Render the grid based on the gridSize and gridCells
  const renderGrid = () => {
    return gridCells.map((cellIndex, index) => (
      <div
        key={cellIndex}
        className={`grid-cell ${
          cellIndex === gridSize * gridSize - 1 ? "empty-cell" : ""
        }`}
        onClick={() => handleTileClick(index)}
      >
        {/* Display the tile number (or empty space) */}
        {cellIndex !== gridSize * gridSize - 1 ? cellIndex + 1 : ""}
      </div>
    ));
  };

  // Function to handle slider change and update grid size
  const handleSliderChange = (event) => {
    const newSize = parseInt(event.target.value, 10);
    setGridSize(newSize);
    setGridCells(generateGridCells(newSize));
    setOldGridCells(generateGridCells(newSize));
  };

  // Calculate grid template columns dynamically based on gridSize
  const gridTemplateColumns = `repeat(${gridSize}, 1fr)`;

  // Check if oldGridCells and gridCells have the same values
  const areArraysEqual = JSON.stringify(oldGridCells) === JSON.stringify(gridCells);

  return (
    <div className="grid-container">
      {/* Slider to control grid size */}
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

      {/* Render the grid based on the gridSize */}
      <div
        className="grid"
        style={{ gridTemplateColumns: gridTemplateColumns }}
      >
        {renderGrid()}
      </div>
      <p>Parent: {oldGridCells}</p>
      <p>New: {gridCells}</p>
      <p>Are oldGridCells and gridCells the same? {areArraysEqual ? "Yes" : "No"}</p>
    </div>
  );
}

export default Grid;
