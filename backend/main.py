# main.py
from fastapi import FastAPI, HTTPException, Depends
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
from database import engine, SessionLocal, Base
import models, schemas, crud
from database import get_db
from typing import List
from routers.customers import router as customer_routes
from routers.vehicles import vehicle_router
from routers.checklists import checklist_router

Base.metadata.create_all(bind=engine)

app = FastAPI()
app.include_router(customer_routes)
app.include_router(vehicle_router)
app.include_router(checklist_router)

# Allow frontend origin
ORIGINS = [
    "http://localhost:5173",  # Vite (React) dev server default
    "http://localhost:3000",  # If using CRA or another dev port
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=ORIGINS,            # or ["*"] for dev
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Estimates
@app.post("/estimates/", response_model=schemas.Estimate)
def create_estimate(estimate: schemas.EstimateCreate, db: Session = Depends(get_db)):
    return crud.create_estimate(db, estimate)

@app.get("/estimates/{estimate_id}", response_model=schemas.Estimate)
def read_estimate(estimate_id: int, db: Session = Depends(get_db)):
    db_estimate = crud.get_estimate(db, estimate_id)
    if db_estimate is None:
        raise HTTPException(status_code=404, detail="Estimate not found")
    return db_estimate

# Estimate Items
@app.post("/estimate_items/", response_model=schemas.EstimateItem)
def create_estimate_item(item: schemas.EstimateItemCreate, db: Session = Depends(get_db)):
    return crud.create_estimate_item(db, item)

# Labor Operations
@app.post("/labor_operations/", response_model=schemas.LaborOperation)
def create_labor_operation(operation: schemas.LaborOperationCreate, db: Session = Depends(get_db)):
    return crud.create_labor_operation(db, operation)

@app.post("/", response_model=schemas.Inspection)
def create_inspection(inspection: schemas.InspectionCreate, db: Session = Depends(get_db)):
    return crud.create_inspection(db, inspection)

@app.get("/inspections/{inspection_id}", response_model=schemas.Inspection)
def read_inspection(inspection_id: int, db: Session = Depends(get_db)):
    db_inspection = crud.get_inspection(db, inspection_id)
    if db_inspection is None:
        raise HTTPException(status_code=404, detail="Inspection not found")
    return db_inspection

# Checklist Routes

# Checklist Item Routes
@app.post("/items/", response_model=schemas.ChecklistItem)
def create_item(item: schemas.ChecklistItemCreate, db: Session = Depends(get_db)):
    return crud.create_checklist_item(db, item)

@app.get("/items/{item_id}", response_model=schemas.ChecklistItem)
def read_item(item_id: int, db: Session = Depends(get_db)):
    item = crud.get_checklist_item(db, item_id)
    if item is None:
        raise HTTPException(status_code=404, detail="Checklist item not found")
    return item

# Inspection Result Routes
@app.post("/results/", response_model=schemas.InspectionResult)
def create_result(result: schemas.InspectionResultCreate, db: Session = Depends(get_db)):
    return crud.create_inspection_result(db, result)

@app.get("/results/{result_id}", response_model=schemas.InspectionResult)
def read_result(result_id: int, db: Session = Depends(get_db)):
    result = crud.get_inspection_result(db, result_id)
    if result is None:
        raise HTTPException(status_code=404, detail="Inspection result not found")
    return result
