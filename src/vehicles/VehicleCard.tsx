import React, { useState } from "react";
import axios from "axios";

import { Vehicle } from "./types";

import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";


export default function VehicleCard({vehicle, setVehicle, updateVehicle}) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

    return (
<div class="inline-block px-3 w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700">
    <div class="flex justify-end px-4 pt-4">
        <button id="dropdownButton" data-dropdown-toggle="dropdown" class="inline-block text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 focus:ring-4 focus:outline-none focus:ring-gray-200 dark:focus:ring-gray-700 rounded-lg text-sm p-1.5" type="button">
            <span class="sr-only">Open dropdown</span>
            <svg class="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 16 3">
                <path d="M2 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm6.041 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM14 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Z"/>
            </svg>
        </button>
        <div id="dropdown" class="z-10 hidden text-base list-none bg-white divide-y divide-gray-100 rounded-lg shadow-sm w-44 dark:bg-gray-700">
            <ul class="py-2" aria-labelledby="dropdownButton">
            <li>
                <a href="#" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Edit Vehicle</a>
            </li>
            <li>
                <a href="#" class="block px-4 py-2 text-sm text-red-600 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Delete</a>
            </li>
            </ul>
        </div>
    </div>
    <div class="flex flex-col items-center pb-10">
        <img className="w-24 h-24 mb-3 rounded-full shadow-lg" src="/docs/images/people/profile-picture-3.jpg" altText="{vehicle.year} {vehicle.make} {vehicle.model}"/>
        <h5 class="mb-1 text-xl font-medium text-gray-900 dark:text-white">{vehicle.year} {vehicle.make} {vehicle.model}</h5>
        <span class="text-sm text-gray-500 dark:text-gray-400">{vehicle.vin}</span>
        <div>
            <label for="mileage" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Mileage</label>
            <input type="text" name="mileage" id="mileage" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" placeholder="Mileage" onChange={(e) => setVehicle({ ...vehicle, mileage: e.target.value})} required />
        </div>
        <div>
            <label for="license_plate" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">License Plate</label>
            <input type="text" name="license_plate" id="license_plate" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" placeholder="License Plate #" onChange={(e) => setVehicle({ ...vehicle, license_plate: e.target.value})} required />
        </div>
        <div className="flex mt-4 md:mt-6">
        <button onClick={updateVehicle} className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Save Vehicle</button>

        </div>
    </div>
</div>

    )
}
