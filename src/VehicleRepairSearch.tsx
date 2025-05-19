import React, { useState } from "react";
import axios from "axios";
import Navbar from "./Navbar";

const API_KEY = "YOUR_API_KEY_HERE"; // Replace with your actual API key

export default function VehicleRepairSearch() {
  const [vin, setVin] = useState("");
  const [repairs, setRepairs] = useState<any | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSearch = async () => {
    if (!vin) return;
    setLoading(true);
    setError("");
    setRepairs(null);

    try {
      const response = await axios.get(
        `https://api.vehicledatabases.com/vehicle-repairs/v2/\${vin}`,
        {
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${API_KEY}`,
          },
        }
      );
      setRepairs(response.data);
    } catch (err: any) {
      setError("Failed to fetch repair data. Please check the VIN and try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 space-y-4">
        <Navbar />
      <div className="bg-white rounded-2xl shadow-md w-full max-w-xl">
        <h1 className="text-2xl font-bold mb-4">Search Vehicle Repairs by VIN</h1>
        <div className="flex gap-2 mb-4">
          <input
            type="text"
            placeholder="Enter VIN"
            value={vin}
            onChange={(e) => setVin(e.target.value)}
            className="flex-1 p-2 border border-gray-300 rounded-xl focus:outline-none focus:ring focus:border-blue-300"
          />
          <button
            onClick={handleSearch}
            className="px-4 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700"
          >
            Search
          </button>
        </div>
        {loading && <p className="text-gray-500">Loading...</p>}
        {error && <p className="text-red-500">{error}</p>}
        {repairs && (
          <div className="mt-4">
            <h2 className="text-lg font-semibold mb-2">Repair Data</h2>
            <pre className="bg-gray-200 p-4 rounded-xl overflow-x-auto">
              {JSON.stringify(repairs, null, 2)}
            </pre>
          </div>
        )}
      </div>
    </div>
  );
}
