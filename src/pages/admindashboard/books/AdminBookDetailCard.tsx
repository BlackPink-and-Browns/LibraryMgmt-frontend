import { useEffect, useState } from "react";
import { PencilIcon, Trash2Icon } from "lucide-react";
import clsx from "clsx";
import { useParams } from "react-router-dom";
import RelocateModal from "../../../components/RelocateBook";
import { useGetBookDetailsQuery } from "../../../api-service/book/book.api";

const offices = [
  { name: "Chennai", shelves: ["A1", "A2", "A3"] },
  { name: "Hyderabad", shelves: ["B1", "B2"] },
  { name: "Delhi", shelves: ["C1", "C2", "C3"] },
];

const AdminBookDetailCard = () => {
  const { id } = useParams();
  const { data: bookFromDb } = useGetBookDetailsQuery(id);
  const [book, setBook] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [isModalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    if (bookFromDb) {
      setBook(bookFromDb);
    }
  }, [bookFromDb]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;

    if (name === "authors") {
      setBook((prev) => ({
        ...prev,
        authors: value
          .split(",")
          .map((n, i) => ({ id: i + 1, name: n.trim() })),
      }));
    } else if (name === "genres") {
      setBook((prev) => ({
        ...prev,
        genres: value
          .split(",")
          .map((n, i) => ({ id: i + 1, name: n.trim() })),
      }));
    } else {
      setBook((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSave = () => {
    alert("Book details saved!");
    setIsEditing(false);
  };

  const handleAddCopy = () => {
    setModalOpen(true);
  };

  if (!book) {
    return <div className="text-center text-red-600">Book not found.</div>;
  }

  const status =
    book.copies?.[0]?.is_available === true ? "Available" : "Unavailable";
  const averageRating = book.avg_rating || 0;

  return (
    <>
      <div className="max-w-5xl mx-auto bg-white p-8 rounded-xl shadow-md flex gap-6">
        {/* Image */}
        <div className="w-48">
          <img
            src={book.cover_image}
            alt={book.title}
            className="rounded-md w-full h-auto"
          />
        </div>

        {/* Details */}
        <div className="flex-1 space-y-3">
          {/* Top */}
          <div className="flex justify-between items-start">
            <span
              className={clsx(
                "text-sm px-3 py-1 rounded-full font-semibold",
                status === "Available"
                  ? "bg-green-100 text-green-600"
                  : "bg-yellow-100 text-yellow-600"
              )}
            >
              {status}
            </span>
            <span className="flex items-center gap-1 text-yellow-500 font-medium">
              ⭐ {averageRating.toFixed(1)}{" "}
              <span className="text-gray-400">
                ({book.reviews.length} reviews)
              </span>
            </span>
          </div>

          {/* Title */}
          {isEditing ? (
            <input
              name="title"
              value={book.title}
              onChange={handleChange}
              className="inputfield text-lg font-semibold"
            />
          ) : (
            <h2 className="text-xl font-semibold">{book.title}</h2>
          )}

          {/* Authors */}
          <div>
            <strong>Authors:</strong>{" "}
            {isEditing ? (
              <input
                name="authors"
                value={book.authors?.map((a) => a.name).join(", ") || ""}
                onChange={handleChange}
                className="inputfield"
              />
            ) : book.authors?.length ? (
              book.authors.map((a) => a.name).join(", ")
            ) : (
              "Unknown"
            )}
          </div>

          {/* Genres */}
          <div>
            <strong>Genres:</strong>{" "}
            {isEditing ? (
              <input
                name="genres"
                value={book.genres.map((g) => g.name).join(", ")}
                onChange={handleChange}
                className="inputfield"
              />
            ) : (
              book.genres.map((g) => g.name).join(", ")
            )}
          </div>

          {/* Quantity */}
          <div>
            <strong>Copies:</strong> {book.copies.length}
          </div>

          {/* Description */}
          <div>
            <strong>Description:</strong>
            {isEditing ? (
              <textarea
                name="description"
                value={book.description}
                onChange={handleChange}
                className="inputfield mt-1 w-full"
                rows={4}
              />
            ) : (
              <p className="text-gray-600 text-sm mt-1">{book.description}</p>
            )}
          </div>

          {/* Extra Details */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-sm text-gray-600 pt-4">
            <div className="flex items-center gap-2">
              <span className="font-bold">📖 ISBN:</span>
              <span>{book.isbn}</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="font-bold">BookId</span>
              <span>{book.id}</span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap gap-3 mt-6">
            <button className="bg-red-600 text-white px-4 py-2 rounded shadow flex items-center gap-2">
              <Trash2Icon size={16} /> Delete Book
            </button>
            {isEditing ? (
              <button
                className="bg-green-600 text-white px-4 py-2 rounded shadow"
                onClick={handleSave}
              >
                Save
              </button>
            ) : (
              <button
                className="bg-gray-100 text-black px-4 py-2 rounded shadow flex items-center gap-2"
                onClick={() => setIsEditing(true)}
              >
                <PencilIcon size={16} /> Edit
              </button>
            )}
            <button
              className="ml-auto bg-purple-600 text-white px-4 py-2 rounded shadow"
              onClick={handleAddCopy}
            >
              + Add Copy
            </button>
          </div>
        </div>
      </div>

      <RelocateModal
        isOpen={isModalOpen}
        onClose={() => setModalOpen(false)}
        onRelocate={() => {}}
        offices={offices}
        mode="add"
      />
    </>
  );
};

export default AdminBookDetailCard;
