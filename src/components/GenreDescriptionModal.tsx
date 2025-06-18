import React, { useState } from "react";

type GenreDescriptionModalProps = {
  isOpen: boolean;
  genreName: string;
  onClose: () => void;
  onSubmit: (description: string) => void;
};

const GenreDescriptionModal: React.FC<GenreDescriptionModalProps> = ({
  isOpen,
  genreName,
  onClose,
  onSubmit,
}) => {
  const [description, setDescription] = useState("");

  const handleSubmit = () => {
    onSubmit(description);
    setDescription("");
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[rgba(0,0,0,0.7)] bg-opacity-10">
      <div className="bg-white p-6 rounded-xl shadow-lg w-full max-w-md space-y-4">
        <h2 className="text-xl font-semibold text-purple-700">
          Description for "{genreName}"
        </h2>
        <textarea
          className="w-full border rounded-lg p-2 resize-none"
          rows={4}
          placeholder="Enter description..."
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <div className="flex justify-end gap-2">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className="px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700"
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};

export default GenreDescriptionModal;
