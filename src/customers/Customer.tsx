import React, { useState } from "react";
import axios from "axios";
import Navbar from "../Navbar";
import { Customer, Vehicle } from "./types";
import VehicleEntry from "../vehicles/VehicleEntry";
import VehicleCard from "../vehicles/VehicleCard";

import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

export default function CustomerDetailPage() {
  const { id } = useParams();
  const [customer, setCustomer] = useState<Customer | null>(null);
  const [showVehicleForm, setShowVehicleForm] = useState(false);
  const [vin, setVin] = useState("");
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

  const handleVinLookupSubmit = async () => {
    if (!vin) return;
    try {
      setLoading(true);
      const response = await axios.get(
        `https://vpic.nhtsa.dot.gov/api/vehicles/decodevin/${vin}?format=json`)
      const vehicleResponse = response.data.Results.reduce(
        (obj, item) => { 
          if (item.Variable && item.Value) {
            obj[item.Variable.toLowerCase()] = item.Value;
          }
          return obj;
        }, {});
      const vehicleToSubmit : Vehicle = {
        vin: vin,
        make: vehicleResponse.make,
        model: vehicleResponse.model,
        year: Number(vehicleResponse["model year"]),
        mileage: 0,
        license_plate: "",
      };
      setVehicle(vehicleToSubmit);
      try {
        setLoading(true);
        await axios.post("http://localhost:8000/vehicles", {
          ...vehicleToSubmit,
          customer_id: parseInt(id),
        });
        setSubmissionSuccess(true);
      } catch (err) {
        console.error("Failed to submit vehicle", err);
      } finally {
        setLoading(false);
      }

    } catch (err: any) {
      setError(err.message || "Failed to fetch VIN data");
    } finally {
      setLoading(false);
    }
    axios
      .get(`http://localhost:8000/customers/${id}`)
      .then((res) => setCustomer(res.data))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
    setShowVehicleForm(false);
  } 

  const createVehicle = async (vehicle: Vehicle) => {
      try {
        setLoading(true);
        await axios.post("http://localhost:8000/vehicles", {
          ...vehicle,
          customer_id: parseInt(id),
        });
        setSubmissionSuccess(true);
      } catch (err) {
        console.error("Failed to submit vehicle", err);
      } finally {
        setLoading(false);
      }


  }

    const updateVehicle = async (e) => {
        e.preventDefault();
        try {
      const response = await axios.put(
          `http://localhost:8000/vehicles/${vehicle.vehicle_id}`,{
              ...vehicle,
          customer_id: parseInt(id),
          });
        } catch (err: any) {
            setError(err.messgae || "Could not save vehicle updates");
        } finally {
            setLoading(false);
        }
    }

  const handleVehicleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!id) return;

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
      <div className="flex flex-col w-full overflow-x-scroll pb-10 hide-scroll-bar">
          <div className="flex flex-nowrap">
          {customer && customer.vehicles.map((vehicle) => (
                  <VehicleCard vehicle={vehicle} setVehicle={setVehicle} updateVehicle={updateVehicle} />
              ))}
            <VehicleEntry vin={vin} setVin={setVin} setVehicle={createVehicle} vehicle={vehicle}/>
            </div>
        </div>
    <button
      className="bg-blue-600 text-white px-4 py-2 rounded mb-4"
      onClick={() => setShowVehicleForm(!showVehicleForm)}
    >
      {showVehicleForm ? "Cancel" : "Add New Vehicle"}
    </button>
    {showVehicleForm && (
        <div>
        <input
          className="border p-2 rounded w-full mb-2"
          placeholder="Enter VIN"
          value={vin}
          onChange={(e) => setVin(e.target.value)}
        />
        <button
          onClick={handleVinLookupSubmit}
          className="px-4 py-2 bg-blue-600 text-white rounded"
        >
          Decode

        </button>
      </div>
  )}

    {submissionSuccess && (
      <div className="text-green-700 mt-4">Vehicle successfully added!</div>
    )}
  </div>
);
}

