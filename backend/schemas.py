from typing import List, Optional
from pydantic import BaseModel
from datetime import date, datetime

class EstimateItemBase(BaseModel):
    description: str
    quantity: float
    unit_price: float
    line_total: float
    category: str

class EstimateItemCreate(EstimateItemBase):
    estimate_id: int

class EstimateItem(EstimateItemBase):
    item_id: int
    class Config:
        orm_mode = True

class LaborOperationBase(BaseModel):
    labor_description: str
    hours: float
    rate: float
    technician: str

class LaborOperationCreate(LaborOperationBase):
    estimate_id: int

class LaborOperation(LaborOperationBase):
    operation_id: int
    class Config:
        orm_mode = True

class EstimateBase(BaseModel):
    estimate_date: date
    total_amount: float
    notes: Optional[str] = None
    status: str

class EstimateCreate(EstimateBase):
    vehicle_id: int

class Estimate(EstimateBase):
    estimate_id: int
    parts: List[EstimateItem] = []
    labor: List[LaborOperation] = []
    class Config:
        orm_mode = True

class VehicleBase(BaseModel):
    vin: str
    year: int
    make: str
    model: str
    license_plate: str
    mileage: int

class VehicleCreate(VehicleBase):
    customer_id: int

class VehicleUpdate(VehicleBase):
    vehicle_id: int
    customer_id: int

class CustomerBase(BaseModel):
    first_name: str
    last_name: str
    phone: str
    email: str
    address: str
    city: str
    state: str
    zip_code: str

class CustomerCreate(CustomerBase):
    pass


class InspectionResultBase(BaseModel):
    item_id: int
    condition: str
    notes: Optional[str] = None
    image_url: Optional[str] = None

class InspectionResultCreate(InspectionResultBase):
    inspection_id: int

class InspectionResult(InspectionResultBase):
    result_id: int

    class Config:
        orm_mode = True

class ChecklistItemBase(BaseModel):
    description: Optional[str]
    category: Optional[str] = None
    is_required: bool = True

class ChecklistItemCreate(ChecklistItemBase):
    checklist_id: int

class ChecklistItem(ChecklistItemBase):
    item_id: int

    class Config:
        orm_mode = True

class InspectionChecklistBase(BaseModel):
    name: str
    description: Optional[str] = None

class InspectionChecklistCreate(InspectionChecklistBase):
    pass

class InspectionChecklist(InspectionChecklistBase):
    checklist_id: int
    items: Optional[List[ChecklistItem]] = []

    class Config:
        orm_mode = True

class InspectionBase(BaseModel):
    vehicle_id: int
    customer_id: int
    technician_id: Optional[int] = None
    date_performed: datetime
    status: Optional[str] = "Pending"
    notes: Optional[str] = None

class InspectionCreate(InspectionBase):
    pass

class Inspection(InspectionBase):
    inspection_id: int
    results: List[InspectionResult] = []

    class Config:
        orm_mode = True

class Vehicle(VehicleBase):
    vehicle_id: int
    estimates: List[Estimate] = []
    inspections: List[Inspection] = []
    class Config:
        orm_mode = True

class Customer(CustomerBase):
    customer_id: int
    vehicles: List[Vehicle] = []
    class Config:
        orm_mode = True

