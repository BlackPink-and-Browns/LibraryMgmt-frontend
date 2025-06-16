// src/pages/employee/BorrowReviewPage.tsx
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { useState } from "react";
import { Star } from "lucide-react";
import EditReviewModal from "../../components/EditReviewModal";
import DeleteReviewModal from "../../components/DeleteReviewModal";

export default function BorrowedBookRecords() {
  const { transactionId } = useParams();
  const navigate = useNavigate();
  const { state: record } = useLocation();

  const [rating, setRating] = useState(record?.rating || 0);
  const [review, setReview] = useState(record?.review || "");
  const [editMode, setEditMode] = useState(false);
  const [showDelete, setShowDelete] = useState(false);

  if (!record) return <div className="text-center mt-12">Record not found.</div>;

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-purple-50 px-4">
      <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-xl">
        <div className="flex gap-4 items-start mb-6">
          <img src={record.cover} alt="cover" className="w-16 h-24 rounded border" />
          <div>
            <h2 className="text-xl font-bold">{record.title}</h2>
            <p className="text-gray-600 text-sm">{record.author}</p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 mb-6">
          <div>
            <p className="text-sm font-medium">Borrow Date</p>
            <div className="bg-gray-100 rounded px-3 py-2">{record.borrowed}</div>
          </div>
          <div>
            <p className="text-sm font-medium">Return Date</p>
            <div className="bg-gray-100 rounded px-3 py-2">{record.returned}</div>
          </div>
          <div>
            <p className="text-sm font-medium">Borrowed From</p>
            <div className="bg-gray-100 rounded px-3 py-2">{record.borrowShelf}</div>
          </div>
          <div>
            <p className="text-sm font-medium">Returned To</p>
            <div className="bg-gray-100 rounded px-3 py-2">{record.returnShelf}</div>
          </div>
        </div>

        <div className="mb-4">
          <p className="text-sm font-medium">Rating</p>
          <div className="flex items-center gap-1 mt-1">
            {[1, 2, 3, 4, 5].map(n => (
              <Star key={n} className={`h-5 w-5 ${n <= rating ? "text-yellow-500 fill-yellow-300" : "text-gray-400"}`} />
            ))}
            <span className="ml-1 text-sm text-gray-500">({rating})</span>
          </div>
        </div>

        <div className="mb-6">
          <p className="text-sm font-medium">Review</p>
          <div className="bg-gray-50 rounded px-3 py-2 min-h-[48px] text-gray-800">
            {review || <span className="text-gray-400">No review yet.</span>}
          </div>
        </div>

        <div className="flex gap-2">
          <button className="bg-purple-600 text-white px-4 py-2 rounded" onClick={() => setEditMode(true)}>Update Review/Rating</button>
          <button className="bg-gradient-to-r from-pink-500 to-red-500 text-white px-4 py-2 rounded" onClick={() => setShowDelete(true)}>Delete Review/Rating</button>
          <button className="text-gray-600 px-4 py-2" onClick={() => navigate("../")}>Back</button>
        </div>

        {editMode && (
            
  <EditReviewModal
    rating={rating}
    setRating={setRating}
    review={review}
    setReview={setReview}
    onSave={() => setEditMode(false)}
    onClose={() => setEditMode(false)}
  />
)}

        {showDelete && (
  <DeleteReviewModal
    onClose={() => setShowDelete(false)}
    onDelete={() => {
      setRating(0);
      setReview("");
      setShowDelete(false);
    }}
  />
)}
      </div>
    </div>
  );
}
