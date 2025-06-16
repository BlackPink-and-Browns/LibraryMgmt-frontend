// src/components/EditReviewModal.tsx
import { Star, X } from "lucide-react";
import React from "react";

interface EditReviewModalProps {
  rating: number;
  setRating: (n: number) => void;
  review: string;
  setReview: (text: string) => void;
  onSave: () => void;
  onClose: () => void;
}

export default function EditReviewModal({
  rating,
  setRating,
  review,
  setReview,
  onSave,
  onClose
}: EditReviewModalProps) {
  return (
    <div className="fixed inset-0 bg-[rgba(0,0,0,0.3)] z-50 flex items-center justify-center">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-5 relative">
        <button className="absolute top-2 right-2 text-gray-500" onClick={onClose}>
          <X className="h-5 w-5" />
        </button>
        <p className="font-semibold mb-2">Edit Review & Rating</p>

        <p className="text-sm font-medium">Rating</p>
        <div className="flex gap-1 mb-3">
          {[1, 2, 3, 4, 5].map(n => (
            <button key={n} type="button" onClick={() => setRating(n)}>
              <Star
                className={`h-5 w-5 ${
                  n <= rating ? "text-yellow-500 fill-yellow-300" : "text-gray-400"
                }`}
              />
            </button>
          ))}
          <span className="ml-1 text-sm text-gray-500">({rating})</span>
        </div>

        <p className="text-sm font-medium">Review</p>
        <textarea
          className="w-full border border-gray-300 rounded p-2 mb-3"
          rows={3}
          value={review}
          onChange={e => setReview(e.target.value)}
        />

        <div className="flex justify-end gap-2">
          <button className="bg-purple-600 text-white px-4 py-1.5 rounded" onClick={onSave}>
            Save
          </button>
          <button
            className="border border-gray-300 px-4 py-1.5 rounded"
            onClick={onClose}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
