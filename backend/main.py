from random import shuffle
from fastapi import FastAPI, Request, HTTPException
from fastapi.middleware.cors import CORSMiddleware
import json

app = FastAPI()

origins = [
    "https://localhost:5173",
    "http://localhost:5173",
    "localhost:5173"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"]
)

@app.get("/api/health")
async def read_root() -> dict:
    return {"message": "API is up and running!"}

@app.get("/api/grid/{size}")
async def get_initial_grid(size: int) -> dict:
    a = [i for i in range(size*size)]
    shuffle(a)
    return {"initialGrid": a}

@app.post("/api/grid")
async def update_grid(request: Request):
    try:
        data = await request.json()
        print(data)
        grid_cells = data["GridConfiguration"]
        print(grid_cells)
        # Calculate new grid state and heuristics based on grid_cells
        # ...
        # new_grid_cells = ...
        # heuristics = ...
        # return {"newGridCells": new_grid_cells, "heuristics": heuristics}
        return {"newGridCells": grid_cells}
    except Exception as e:
        raise HTTPException(status_code=400, detail="Invalid grid state data")