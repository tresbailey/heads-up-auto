import React, { useState } from "react";
import { Estimate, Vehicle, ChecklistItem, InspectionResult, InspectionItem } from "./types";

export default function InspectionResult ({inspectionItem}) {

    return (
        <tr key={inspectionItem.id}>
            <td className="border px-4 py-2">{inspectionItem.item_id}</td>
            <td className="border px-4 py-2">{inspectionItem.condition}</td>
            <td className="border px-4 py-2">{inspectionItem.notes}</td>
            <td className="border px-4 py-2">{inspectionItem.image_url}</td>
        </tr>

)}
