import React, { useState } from "react";
import axios from "axios";
import { ChecklistItem } from "./types";

export default function ChecklistItemForm( { checklist_id } ) {
    const [showForm, setShowForm] = useState(false);
  const [item, setItem] = useState<ChecklistItem>({
    checklist_id: checklist_id,
    name: "",
    description: "",
    order: "",
    status: "",
    category: "",
    is_required: false,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

    const handleSubmit = async () => {
        try {
            setLoading(true);
            await axios.post(`http://localhost:8000/checklists/${inspection.inspection_id}/items`, {
                ...item
            });
        } catch(err) {
            console.error('Failed to submit Checklist', err);
        } finally {
            setLoading(false);
        }
  };

    return (
        <div className="">
            <h2 className="text-xl font-bold mb-4">Add Inspection Item</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block mb-1 font-medium">Name</label>
                <input
                  type="text"
                  name="name"
                  value={item.name}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded p-2"
                  required
                />
              </div>
              <div>
                <label className="block mb-1 font-medium">Description</label>
                <textarea
                  name="description"
                  value={item.description}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded p-2"
                />
              </div>
              <div>
                <label className="block mb-1 font-medium">Status</label>
                <input
                  type="text"
                  name="status"
                  value={item.status}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded p-2"
                />
              </div>
              <div>
                <label className="block mb-1 font-medium">Category</label>
                <input
                  type="text"
                  name="category"
                  value={item.category}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded p-2"
                />
              </div>
              <div>
                <label className="block mb-1 font-medium">Required</label>
                <input
                  type="radio"
                  name="is_required"
                  value={item.is_required}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded p-2"
                />
              </div>
              <div>
                <label className="block mb-1 font-medium">Order</label>
                <input
                  type="text"
                  name="image_url"
                  value={item.order}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded p-2"
                />
              </div>
              <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
                Submit
              </button>
            </form>
</div>
  );
}
