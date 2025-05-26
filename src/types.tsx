interface Customer {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  address: string;
}

interface Estimate {
    estimate_id: string;
    vehicle_id: string;
    estimate_date: Date;
    total_amount: number;
    notes: string;
    status: string;
    parts: EstimateItem[];
    labor: LaborOperation[];
}

interface EstimateItem {
    item_id: number;
    estimate_id: number;
    description: string;
    unit_price: number;
}

interface LaborOperation {
    operation_id: number;
    estimate_id: number;
    labor_description: string;
    hours: number;
}

interface Vehicle {
    vin: string;
    make: string;
    model: string;
    year: number;
    mileage: number;
    license_plate: string;
    inspections: Inspection[];
    estimates: Estimate[];
}

interface Checklist {
    checklist_id: number;
    name: string;
    description: string;
}

interface ChecklistItem {
    id: number;
    checklist_id: number;
    name: string
    description: string;
    order: number;
    status: string;
    category: string;
    is_required: boolean;
}

interface InspectionItem {
    item_id: number;
    condition: string;
    notes: string;
    image_url: string;
}

interface InspectionResult {
    id: number;
    inspection_id: number;
    notes: string;
    passed: boolean;
    items: InspectionItem[];
}

interface InspectionChecklist {
    name: string;
    description: string;
    items: ChecklistItem[];
}
