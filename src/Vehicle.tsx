import React, { useState } from "react";
import axios from "axios";
import Navbar from "./Navbar";
import { Estimate, Vehicle, ChecklistItem, InspectionResult, InspectionItem } from "./types";
import EstimateEntry from "./estimates/Estimate";

import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";



export default function VehicleDetailPage() {
    const { id } = useParams();
    const [vehicle, setVehicle] = useState<Vehicle | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const [activeTab, setActiveTab] = useState("inspections");
    const [inspectionResult, setInspectionResult] = useState<InspectionResult | null>(null);
    const [showInspectionForm, setShowInspectionForm] = useState(true);

    useEffect(() => {
        axios.get(`http://localhost:8000/vehicles/${id}`)
            .then((res) => setVehicle(res.data))
            .catch((err) => setError(err.message))
            .finally(() => setLoading(false));
    }, [id]);

    const handleInspectionSubmit = async () => {
    };

    if (loading) return <div className="p-4">Loading...</div>;
    if (error) return <div className="p-4 text-red-500">Error: {error}</div>;
    if (!vehicle) return <div className="p-4">No vehicle found</div>;

    return (
        <div className="p-6 space-y-4">
            <Navbar />
            <h1 className="text-2xl font-bold mb-4">
                {vehicle.year} - 
        {vehicle.make} {vehicle.model}
    </h1>
    <p>VIN: {vehicle.vin}</p>
    <p>Mileage: {vehicle.mileage}</p>
    <p>License Plate: {vehicle.license_plate}</p>
    <h1 className="text-2xl font-bold mb-4">Vehicle Detail</h1>
    <div className="mb-4">
        <button
            onClick={() => setActiveTab("inspections")}
            className={`mr-4 px-4 py-2 ${activeTab === "inspections" ? "bg-blue-600 text-white" : "bg-gray-300"}`}
        >
            Inspections
        </button>
        <button
            onClick={() => setActiveTab("estimates")}
            className={`px-4 py-2 ${activeTab === "estimates" ? "bg-blue-600 text-white" : "bg-gray-300"}`}
        >
            Estimates
        </button>
    </div>

    {activeTab === "inspections" && (
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
                            <tr key={item.id}>
                                <td className="border px-4 py-2">{item.item_id}</td>
                                <td className="border px-4 py-2">{item.condition}</td>
                                <td className="border px-4 py-2">{item.notes}</td>
                                <td className="border px-4 py-2">{item.image_url}</td>
                            </tr>
                    ))}
                </tbody>
            </table>
        </div>
))}
        </div>
    )}

        {activeTab === "estimates" && (
            <EstimateEntry vehicle={vehicle} />
        )}
    </div>
);
}
