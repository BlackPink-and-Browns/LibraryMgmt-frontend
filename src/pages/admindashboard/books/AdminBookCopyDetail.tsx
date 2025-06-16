import { useParams } from "react-router-dom";
import { useState } from "react";
import { bookDb } from "../../../data"; // Update based on your project structure
const AdminBookCopyDetail = () => {
  const { isbnId } = useParams<{ isbnId: string }>();
  const book = bookDb.find((b) => b.isbn === isbnId);

  const [copies, setCopies] = useState(book?.copies || []);

  const handleRelocate = (id: number) => {
    const newShelf = prompt("Enter new shelf location:");
    if (!newShelf) return;
    setCopies((prev) =>
      prev.map((copy) =>
        copy.id === id ? { ...copy, shelf: newShelf } : copy
      )
    );
  };

  const handleDelete = (id: number) => {
    if (confirm("Are you sure you want to delete this book copy?")) {
      setCopies((prev) => prev.filter((copy) => copy.id !== id));
    }
  };

  if (!book) {
    return (
      <div className="max-w-3xl mx-auto mt-10 text-center text-red-500 font-semibold">
        Book with ISBN "{isbnId}" not found.
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto mt-10 p-6 bg-white shadow rounded-xl">
      <h2 className="text-2xl font-bold mb-6 text-purple-700">
        Copies of: <span className="text-gray-800">{book.title}</span>
      </h2>

      {copies.length === 0 ? (
        <p className="text-gray-500">No copies found for this book.</p>
      ) : (
        <div className="space-y-4">
          {copies.map((copy) => (
            <div
              key={copy.id}
              className="flex justify-between items-center border p-4 rounded-lg shadow-sm"
            >
              <div>
                <p className="font-semibold text-gray-800">
                  Copy ID: <span className="text-purple-600">{copy.id}</span>
                </p>
                <p className="text-sm text-gray-500">Shelf: {copy.shelf}</p>
              </div>
              <div className="flex gap-3">
                <button
                  className="px-3 py-1 border border-blue-500 text-blue-600 rounded hover:bg-blue-50 transition"
                  onClick={() => handleRelocate(copy.id)}
                >
                  Relocate
                </button>
                <button
                  className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 transition"
                  onClick={() => handleDelete(copy.id)}
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AdminBookCopyDetail;
