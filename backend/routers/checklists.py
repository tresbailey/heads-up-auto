import schemas, crud
from database import get_db
from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from typing import List

checklist_router = APIRouter()

# Checklists
@checklist_router.post("/checklists", response_model=schemas.InspectionChecklist)
def create_checklist(checklist: schemas.InspectionChecklistCreate, db: Session = Depends(get_db)):
    return crud.create_checklist(db, checklist)

@checklist_router.get("/checklists", response_model=List[schemas.InspectionChecklist])
def read_checklist_list(db: Session = Depends(get_db)):
    checklists = crud.get_checklist_list(db)
    if checklists is None:
        raise HTTPException(status_code=404, detail="Checklist not found")
    return checklists

@checklist_router.get("/checklists/{checklist_id}", response_model=schemas.InspectionChecklist)
def read_checklist(checklist_id: int, db: Session = Depends(get_db)):
    checklist = crud.get_checklist(db, checklist_id)
    if checklist is None:
        raise HTTPException(status_code=404, detail="Checklist not found")
    return checklist

