import React, { useState } from "react";
import axios from "axios";
import Navbar from "./Navbar";

export default function DecodeVIN() {
  const [vin, setVin] = useState("");
  const [decoded, setDecoded] = useState<any | null>(null);
  const [error, setError] = useState("");

  const handleDecode = async () => {
    try {
      const response = await axios.get(
        `https://vpic.nhtsa.dot.gov/api/vehicles/decodevin/${vin}?format=json`,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      decode_data(response.data);
    } catch {
      setError("Failed to decode VIN.");
    }
  };

  return (
    <div className="p-6 spaec-y-4">
        <Navbar />
      <h2 className="text-2xl font-bold mb-4">Decode VIN</h2>
      <input
        className="border p-2 rounded w-full mb-2"
        placeholder="Enter VIN"
        value={vin}
        onChange={(e) => setVin(e.target.value)}
      />
      <button
        onClick={handleDecode}
        className="px-4 py-2 bg-blue-600 text-white rounded"
      >
        Decode
      </button>
      {error && <p className="text-red-500">{error}</p>}
      {decoded && (
        <pre className="bg-gray-100 mt-4 p-4 rounded overflow-auto">
          {JSON.stringify(decoded, null, 2)}
        </pre>
      )}
    </div>
  );
}

