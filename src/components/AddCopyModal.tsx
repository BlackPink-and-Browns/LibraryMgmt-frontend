import React, { useState } from "react";
import { X } from "lucide-react";

interface AddCopyModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (shelf: string) => void;
}

const AddCopyModal: React.FC<AddCopyModalProps> = ({ isOpen, onClose, onAdd }) => {
  const [shelf, setShelf] = useState("");

  if (!isOpen) return null;

  const handleSubmit = () => {
    if (shelf.trim()) {
      onAdd(shelf.trim());
      setShelf("");
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-96 relative shadow-lg">
        <button className="absolute top-2 right-2 text-gray-500 hover:text-black" onClick={onClose}>
          <X size={18} />
        </button>
        <h2 className="text-lg font-semibold mb-4">Add New Copy</h2>
        <label className="block text-sm font-medium mb-1">Shelf Name</label>
        <input
          type="text"
          value={shelf}
          onChange={(e) => setShelf(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded mb-4"
          placeholder="e.g. A5"
        />
        <div className="flex justify-end">
          <button
            onClick={handleSubmit}
            className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700"
          >
            Add Copy
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddCopyModal;
