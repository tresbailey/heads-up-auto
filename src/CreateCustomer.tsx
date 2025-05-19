import React, { useState } from "react";
import Navbar from "./Navbar";

import { useState } from "react";
import axios from "axios";

export default function CreateCustomerPage() {
  const [form, setForm] = useState({
    first_name: "",
    last_name: "",
    phone: "",
    email: "",
    address: "",
    city: "",
    state: "",
    zip_code: "",
  });
  const [message, setMessage] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:8000/customers/", form);
      setMessage("Customer created successfully!");
      setForm({
        first_name: "",
        last_name: "",
        phone: "",
        email: "",
        address: "",
        city: "",
        state: "",
        zip_code: "",
      });
    } catch (err) {
      setMessage("Error creating customer.");
    }
  };

  return (
      <div className="p-4 space-y-4">
          <Navbar />
      <h1 className="text-2xl font-bold mb-4">Create New Customer</h1>
      {message && <p className="mb-4 text-green-600">{message}</p>}
      <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-4">
        {Object.keys(form).map((key) => (
          <input
            key={key}
            name={key}
            value={form[key]}
            onChange={handleChange}
            placeholder={key.replace(/_/g, " ")}
            className="border p-2 rounded"
            required
          />
        ))}
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Submit
        </button>
      </form>
    </div>
  );
}
