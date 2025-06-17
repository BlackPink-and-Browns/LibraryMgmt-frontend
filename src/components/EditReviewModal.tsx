import React from "react";
import { Star, X } from "lucide-react";
import Rating from "./Rating";
import ReviewInput from "./ReviewInput";


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
    <div className="fixed inset-0 bg-[rgba(0,0,0,0.7)] z-50 flex items-center justify-center">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-5 relative">
        <button className="absolute top-2 right-2 text-gray-500" onClick={onClose}>
          <X className="h-5 w-5" />
        </button>
        <p className="font-semibold mb-2">Edit Review & Rating</p>

        <Rating value={rating} onChange={setRating} />

        <ReviewInput value={review} onChange={setReview} />

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
