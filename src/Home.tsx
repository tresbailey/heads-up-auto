import React from "react";
import { Link } from "react-router-dom";
import Navbar from "./Navbar";

export default function Home() {
  return (
    <div className="p-6 space-y-4">
        <Navbar />
      <h1 className="text-3xl font-bold">Vehicle Data Tools</h1>
      <ul className="space-y-2">
        <li><Link to="/repairs" className="text-blue-600 underline">Search Vehicle Repairs</Link></li>
        <li><Link to="/decode" className="text-blue-600 underline">VIN Decoder</Link></li>
      </ul>
    </div>
  );
}

