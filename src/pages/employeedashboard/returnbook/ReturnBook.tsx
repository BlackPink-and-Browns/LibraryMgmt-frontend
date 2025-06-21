import { useParams, useNavigate, useLocation } from "react-router-dom";
import { useState } from "react";
import Rating from "../../../components/Rating";
import ReviewInput from "../../../components/ReviewInput";
import { X } from "lucide-react";
import { useGetShelfListQuery } from "../../../api-service/shelf/shelf.api";
import { useReturnBookMutation } from "../../../api-service/book/return.api";
import { useCreateReviewMutation } from "../../../api-service/reviews/review.api";

// const offices = [
//   { name: "Head Office", id: "head" },
//   { name: "Branch A", id: "a" },
//   { name: "Branch B", id: "b" },
// ];

// const shelvesByOffice: Record<string, string[]> = {
//   head: ["A1-01", "A1-02"],
//   a: ["B1-01", "B1-02"],
//   b: ["C1-01", "C1-02"],
// };

export default function ReturnBook({ type }: { type?: string }) {
  const admin = type === "admin";
  const navigate = useNavigate();

  const location = useLocation();
  const book = location.state;

  const { data: shelfData = [] } = useGetShelfListQuery({});
  const [selectedOfficeId, setSelectedOfficeId] = useState("");
  const [selectedShelfId, setSelectedShelfId] = useState(0);
  const [rating, setRating] = useState(0);
  const [review, setReview] = useState("");
  const [returnBook] = useReturnBookMutation();
  const [createReview] = useCreateReviewMutation();

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

  const handleOfficeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    setSelectedOfficeId(value);
    setSelectedShelfId(0); // clear shelf when office changes
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      // 1. Return the book
      await returnBook({
        id: book.borrowId,
        returned_shelf_no: Number(selectedShelfId),
      }).unwrap();

      // 2. Optionally create review if rating and content provided
      if (rating > 0 || review.trim() !== "") {
        await createReview({
          bookId: book.id,
          rating: rating,
          content: review.trim(),
        });
      }

      navigate("../");
    } catch (error) {
      console.error("Failed to return book or submit review:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 flex items-center justify-center px-4">
      <div className="bg-white shadow-md rounded-xl w-full max-w-md p-6 ">
        <div className="relative">
          <button
            className="absolute top-2 right-2 text-gray-500"
            onClick={() => navigate(-1)}
          >
            <X className="h-5 w-5" />
          </button>
        </div>
        <h2 className="text-xl font-semibold">
          {admin ? "Relocate Book" : "Return Book"}
          <span className="text-xs bg-blue-100 text-blue-700 px-2 py-0.5 rounded ml-2">
            {book.borrowId}
          </span>
        </h2>
        <p className="mt-1 text-sm text-gray-700 font-medium">{book.title}</p>
        <p className="text-sm text-gray-500 mb-6">by {book.author}</p>

        <form className="space-y-5" onSubmit={handleSubmit}>
          {/* Office */}
          <div>
            <label className="block text-sm font-medium mb-1">
              Choose Office
            </label>
            <select
              value={selectedOfficeId}
              onChange={handleOfficeChange}
              className="w-full border border-gray-300 rounded px-3 py-2 text-sm"
            >
              {offices.map((office) => (
                <option key={office.id} value={office.id}>
                  {office.name}
                </option>
              ))}
            </select>
          </div>

          {/* Shelf */}
          <div>
            <label className="block text-sm font-medium mb-1">
              Shelf/Location
            </label>
            <select
              value={selectedShelfId}
              onChange={(e) => setSelectedShelfId(e.target.value)}
              disabled={!selectedOfficeId}
              className="w-full border border-gray-300 rounded px-3 py-2 text-sm"
            >
              <option value="">-- Select Shelf --</option>
              {shelves.map((shelf) => (
                <option key={shelf.id} value={shelf.id}>
                  {shelf.label}
                </option>
              ))}
            </select>
          </div>

          {/* Rating */}
          <Rating value={rating} onChange={setRating} />
          {/* Review */}
          <ReviewInput value={review} onChange={setReview} />
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-2 rounded hover:from-blue-700 hover:to-purple-700"
          >
            Submit Return
          </button>
        </form>
      </div>
    </div>
  );
}
