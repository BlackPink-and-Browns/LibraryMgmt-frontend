import React, { useState } from "react";

function RelocateModal(props) {
  const { isOpen, onClose, onRelocate, offices } = props;

  const [selectedOffice, setSelectedOffice] = useState("");
  const [selectedShelf, setSelectedShelf] = useState("");

  const shelves =
    offices.find((office) => office.name === selectedOffice)?.shelves || [];

  function handleRelocate() {
    if (selectedOffice && selectedShelf) {
      onRelocate(selectedOffice, selectedShelf);
      setSelectedOffice("");
      setSelectedShelf("");
      onClose();
    }
  }

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-xl w-[380px] shadow-lg">
        <h2 className="text-lg font-semibold mb-4">Relocate Book Copy</h2>

        <label className="block text-sm mb-1">Select Office</label>
        <select
          value={selectedOffice}
          onChange={(e) => {
            setSelectedOffice(e.target.value);
            setSelectedShelf("");
          }}
          className="w-full mb-4 p-2 rounded border border-gray-300 text-sm"
        >
          <option value="">-- Select Office --</option>
          {offices.map((office) => (
            <option key={office.name} value={office.name}>
              {office.name}
            </option>
          ))}
        </select>

        <label className="block text-sm mb-1">Select Shelf</label>
        <select
          value={selectedShelf}
          onChange={(e) => setSelectedShelf(e.target.value)}
          disabled={!selectedOffice}
          className={`w-full mb-4 p-2 rounded border border-gray-300 text-sm ${
            !selectedOffice ? "bg-gray-100" : "bg-white"
          }`}
        >
          <option value="">-- Select Shelf --</option>
          {shelves.map((shelf) => (
            <option key={shelf} value={shelf}>
              {shelf}
            </option>
          ))}
        </select>

        <div className="flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm bg-gray-200 rounded hover:bg-gray-300"
          >
            Cancel
          </button>
          <button
            onClick={handleRelocate}
            disabled={!(selectedOffice && selectedShelf)}
            className={`px-4 py-2 text-sm text-white rounded ${
              selectedOffice && selectedShelf
                ? "bg-blue-600 hover:bg-blue-700 cursor-pointer"
                : "bg-blue-300 cursor-not-allowed opacity-70"
            }`}
          >
            Relocate
          </button>
        </div>
      </div>
    </div>
  );
}

export default RelocateModal;
