// components/DeleteReviewModal.tsx
import React from "react";
import { X } from "lucide-react";

interface DeleteReviewModalProps {
  onClose: () => void;
  onDelete: () => void;
}

export default function DeleteReviewModal({ onClose, onDelete }: DeleteReviewModalProps) {
  return (
    <div className="fixed inset-0 bg-[rgba(0,0,0,0.3)] z-50 flex items-center justify-center">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-6 relative">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-500 hover:text-black"
        >
          <X/>
        </button>
        <h2 className="text-lg font-semibold mb-2">Delete Review & Rating</h2>
        <p className="text-sm text-gray-600 mb-4">
          Are you sure you want to delete your review and rating? This action cannot be undone.
        </p>
        <div className="flex justify-end gap-2">
          <button
            onClick={onDelete}
            className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
          >
            Delete
          </button>
          <button
            onClick={onClose}
            className="px-4 py-2 border border-gray-300 rounded hover:bg-gray-100"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
