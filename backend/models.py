from sqlalchemy import Column, Integer, String, ForeignKey, Date, DateTime, Boolean, DECIMAL, Text
from sqlalchemy.orm import relationship
from database import Base


class Customer(Base):
    __tablename__ = "customers"

    customer_id = Column(Integer, primary_key=True, index=True)
    first_name = Column(String(100))
    last_name = Column(String(100))
    phone = Column(String(20))
    email = Column(String(100))
    address = Column(String(255))
    city = Column(String(100))
    state = Column(String(50))
    zip_code = Column(String(20))

    vehicles = relationship("Vehicle", back_populates="owner")

class Vehicle(Base):
    __tablename__ = "vehicles"

    vehicle_id = Column(Integer, primary_key=True, index=True)
    customer_id = Column(Integer, ForeignKey("customers.customer_id"))
    vin = Column(String(17))
    year = Column(Integer)
    make = Column(String(50))
    model = Column(String(50))
    license_plate = Column(String(20))
    mileage = Column(Integer)

    owner = relationship("Customer", back_populates="vehicles")
    estimates = relationship("Estimate", back_populates="vehicle")
    inspections = relationship("Inspection", back_populates="vehicle")

class Estimate(Base):
    __tablename__ = "estimates"

    estimate_id = Column(Integer, primary_key=True, index=True)
    vehicle_id = Column(Integer, ForeignKey("vehicles.vehicle_id"))
    estimate_date = Column(Date)
    total_amount = Column(DECIMAL(10, 2))
    notes = Column(Text)
    status = Column(String(20))

    vehicle = relationship("Vehicle", back_populates="estimates")
    parts = relationship("EstimateItem", back_populates="estimate")
    labor = relationship("LaborOperation", back_populates="estimate")

class EstimateItem(Base):
    __tablename__ = "estimate_items"

    item_id = Column(Integer, primary_key=True, index=True)
    estimate_id = Column(Integer, ForeignKey("estimates.estimate_id"))
    description = Column(String(255))
    quantity = Column(DECIMAL(10, 2))
    unit_price = Column(DECIMAL(10, 2))
    line_total = Column(DECIMAL(10, 2))
    category = Column(String(50))

    estimate = relationship("Estimate", back_populates="parts")

class LaborOperation(Base):
    __tablename__ = "labor_operations"

    operation_id = Column(Integer, primary_key=True, index=True)
    estimate_id = Column(Integer, ForeignKey("estimates.estimate_id"))
    labor_description = Column(String(255))
    hours = Column(DECIMAL(5, 2))
    rate = Column(DECIMAL(10, 2))
    technician = Column(String(100))

    estimate = relationship("Estimate", back_populates="labor")

class Inspection(Base):
    __tablename__ = "inspections"

    inspection_id = Column(Integer, primary_key=True, index=True)
    vehicle_id = Column(Integer, ForeignKey("vehicles.vehicle_id"), nullable=False)
    customer_id = Column(Integer, ForeignKey("customers.customer_id"), nullable=False)
    technician_id = Column(Integer, nullable=True)
    date_performed = Column(DateTime, nullable=False)
    status = Column(String, default="Pending")
    notes = Column(Text)

    vehicle = relationship("Vehicle", back_populates="inspections")
    customer = relationship("Customer")
    results = relationship("InspectionResult", back_populates="inspection")

class InspectionChecklist(Base):
    __tablename__ = "inspection_checklists"

    checklist_id = Column(Integer, primary_key=True, index=True)
    name = Column(String, nullable=False)
    description = Column(Text)

    items = relationship("ChecklistItem", back_populates="checklist")

class ChecklistItem(Base):
    __tablename__ = "checklist_items"

    item_id = Column(Integer, primary_key=True, index=True)
    checklist_id = Column(Integer, ForeignKey("inspection_checklists.checklist_id"), nullable=False)
    description = Column(String, nullable=False)
    category = Column(String)
    is_required = Column(Boolean, default=True)

    checklist = relationship("InspectionChecklist", back_populates="items")
    results = relationship("InspectionResult", back_populates="item")

class InspectionResult(Base):
    __tablename__ = "inspection_results"

    result_id = Column(Integer, primary_key=True, index=True)
    inspection_id = Column(Integer, ForeignKey("inspections.inspection_id"), nullable=False)
    item_id = Column(Integer, ForeignKey("checklist_items.item_id"), nullable=False)
    condition = Column(String, nullable=False)
    notes = Column(Text)
    image_url = Column(String)

    inspection = relationship("Inspection", back_populates="results")
    item = relationship("ChecklistItem", back_populates="results")
