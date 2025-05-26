import React, { useState } from "react";
import axios from "axios";
import { InspectionResult, InspectionItem } from "./types";

import { useEffect, useState } from "react";


export default function InspectionForm({ inspection, vehicle_id }) {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [showInspectionForm, setShowInspectionForm] = useState(false);

    const handleInspectionSubmit = async () => {
        try {
            setLoading(true);
            await axios.post('http://localhost:8000/inspections', {
                ...inspection,
                vehicle_id: vehicle_id,
            });
        } catch(err) {
            console.error('Failed to submit Inspection', err);
        } finally {
            setLoading(false);
        }
    };

    function InspectionButton() {return (<button
        className="bg-blue-600 text-white px-4 py-2 rounded mb-4"
        onClick={() => setShowInspectionForm(!showInspectionForm)}
    >
        {showInspectionForm ? "Cancel" : "Start New Inspection"}
    </button>)};

    return (
        <div>
            {!showInspectionForm &&(
                <InspectionButton />
            )}
    {showInspectionForm && (
        <form onSubmit={handleInspectionSubmit} className="space-y-4 bg-gray-100 p-4 rounded">
            <div>
                <label className="block">Passed:</label>
                <input
                    type="text"
                    className="border p-2 w-full"
                    value={inspection.passed}
                    onChange={(e) => setInspection({ ...inspection, passed: e.target.value })}
                    required
                />
            </div>
            <div>
                <label className="block">Notes:</label>
                <input
                    type="text"
                    className="border p-2 w-full"
                    value={inspection.notes}
                    onChange={(e) => setInspection({ ...inspection, notes: e.target.value })}
                    required
                />
            </div>
            <button
                type="submit"
                className="bg-green-600 text-white px-4 py-2 rounded"
            >
                Submit Inspection
            </button>
            <InspectionButton />
        </form>
    )}
</div>
)}
