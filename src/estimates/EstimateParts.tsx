import React, { useState } from "react";
import axios from "axios";
import { EstimateItem } from "./types";
import Navbar from "./Navbar";

import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";


export default function EstimatePartsTable ({ estimate }) {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const [estimateItem, setEstimateItem] = useState<EstimateItem>({
        item_id: "",
        estimate_id: "",
        description: "",
        unit_price: 0,
    });

    return (
    <div>
                    <h2 className="text-xl font-semibold mb-2">Estimate Parts</h2>
                    <table className="w-full table-auto border mb-6">
                        <thead>
                            <tr className="bg-gray-100">
                                <th className="border px-4 py-2">ID</th>
                                <th className="border px-4 py-2">Description</th>
                                <th className="border px-4 py-2">Price</th>
                            </tr>
                        </thead>
                        <tbody>
                            {estimate.parts && estimate.parts.map((part) => (
                                <tr key={part.id}>
                                    <td className="border px-4 py-2">{part.item_id}</td>
                                    <td className="border px-4 py-2">{part.description}</td>
                                    <td className="border px-4 py-2">${part.unit_price}</td>
                                </tr>
                        ))}
                    </tbody>
                </table>

    </div>
)}
