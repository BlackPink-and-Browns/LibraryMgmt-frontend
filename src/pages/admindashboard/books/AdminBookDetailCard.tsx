import { useState } from "react";
import {
  PencilIcon,
  Trash2Icon,
  MapPin,
} from "lucide-react";
import clsx from "clsx";
import bookDb from "../../../data";
import { useParams } from "react-router-dom";

const AddCopyModal = ({
  isOpen,
  onClose,
  onAdd,
}: {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (shelf: string) => void;
}) => {
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
    <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white rounded-lg p-6 w-80 shadow-lg relative">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-600 hover:text-black"
        >
          ✖
        </button>
        <h2 className="text-lg font-semibold mb-4">Add New Copy</h2>
        <label className="block text-sm mb-1">Shelf Name</label>
        <input
          type="text"
          value={shelf}
          onChange={(e) => setShelf(e.target.value)}
          className="w-full border px-3 py-2 rounded mb-4"
          placeholder="e.g., B3"
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

const AdminBookDetailCard = () => {
  const { isbnId } = useParams();
  const bookFromDb = bookDb.find((book) => book.isbn === isbnId);
  if (!bookFromDb) {
    return <div className="text-center text-red-600">Book not found.</div>;
  }

  const [isEditing, setIsEditing] = useState(false);
  const [book, setBook] = useState(bookFromDb);
  const [showAddModal, setShowAddModal] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;

    if (name === "authors") {
      setBook((prev) => ({
        ...prev,
        authors: value.split(",").map((n, i) => ({ id: i + 1, name: n.trim() })),
      }));
    } else if (name === "genres") {
      setBook((prev) => ({
        ...prev,
        genres: value.split(",").map((n, i) => ({ id: i + 1, name: n.trim() })),
      }));
    } else {
      setBook((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSave = () => {
    alert("Book details saved!");
    setIsEditing(false);
  };

  const handleAddCopy = (shelf: string) => {
    const newCopy = {
      id: Math.max(...book.copies.map((c) => c.id), 0) + 1,
      shelf,
      status: "Available",
    };
    setBook((prev) => ({
      ...prev,
      copies: [...prev.copies, newCopy],
    }));
  };

  const status = book.copies?.[0]?.status || "Unknown";
  const averageRating =
    book.reviews.reduce((sum, r) => sum + r.rating, 0) / book.reviews.length;

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
                value={book.authors.map((a) => a.name).join(", ")}
                onChange={handleChange}
                className="inputfield"
              />
            ) : (
              book.authors.map((a) => a.name).join(", ")
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
              <MapPin className="w-4 h-4" />
              Location:{" "}
              <span className="font-medium text-indigo-600">
                {book.copies[0]?.shelf || "N/A"}
              </span>
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
              onClick={() => setShowAddModal(true)}
            >
              + Add Copy
            </button>
          </div>
        </div>
      </div>

      <AddCopyModal
        isOpen={showAddModal}
        onClose={() => setShowAddModal(false)}
        onAdd={handleAddCopy}
      />
    </>
  );
};

export default AdminBookDetailCard;
