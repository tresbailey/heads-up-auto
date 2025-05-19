import React, { useState } from "react";
import axios from "axios";
import Navbar from "./Navbar";

import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

interface Customer {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  address: string;
}

interface Vehicle {
  vin: string;
  make: string;
  model: string;
  year: number;
  mileage: number;
  license_plate: string;
}

export default function CustomerDetailPage() {
  const { id } = useParams();
  const [customer, setCustomer] = useState<Customer | null>(null);
  const [showVehicleForm, setShowVehicleForm] = useState(false);
  const [vehicle, setVehicle] = useState<Vehicle>({
    vin: "",
    make: "",
    model: "",
    mileage: 0,
    license_plate: "",
    year: new Date().getFullYear(),
  });
  const [submissionSuccess, setSubmissionSuccess] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios
      .get(`http://localhost:8000/customers/${id}`)
      .then((res) => setCustomer(res.data))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [id]);

  const handleVehicleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!id) return;

    try {
      await axios.post("http://localhost:8000/vehicles", {
        ...vehicle,
        customer_id: parseInt(id),
      });
      setSubmissionSuccess(true);
      setShowVehicleForm(false);
      setVehicle({
        vin: "",
        make: "",
        model: "",
        year: new Date().getFullYear(),
      });
    } catch (err) {
      console.error("Failed to submit vehicle", err);
    }
  };

  if (loading) return <div className="p-4">Loading...</div>;
  if (error) return <div className="p-4 text-red-500">Error: {error}</div>;
  if (!customer) return <div className="p-4">No customer found</div>;

  return (
    <div className="p-6 space-y-4">
      <Navbar />
      <h1 className="text-2xl font-bold mb-4">
        {customer.first_name} {customer.last_name}
      </h1>
      <p>Email: {customer.email}</p>
      <p>Phone: {customer.phone}</p>
      <p>Address: {customer.address}, {customer.city}, {customer.state} {customer.zip_code}</p>

      <h2 className="text-xl font-semibold mt-6 mb-2">Vehicles</h2>
      <table className="min-w-full bg-white border border-gray-200">
        <thead>
          <tr>
            <th className="px-4 py-2 border">VIN</th>
            <th className="px-4 py-2 border">Year</th>
            <th className="px-4 py-2 border">Make</th>
            <th className="px-4 py-2 border">Model</th>
            <th className="px-4 py-2 border">License</th>
            <th className="px-4 py-2 border">Mileage</th>
          </tr>
        </thead>
        <tbody>
          {customer.vehicles.map((vehicle) => (
            <tr key={vehicle.vehicle_id} className="hover:bg-gray-50">
              <td className="px-4 py-2 border"><Link to={`/decode:${vehicle.vehicle_id}`} className="text-blue-500 hover:underline">{vehicle.vin}</Link></td>
              <td className="px-4 py-2 border">{vehicle.year}</td>
              <td className="px-4 py-2 border">{vehicle.make}</td>
              <td className="px-4 py-2 border">{vehicle.model}</td>
              <td className="px-4 py-2 border">{vehicle.license_plate}</td>
              <td className="px-4 py-2 border">{vehicle.mileage}</td>
            </tr>
        ))}
      </tbody>
    </table>
  <button
    className="bg-blue-600 text-white px-4 py-2 rounded mb-4"
    onClick={() => setShowVehicleForm(!showVehicleForm)}
  >
    {showVehicleForm ? "Cancel" : "Add New Vehicle"}
  </button>
  {showVehicleForm && (
    <form onSubmit={handleVehicleSubmit} className="space-y-4 bg-gray-100 p-4 rounded">
      <div>
        <label className="block">VIN:</label>
        <input
          type="text"
          className="border p-2 w-full"
          value={vehicle.vin}
          onChange={(e) => setVehicle({ ...vehicle, vin: e.target.value })}
          required
        />
      </div>
      <div>
        <label className="block">Make:</label>
        <input
          type="text"
          className="border p-2 w-full"
          value={vehicle.make}
          onChange={(e) => setVehicle({ ...vehicle, make: e.target.value })}
          required
        />
      </div>
      <div>
        <label className="block">Model:</label>
        <input
          type="text"
          className="border p-2 w-full"
          value={vehicle.model}
          onChange={(e) => setVehicle({ ...vehicle, model: e.target.value })}
          required
        />
      </div>
      <div>
        <label className="block">Year:</label>
        <input
          type="number"
          className="border p-2 w-full"
          value={vehicle.year}
          onChange={(e) => setVehicle({ ...vehicle, year: parseInt(e.target.value) })}
          required
        />
      </div>
      <button
        type="submit"
        className="bg-green-600 text-white px-4 py-2 rounded"
      >
        Submit Vehicle
      </button>
    </form>
)}

{submissionSuccess && (
  <div className="text-green-700 mt-4">Vehicle successfully added!</div>
)}
    </div>
  );
}

