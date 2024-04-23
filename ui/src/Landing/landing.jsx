import { useState } from "react";
import Grid from "../components/Grid/grid";
import "./landing.css";

function Landing() {
  const [gridSize, setGridSize] = useState(3); // Initial grid size, e.g., 3x3 grid
  return (
    <>
      <landing-wrapper>
        <p>Landing page: {gridSize}</p>
        <Grid gridsize={gridSize} updateGridSize={setGridSize} />
        <Grid gridsize={gridSize} updateGridSize={setGridSize} />
      </landing-wrapper>
    </>
  );
}

export default Landing;
