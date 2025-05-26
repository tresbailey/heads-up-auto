import React, { useState } from "react";
import axios from "axios";
import { Checklist } from "./types";

import { useEffect, useState } from "react";


export default function ChecklistForm({}) {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [checklist, setChecklist] = useState<Checklist>({
        name: "",
        description: "",
    });
    const [showChecklistForm, setShowChecklistForm] = useState(false);

    const handleChecklistSubmit = async () => {
        try {
            setLoading(true);
            await axios.post('http://localhost:8000/checklists', {
                ...checklist
            });
        } catch(err) {
            console.error('Failed to submit Checklist', err);
        } finally {
            setLoading(false);
        }
    };


    return (
        <div>
            {!showChecklistForm &&(
            <button
        className="bg-blue-600 text-white px-4 py-2 rounded mb-4"
        onClick={() => setShowChecklistForm(!showChecklistForm)}
    >
        {"New Checklist"}
    </button>
            )}
    {showChecklistForm && (
        <form onSubmit={handleChecklistSubmit} className="space-y-4 bg-gray-100 p-4 rounded">
            <div>
                <label className="block">Name:</label>
                <input
                    type="text"
                    className="border p-2 w-full"
                    value={checklist.name}
                    onChange={(e) => setChecklist({ ...checklist, name: e.target.value })}
                    required
                />
            </div>
            <div>
                <label className="block">Description:</label>
                <input
                    type="text"
                    className="border p-2 w-full"
                    value={checklist.description}
                    onChange={(e) => setChecklist({ ...checklist, description: e.target.value })}
                    required
                />
            </div>
            <button
                type="submit"
                className="bg-green-600 text-white px-4 py-2 rounded"
            >
                Submit Checklist
            </button>
            <button
        className="bg-blue-600 text-white px-4 py-2 rounded mb-4"
        onClick={() => setShowChecklistForm(!showChecklistForm)}
    >
        {"Cancel"}
    </button>
        </form>
    )}
</div>
)}

