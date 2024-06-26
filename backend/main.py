import json
from random import shuffle

from fastapi import FastAPI, HTTPException, Request
from fastapi.middleware.cors import CORSMiddleware
from interface import generate_states, heuristic, next_state

app = FastAPI()

origins = [
    "https://localhost:5173",
    "http://localhost:5173",
    "localhost:5173",
    "https://f9jw97h7-5173.inc1.devtunnels.ms"
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

@app.get("/generate/{size}")
async def get_initial_grid(size: int) -> dict:
    initial, goal = generate_states(size)
    return {"initialGrid": initial, "goalGrid": goal}

@app.post("/api/solve")
async def get_next_state(request: Request):
    try:
        data = await request.json()
        current = data["initialGrid"]
        goal = data["goalGrid"]
        new_state, heuristic = next_state(current, goal)
        return {"nextGridCells": new_state, "heuristic": heuristic}
    except Exception as e:
        raise HTTPException(status_code=400, detail="Invalid grid state data")

@app.post("/api/heuristic")
async def get_heuristic(request: Request):
    try:
        data = await request.json()
        current = data["initialGrid"]
        goal = data["goalGrid"]
        res = heuristic(current, goal)
        return {"heuristic": res}
    except Exception as e:
        raise HTTPException(status_code=400, detail="Invalid heuristic")

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