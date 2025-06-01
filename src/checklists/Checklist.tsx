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

    const TableRows = ({ checklist }) => {
        const [open, setOpen] = useState(false);
        return (
            <>
                <tr>
                    <td
                        className={`py-9 px-2 text-base  font-normal flex items-center justify-center h-full
                    ${ open ? "bg-gray-300" : "bg-white"}
                            `}
                    >
                        <svg
                            className={`text-black w-6 h-6 z-40  ${
                                open ? "rotate-180" : "rotate-270"
                            }`}
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            onClick={() => setOpen(!open)}
                        >
                            <path
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                stroke-width="2"
                                d="M19 9l-7 7-7-7"
                            />
                        </svg>
                    </td>
                    <td className="border px-4 py-2">{checklist.checklist_id}</td>
                    <td className="border px-4 py-2">{checklist.name}</td>
                    <td className="border px-4 py-2">{checklist.description}</td>
                </tr>
                {open && (
                <tr
                    className="bg-gray-300 w-full overflow-hidden transition-[max-height] delay-1000 duration-1000 ease-in-out">
                    <td colSpan={4}>
                        <table className="bg-white w-full table-auto border m-4">
                            <thead>
                                <tr className="bg-gray-100">
                                    <th className="border px-4 py-2">ID</th>
                                    <th className="border px-4 py-2">Name</th>
                                    <th className="border px-4 py-2">Description</th>
                                    <th className="border px-4 py-2">Order</th>
                                    <th className="border px-4 py-2">Status</th>
                                    <th className="border px-4 py-2">Category</th>
                                    <th className="border px-4 py-2">Required</th>
                                </tr>
                            </thead>
                            <tbody>
                                {checklist.items.map((item) => (
                                    <tr>
                                        <td className="border px-4 py-2"></td>
                                        <td className="border px-4 py-2">{item.name}</td>
                                        <td className="border px-4 py-2">{item.description}</td>
                                        <td className="border px-4 py-2">{item.order}</td>
                                        <td className="border px-4 py-2">{item.status}</td>
                                        <td className="border px-4 py-2">{item.category}</td>
                                        <td className="border px-4 py-2">{item.required}</td>
                                    </tr>
                            ))}
                        </tbody>
                    </table>
                    <ChecklistItemModal checklist={checklist} />
                </td>
            </tr>
        )}
        </>
)}

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
                    <th className="border px-4 py-2"></th>
                    <th className="border px-4 py-2">ID</th>
                    <th className="border px-4 py-2">Name</th>
                    <th className="border px-4 py-2">Description</th>
                </tr>
            </thead>
            <tbody>
                {checklists.map((checklist) => (
                    <TableRows checklist={checklist} />
                ))}
            </tbody>
        </table>
    </div>
    )}


