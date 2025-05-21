import React, { useState } from "react";
import axios from "axios";
import { LaborOperation } from "./types";
import Navbar from "./Navbar";

import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";


export default function LaborOperationTable ({ estimate }) {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    return (
        <div>
                <h2 className="text-xl font-semibold mb-2">Labor Operations</h2>
                <table className="w-full table-auto border">
                    <thead>
                        <tr className="bg-gray-100">
                            <th className="border px-4 py-2">ID</th>
                            <th className="border px-4 py-2">Operation</th>
                            <th className="border px-4 py-2">Hours</th>
                        </tr>
                    </thead>
                    <tbody>
                        {estimate.labor.map(op => (
                            <tr key={op.operation_id}>
                                <td className="border px-4 py-2">{op.operation_id}</td>
                                <td className="border px-4 py-2">{op.labor_description}</td>
                                <td className="border px-4 py-2">{op.hours}</td>
                            </tr>
                    ))}
                </tbody>
            </table>

        </div>
    )}
