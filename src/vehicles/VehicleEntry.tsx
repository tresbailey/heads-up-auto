import React, { useState } from "react";
import axios from "axios";

import { Vehicle } from "./types";

import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";


export default function VehicleEntry({vin, setVin, vehicle, setVehicle}) {
  const [submissionSuccess, setSubmissionSuccess] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

    const handleVinLookupSubmit = async (e) => {
        e.preventDefault();
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
    } catch (err: any) {
      setError(err.message || "Failed to fetch VIN data");
    } finally {
      setLoading(false);
    }
  } 

    return (
<div class="w-full max-w-sm p-4 bg-white border border-gray-200 rounded-lg shadow-sm sm:p-6 md:p-8 dark:bg-gray-800 dark:border-gray-700">
    <form class="space-y-6" action="#">
        <h5 class="text-xl font-medium text-gray-900 dark:text-white">Lookup a New Vehicle</h5>
        <div>
            <label for="email" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">VIN Number</label>
            <input type="text" name="vin" id="vin" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" placeholder="Enter VIN" onChange={(e) => setVin(e.target.value)} required />
        </div>
        <button onClick={handleVinLookupSubmit} className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Decode VIN</button>
    </form>
</div>


    )
}

