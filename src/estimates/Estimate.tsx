import React, { useState } from "react";
import axios from "axios";
import { Estimate, EstimateItem, LaborOperation } from "./types";
import Navbar from "./Navbar";
import EstimateForm from "./EstimateForm";
import EstimatePartsTable from "./EstimateParts";
import LaborOperationsTable from "./LaborOperations";

import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";


export default function EstimateEntry({ vehicle }) {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const [estimate, setEstimate] = useState<Estimate>({
        estimate_id: "",
        vehicle_id: "",
        estimate_date: new Date(),
        total_amount: 0,
        notes: "",
        status: "",
        parts: [],
        labor: []
    });
    const [activeTab, setActiveTab] = useState("parts");
    const [checklistItems, setChecklistItems] = useState<ChecklistItem[]>([]);
    const [estimateItems, setEstimateItems] = useState<EstimateItem[]>([]);
    const [laborOperations, setLaborOperations] = useState<LaborOperation[]>([]);



    return (
        <div className="p-6 space-y-4">
            <h1 className="text-2xl font-bold mb-4">
            </h1>
            <EstimateForm estimate={estimate} vehicle_id={vehicle.id} />
        {vehicle.estimates.map( (est) => (
            <div>
                <div className="mt-6">
                    <h2 className="text-xl font-semibold mb-2">Estimate Result</h2>
                    <p><strong>Estimates Status:</strong> {est.status}</p>
                </div>
                <div className="mb-4">
                    <button
                        onClick={() => setActiveTab("parts")}
                        className={`mr-4 px-4 py-2 ${activeTab === "parts" ? "bg-blue-600 text-white" : "bg-gray-300"}`}
                    >
                        Parts
                    </button>
                    <button
                        onClick={() => setActiveTab("labor")}
                        className={`px-4 py-2 ${activeTab === "labor" ? "bg-blue-600 text-white" : "bg-gray-300"}`}
                    >
                        Operations
                    </button>
                </div>
                {activeTab == "parts" && (
                    <EstimatePartsTable estimate={est} />
                )}
            {activeTab == "labor" && (
                <LaborOperationsTable estimate={est} />
            )}
        </div>
))}
        </div>
)}
