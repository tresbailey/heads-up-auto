from sqlalchemy.orm import Session, joinedload
import models, schemas

def create_customer(db: Session, customer: schemas.CustomerCreate):
    db_customer = models.Customer(**customer.dict())
    db.add(db_customer)
    db.commit()
    db.refresh(db_customer)
    return db_customer

def get_customer(db: Session, customer_id: int):
    return db.query(models.Customer).filter(models.Customer.customer_id == customer_id).first()

def get_all_customers(db: Session):
    return db.query(models.Customer).all()

def create_vehicle(db: Session, vehicle: schemas.VehicleCreate):
    db_vehicle = models.Vehicle(**vehicle.dict())
    db.add(db_vehicle)
    db.commit()
    db.refresh(db_vehicle)
    return db_vehicle

def get_vehicle(db: Session, vehicle_id: int):
    vehicle = db.query(models.Vehicle).options(joinedload(models.Vehicle.estimates)).options(joinedload(models.Vehicle.inspections)).filter(models.Vehicle.vehicle_id == vehicle_id).first()
    return vehicle

def get_inspections(db: Session, vehicle_id: int):
    return db.query(models.Inspection).filter(models.Inspection.vehicle_id == vehicle_id).all()

def create_estimate(db: Session, estimate: schemas.EstimateCreate):
    db_estimate = models.Estimate(**estimate.dict())
    db.add(db_estimate)
    db.commit()
    db.refresh(db_estimate)
    return db_estimate

def get_estimate(db: Session, estimate_id: int):
    return db.query(models.Estimate).filter(models.Estimate.estimate_id == estimate_id).first()

def create_estimate_item(db: Session, item: schemas.EstimateItemCreate):
    db_item = models.EstimateItem(**item.dict())
    db.add(db_item)
    db.commit()
    db.refresh(db_item)
    return db_item

def create_labor_operation(db: Session, operation: schemas.LaborOperationCreate):
    db_operation = models.LaborOperation(**operation.dict())
    db.add(db_operation)
    db.commit()
    db.refresh(db_operation)
    return db_operation


# Inspection CRUD

def create_inspection(db: Session, inspection: schemas.InspectionCreate):
    db_inspection = models.Inspection(**inspection.dict())
    db.add(db_inspection)
    db.commit()
    db.refresh(db_inspection)
    return db_inspection

def get_vehicle_inspection(db: Session, vehicle_id: int, inspection_id: int):
    return db.query(models.Inspection).filter(models.Inspection.vehicle_id == vehicle_id and models.Inspection.inspection_id == inspection_id).first()

def get_inspection(db: Session, inspection_id: int):
    return db.query(models.Inspection).filter(models.Inspection.inspection_id == inspection_id).first()

# Checklist CRUD

def create_checklist(db: Session, checklist: schemas.InspectionChecklistCreate):
    db_checklist = models.InspectionChecklist(**checklist.dict())
    db.add(db_checklist)
    db.commit()
    db.refresh(db_checklist)
    return db_checklist

def get_checklist_list(db: Session):
    return db.query(models.InspectionChecklist).all()

def get_checklist(db: Session, checklist_id: int):
    return db.query(models.InspectionChecklist).filter(models.InspectionChecklist.checklist_id == checklist_id).first()

# Checklist Item CRUD

def create_checklist_item(db: Session, item: schemas.ChecklistItemCreate):
    db_item = models.ChecklistItem(**item.dict())
    db.add(db_item)
    db.commit()
    db.refresh(db_item)
    return db_item

def get_checklist_item(db: Session, item_id: int):
    return db.query(models.ChecklistItem).filter(models.ChecklistItem.item_id == item_id).first()

# Inspection Result CRUD

def create_inspection_result(db: Session, result: schemas.InspectionResultCreate):
    db_result = models.InspectionResult(**result.dict())
    db.add(db_result)
    db.commit()
    db.refresh(db_result)
    return db_result

def get_inspection_result(db: Session, result_id: int):
    return db.query(models.InspectionResult).filter(models.InspectionResult.result_id == result_id).first()


