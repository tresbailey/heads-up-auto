import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./index.css";
import VehicleRepairSearch from "./VehicleRepairSearch";
import Home from "./Home";
import CustomerList from "./customers/CustomerList";
import CreateCustomerPage from "./customers/CreateCustomer";
import CustomerDetailPage from "./customers/Customer";
import VehicleDetailPage from "./Vehicle";
import InspectionPage from './InspectionPage';
import DecodeVIN from "./DecodeVIN";
import ChecklistBase from "./checklists/Checklist";

ReactDOM.createRoot(document.getElementById("root")!).render(
    <React.StrictMode>
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/customers" element={<CustomerList />} />
                <Route path="/customer" element={<CreateCustomerPage/>} />
                <Route path="/newcustomers" element={<CreateCustomerPage />} />
                <Route path="/customers/:id" element={<CustomerDetailPage />} />
                <Route path="/vehicles/:id" element={<VehicleDetailPage />} />
                <Route path="/inspection" element={<InspectionPage />} />
                <Route path="/repairs" element={<VehicleRepairSearch />} />
                <Route path="/decode" element={<DecodeVIN />} />
                <Route path="/checklists" element={<ChecklistBase />} />
            </Routes>
        </BrowserRouter>
    </React.StrictMode>
);
