import React, { useState } from "react";
import { useGetShelfListQuery } from "../api-service/shelf/shelf.api";
import { useCreateBookCopyMutation } from "../api-service/bookcopy/bookcopy.api";

function RelocateModal(props:any) {
  const {
    isOpen,
    onClose,
    onRelocate,
    mode = "relocate",
    id
  } = props;

  const { data: shelfData = [] } = useGetShelfListQuery({});
  const [addCopy]=useCreateBookCopyMutation()
  const [selectedOfficeId, setSelectedOfficeId] = useState("");
  const [selectedShelfId, setSelectedShelfId] = useState("");
  const [numCopies, setNumCopies] = useState(1);

  const offices = Array.from(
    new Map(
      shelfData.map((shelf) => [
        shelf.office.id,
        { id: shelf.office.id, name: shelf.office.name },
      ])
    ).values()
  );

  const shelves = shelfData
    .filter((shelf) => String(shelf.office.id) === selectedOfficeId)
    .map((shelf) => ({ id: shelf.id, label: shelf.label }));

  function handleSubmit() {
    if (selectedOfficeId && selectedShelfId) {
      if (mode === "add") {
        onRelocate(selectedOfficeId, selectedShelfId, numCopies);
      } else {
        onRelocate(selectedOfficeId, selectedShelfId);
      }
      setSelectedOfficeId("");
      setSelectedShelfId("");
      setNumCopies(1);
      onClose();
    }
  }

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-xl w-[380px] shadow-lg">
        <h2 className="text-lg font-semibold mb-4">
          {mode === "add" ? "Add Book Copy" : "Relocate Book Copy"}
        </h2>

        <label className="block text-sm mb-1">Select Office</label>
        <select
          value={selectedOfficeId}
          onChange={(e) => {
            setSelectedOfficeId(e.target.value);
            setSelectedShelfId("");
          }}
          className="w-full mb-4 p-2 rounded border border-gray-300 text-sm"
        >
          <option value="">-- Select Office --</option>
          {offices.map((office) => (
            <option key={office.id} value={office.id}>
              {office.name}
            </option>
          ))}
        </select>

        <label className="block text-sm mb-1">Select Shelf</label>
        <select
          value={selectedShelfId}
          onChange={(e) => setSelectedShelfId(e.target.value)}
          disabled={!selectedOfficeId}
          className={`w-full mb-4 p-2 rounded border border-gray-300 text-sm ${
            !selectedOfficeId ? "bg-gray-100" : "bg-white"
          }`}
        >
          <option value="">-- Select Shelf --</option>
          {shelves.map((shelf) => (
            <option key={shelf.id} value={shelf.id}>
              {shelf.label}
            </option>
          ))}
        </select>

        {mode === "add" && (
          <>
            <label className="block text-sm mb-1">Number of Copies</label>
            <input
              type="number"
              min="1"
              value={numCopies}
              onChange={(e) => setNumCopies(Number(e.target.value))}
              className="w-full mb-4 p-2 rounded border border-gray-300 text-sm"
            />
          </>
        )}

        <div className="flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm bg-gray-200 rounded hover:bg-gray-300"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            disabled={!(selectedOfficeId && selectedShelfId)}
            className={`px-4 py-2 text-sm text-white rounded ${
              selectedOfficeId && selectedShelfId
                ? "bg-blue-600 hover:bg-blue-700"
                : "bg-blue-300 cursor-not-allowed opacity-70"
            }`}
          >
            {mode === "add" ? "Add Copies" : "Relocate"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default RelocateModal;
