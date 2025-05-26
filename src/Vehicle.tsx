import React, { useState } from "react";
import axios from "axios";
import Navbar from "./Navbar";
import { Estimate, Vehicle, ChecklistItem, InspectionResult, InspectionItem } from "./types";
import EstimateEntry from "./estimates/Estimate";
import InspectionBase from "./inspections/Inspection";

import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";



export default function VehicleDetailPage() {
    const { id } = useParams();
    const [vehicle, setVehicle] = useState<Vehicle | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const [activeTab, setActiveTab] = useState("inspections");

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
        <InspectionBase vehicle={vehicle} />
    )}

        {activeTab === "estimates" && (
            <EstimateEntry vehicle={vehicle} />
        )}
    </div>
);
}
