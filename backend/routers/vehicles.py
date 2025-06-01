import schemas, crud
from database import get_db
from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from typing import List

vehicle_router = APIRouter()

# Vehicles
@vehicle_router.post("/vehicles", response_model=schemas.Vehicle)
def create_vehicle(vehicle: schemas.VehicleCreate, db: Session = Depends(get_db)):
    return crud.create_vehicle(db, vehicle)

@vehicle_router.put("/vehicles/{vehicle_id}", response_model=schemas.Vehicle)
def update_vehicle(vehicle_id: int, vehicle: schemas.VehicleUpdate, db: Session = Depends(get_db)):
    vehicle.vehicle_id = vehicle_id
    return crud.update_vehicle(db, vehicle)

@vehicle_router.get("/vehicles/{vehicle_id}", response_model=schemas.Vehicle)
def read_vehicle(vehicle_id: int, db: Session = Depends(get_db)):
    db_vehicle = crud.get_vehicle(db, vehicle_id)
    if db_vehicle is None:
        raise HTTPException(status_code=404, detail="Vehicle not found")
    return db_vehicle


@vehicle_router.get("/vehicles/{vehicle_id}/inspections", response_model=List[schemas.Inspection])
def get_vehicle_inspections(vehicle_id: int, db: Session = Depends(get_db)):
    db_inspections = crud.get_inspections(db, vehicle_id)
    return db_inspections



