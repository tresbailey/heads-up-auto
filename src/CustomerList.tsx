// src/pages/CustomerListPage.tsx
import React, { useEffect, useState } from "react";
import { useNavigate, Link } from 'react-router-dom';
import axios from "axios";
import Navbar from "./Navbar";

interface Customer {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  address: string;
}

export default function CustomerList() {
  const [customers, setCustomers] = useState<Customer[]>([]);

  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        const res = await axios.get("http://localhost:8000/customers");
        setCustomers(res.data);
      } catch (error) {
        console.error("Failed to fetch customers:", error);
      }
    };
    fetchCustomers();
  }, []);

    const navigate = useNavigate();

  const goToRoute = (route) => {
    navigate(route);
  };

  return (
      <div className="p-6 space-y-4">
          <Navbar />
      <h1 className="text-2xl font-bold mb-4">Customer List</h1>
      <button type="button" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800" onClick={() => goToRoute('/customer')}>Create New</button>

      <table className="min-w-full bg-white border border-gray-200">
        <thead>
          <tr>
            <th className="px-4 py-2 border">ID</th>
            <th className="px-4 py-2 border">First Name</th>
            <th className="px-4 py-2 border">Last Name</th>
            <th className="px-4 py-2 border">Email</th>
            <th className="px-4 py-2 border">Phone</th>
            <th className="px-4 py-2 border">Address</th>
          </tr>
        </thead>
        <tbody>
          {customers.map((customer) => (
            <tr key={customer.id} className="hover:bg-gray-50">
              <td className="px-4 py-2 border"><Link to={`/customers/${customer.customer_id}`} className="text-blue-500 hover:underline">{customer.customer_id}</Link></td>
              <td className="px-4 py-2 border">{customer.first_name}</td>
              <td className="px-4 py-2 border">{customer.last_name}</td>
              <td className="px-4 py-2 border">{customer.email}</td>
              <td className="px-4 py-2 border">{customer.phone}</td>
              <td className="px-4 py-2 border">{customer.address}</td>
            </tr>
          ))}
        </tbody>
    </table>
    </div>
  );
}

