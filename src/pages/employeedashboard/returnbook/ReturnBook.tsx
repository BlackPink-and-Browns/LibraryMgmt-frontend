import { useParams, useNavigate } from "react-router-dom";
import { useState } from "react";
import { Star } from "lucide-react";

const offices = [
  { name: "Head Office", id: "head" },
  { name: "Branch A", id: "a" },
  { name: "Branch B", id: "b" },
];

const shelvesByOffice: Record<string, string[]> = {
  head: ["A1-01", "A1-02"],
  a: ["B1-01", "B1-02"],
  b: ["C1-01", "C1-02"],
};

export default function ReturnBook({ type }: { type?: string }) {
  const admin = type === "admin";
  const { bookId } = useParams();
  const navigate = useNavigate();

  const [selectedOffice, setSelectedOffice] = useState(offices[0].id);
  const [selectedShelf, setSelectedShelf] = useState(
    shelvesByOffice[offices[0].id][0]
  );
  const [rating, setRating] = useState(0);
  const [review, setReview] = useState("");

  const book = {
    title: "Clean Code",
    author: "Robert C. Martin",
  };

  const handleOfficeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    setSelectedOffice(value);
    setSelectedShelf(shelvesByOffice[value][0]);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    navigate("../"); // simulate success redirect
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 flex items-center justify-center px-4">
      <div className="bg-white shadow-md rounded-xl w-full max-w-md p-6 ">
        <h2 className="text-xl font-semibold">
          {admin ? ("Relocate Book"):("Return Book")}
          <span className="text-xs bg-blue-100 text-blue-700 px-2 py-0.5 rounded ml-2">
            {bookId}
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
              value={selectedOffice}
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
              value={selectedShelf}
              onChange={(e) => setSelectedShelf(e.target.value)}
              className="w-full border border-gray-300 rounded px-3 py-2 text-sm"
            >
              {shelvesByOffice[selectedOffice].map((shelf) => (
                <option key={shelf} value={shelf}>
                  {shelf}
                </option>
              ))}
            </select>
          </div>

          {/* Rating */}

          {!admin && (
            <div>
              {/* Rating */}
              <div>
                <label className="block text-sm font-medium mb-1">Rating</label>
                <div className="flex items-center gap-1">
                  {[1, 2, 3, 4, 5].map((n) => (
                    <button
                      key={n}
                      type="button"
                      onClick={() => setRating(n)}
                      className="hover:scale-110 transition-transform"
                    >
                      <Star
                        className={`w-5 h-5 ${
                          n <= rating
                            ? "text-yellow-500 fill-yellow-300"
                            : "text-gray-400"
                        }`}
                        fill={n <= rating ? "#facc15" : "none"}
                      />
                    </button>
                  ))}
                  {rating > 0 && (
                    <span className="text-xs text-gray-500 ml-2">
                      ({rating})
                    </span>
                  )}
                </div>
              </div>

              {/* Review */}
              <div>
                <label className="block text-sm font-medium mb-1">Review</label>
                <textarea
                  value={review}
                  onChange={(e) => setReview(e.target.value)}
                  placeholder="Share your thoughts about the book..."
                  className="w-full border border-gray-300 rounded px-3 py-2 text-sm"
                  rows={3}
                />
              </div>
            </div>
          )}

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
