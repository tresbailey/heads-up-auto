import React, { useState } from "react";
import axios from "axios";
import { LaborOperation } from "./types";
import InspectionResult from "./InspectionResult";
import InspectionForm from "./InspectionForm";

import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";


export default function InspectionBase({ vehicle }) {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const [inspection, setInspection] = useState<InspectionResult>({
        inspection_id: 0,
        notes: "",
        passed: false,
    });
    const [showInspectionForm, setShowInspectionForm] = useState(true);

    return (
        <div className="p-6 space-y-4">
            <InspectionForm inspection={inspection} vehicle_id={vehicle.id} />
        <div>
            {!showInspectionForm && (
                <button
                    className="bg-blue-600 text-white px-4 py-2 rounded mb-4"
                    onClick={() => setShowInspectionForm(!showInspectionForm)}
                >
                    {"Start Inspection"}
                </button>
            )}
        {vehicle.inspections.map((inspection) => (
            <div>
                <div className="mt-6">
                    <h2 className="text-xl font-semibold mb-2">Inspection Result</h2>
                    <p><strong>Inspection Status:</strong> {inspection.status}</p>
                </div>
                <h2 className="text-xl font-semibold mb-2">Checklist Items</h2>
                <table className="w-full table-auto border">
                    <thead>
                        <tr className="bg-gray-100">
                            <th className="border px-4 py-2">ID</th>
                            <th className="border px-4 py-2">Condition</th>
                            <th className="border px-4 py-2">Notes</th>
                            <th className="border px-4 py-2">Images</th>
                        </tr>
                    </thead>
                    <tbody>
                        {inspection.results.map(item => (
                            <InspectionResult inspectionItem={item} />
                    ))}
                </tbody>
            </table>
        </div>
))}
        </div>

        </div>
)}

