import React, { useState } from "react";
import axios from "axios";
import { ChecklistItem } from "./types";
import ChecklistItemForm from "./ChecklistItemForm";

export default function ChecklistItemModal( { checklist } ) {
  const [isOpen, setIsOpen] = useState(false);
  const [item, setItem] = useState<ChecklistItem>({
    checklist_id: checklist.checklist_id,
    name: "",
    description: "",
    order: "",
    status: "",
    category: "",
    is_required: false,
  });

    /*
    useEffect(() => {
        if (isOpen) {
            try {
                setLoading(true);
        }

    }, [isOpen]);
     */

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
    setIsOpen(false);
    };


  return (
    <div>
              <button onClick={(e) => { e.preventDefault(); setIsOpen(true); }} className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
          Add Items
      </button>

      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50 w-full py-9 h-half">
          <div className="bg-white rounded-xl shadow-lg w-full max-w-2xl p-6 relative">
            <button onClick={() => setIsOpen(false)} className="absolute top-2 right-2 text-gray-600 hover:text-red-600">
              &times;
            </button>
            <ChecklistItemForm checklist_id={checklist.checklist_id} />
        </div>
        </div>
      )}
    </div>
  );
}

