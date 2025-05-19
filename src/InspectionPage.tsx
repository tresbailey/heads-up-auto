import React, { useState } from "react";
import axios from "axios";
import Navbar from "./Navbar";

export default function InspectionPage() {
  const [inspection, setInspection] = useState({
    vehicle_id: "",
    customer_id: "",
    technician_id: "",
    date_performed: new Date().toISOString().slice(0, 16),
    status: "Pending",
    notes: "",
  });

  const [checklist, setChecklist] = useState({
    name: "",
    description: "",
  });

  const handleInspectionChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setInspection({ ...inspection, [e.target.name]: e.target.value });
  };

  const handleChecklistChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setChecklist({ ...checklist, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    try {
      const inspectionRes = await axios.post("http://localhost:8000/inspections", inspection);
      console.log("Created Inspection:", inspectionRes.data);

      const checklistRes = await axios.post("http://localhost:8000/inspections/checklists", checklist);
      console.log("Created Checklist:", checklistRes.data);

      alert("Inspection and checklist submitted successfully!");
    } catch (error) {
      console.error("Error submitting inspection or checklist", error);
      alert("Error occurred while submitting.");
    }
  };

  return (
      <div className="p-6 space-y-4">
          <Navbar />
      <h1 className="text-2xl font-bold mb-4">Create Inspection</h1>
      <div className="space-y-4">
        <input name="vehicle_id" placeholder="Vehicle ID" className="input" onChange={handleInspectionChange} />
        <input name="customer_id" placeholder="Customer ID" className="input" onChange={handleInspectionChange} />
        <input name="technician_id" placeholder="Technician ID" className="input" onChange={handleInspectionChange} />
        <input type="datetime-local" name="date_performed" className="input" value={inspection.date_performed} onChange={handleInspectionChange} />
        <input name="status" placeholder="Status" className="input" onChange={handleInspectionChange} />
        <textarea name="notes" placeholder="Notes" className="textarea" onChange={handleInspectionChange} />
      </div>

      <h2 className="text-xl font-semibold mt-8 mb-2">Checklist</h2>
      <div className="space-y-4">
        <input name="name" placeholder="Checklist Name" className="input" onChange={handleChecklistChange} />
        <textarea name="description" placeholder="Checklist Description" className="textarea" onChange={handleChecklistChange} />
      </div>

      <button className="mt-6 btn btn-primary" onClick={handleSubmit}>Submit</button>
    </div>
  );
}
