import React from "react";
import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="bg-blue-700 text-white px-4 py-3 shadow-md">
      <div className="max-w-6xl mx-auto flex justify-between items-center">
        <h1 className="text-lg font-bold">Vehicle Data</h1>
        <ul className="flex gap-6 text-sm">
          <li>
            <Link to="/" className="hover:underline">
              Home
            </Link>
          </li>
          <li>
            <Link to="/customers" className="hover:underline">
              Customers
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}
