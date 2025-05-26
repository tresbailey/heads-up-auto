import React, { useState } from "react";
import axios from "axios";
import { Estimate, EstimateItem, LaborOperation } from "./types";
import Navbar from "./Navbar";
import EstimatePartsTable from "./EstimateParts";
import LaborOperationsTable from "./LaborOperations";

import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";


export default function EstimateForm({ estimate, vehicle_id }) {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [showEstimateForm, setShowEstimateForm] = useState(false);

    const handleEstimateSubmit = async () => {
        try {
            setLoading(true);
            await axios.post('http://localhost:8000/estimates', {
                ...estimate,
                vehicle_id: vehicle_id,
            });
        } catch(err) {
            console.error('Failed to submit estimate', err);
        } finally {
            setLoading(false);
        }
    };

    function EstimateButton() {return (<button
        className="bg-blue-600 text-white px-4 py-2 rounded mb-4"
        onClick={() => setShowEstimateForm(!showEstimateForm)}
    >
        {showEstimateForm ? "Cancel" : "Start New Estimate"}
    </button>)};

    return (
        <div>
            {!showEstimateForm &&(
                <EstimateButton />
            )}
    {showEstimateForm && (
        <form onSubmit={handleEstimateSubmit} className="space-y-4 bg-gray-100 p-4 rounded">
            <div>
                <label className="block">VIN:</label>
                <input
                    type="text"
                    className="border p-2 w-full"
                    value={estimate.estimate_date}
                    onChange={(e) => setEstimate({ ...estimate, estimate_date: e.target.value })}
                    required
                />
            </div>
            <div>
                <label className="block">Notes:</label>
                <input
                    type="text"
                    className="border p-2 w-full"
                    value={estimate.notes}
                    onChange={(e) => setEstimate({ ...estimate, notes: e.target.value })}
                    required
                />
            </div>
            <div>
                <label className="block">Status:</label>
                <input
                    type="text"
                    className="border p-2 w-full"
                    value={estimate.status}
                    onChange={(e) => setEstimate({ ...estimate, status: e.target.value })}
                    required
                />
            </div>
            <button
                type="submit"
                className="bg-green-600 text-white px-4 py-2 rounded"
            >
                Submit Estimate
            </button>
            <EstimateButton />
        </form>
    )}
</div>

    )}
