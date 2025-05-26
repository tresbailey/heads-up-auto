import React, { useState } from "react";
import axios from "axios";
import Navbar from "../Navbar";
import { InspectionChecklist } from "./types";
import ChecklistForm from "./ChecklistForm";
import ChecklistItemModal from "./ChecklistItem";

import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";


export default function ChecklistBase({ }) {
    const { id } = useParams();
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    const [showChecklistForm, setShowChecklistForm] = useState(false);

    const [checklists, setChecklists] = useState<InspectionChecklist[]>([]);

    useEffect(() => {
        axios
            .get(`http://localhost:8000/checklists`)
            .then((res) => setChecklists(res.data))
            .catch((err) => setError(err.message))
            .finally(() => setLoading(false));
    }, []);

    return (
        <div className="p-6 space-y-4">
            <Navbar />
            <h1 className="text-2xl font-bold mb-4">
                Inspection Checklists
            </h1>
            <ChecklistForm />
            <table className="w-full table-auto border">
                <thead>
                    <tr className="bg-gray-100">
                        <th className="border px-4 py-2">ID</th>
                        <th className="border px-4 py-2">Name</th>
                        <th className="border px-4 py-2">Description</th>
                        <th className="border px-4 py-2">Steps</th>
                    </tr>
                </thead>
            <tbody>
                {checklists.map((checklist) => (
                    <tr>
                        <td className="border px-4 py-2">{checklist.checklist_id}</td>
                        <td className="border px-4 py-2">{checklist.name}</td>
                        <td className="border px-4 py-2">{checklist.description}</td>
                        <td className="border px-4 py-2"><ChecklistItemModal checklist={checklist} /></td>
                    </tr>
            ))}
            </tbody>
        </table>
    </div>
    )}


