import { useParams } from "react-router-dom";
import { useState } from "react";
import { bookDb } from "../../../data";
import RelocateModal from "../../../components/RelocateBook"
import { useGetBooksCopyListQuery } from "../../../api-service/bookcopy/bookcopy.api";
import { useGetBookDetailsQuery } from "../../../api-service/book/book.api";

const AdminBookCopyDetail = () => {
  const { id} = useParams<{ id: string }>();
 const { data, error, isLoading } = useGetBookDetailsQuery(id);
 console.log("book in by id",data?.copies)

  const book = bookDb.find((b) => String(b.id) === id);

  const [copies, setCopies] = useState(book?.copies || []);

  const [isModalOpen, setModalOpen] = useState(false);
  const [selectedCopyId, setSelectedCopyId] = useState<number | null>(null);

  // Example office + shelf data
  const offices = [
    { name: "Chennai", shelves: ["A1", "A2", "A3"] },
    { name: "Hyderabad", shelves: ["B1", "B2"] },
    { name: "Delhi", shelves: ["C1", "C2", "C3"] },
  ];

  const handleRelocateClick = (id: number) => {
    setSelectedCopyId(id);
    setModalOpen(true);
  };

  const handleModalRelocate = (office: string, shelf: string) => {
    if (selectedCopyId === null) return;
    setCopies((prev) =>
      prev.map((copy) =>
        copy.id === selectedCopyId ? { ...copy, shelf: `${office} - ${shelf}` } : copy
      )
    );
    setSelectedCopyId(null);
  };

  const handleDelete = (id: number) => {
    if (confirm("Are you sure you want to delete this book copy?")) {
      setCopies((prev) => prev.filter((copy) => copy.id !== id));
    }
  };

  if (!book) {
    return (
      <div className="max-w-3xl mx-auto mt-10 text-center text-red-500 font-semibold">
        Book with id "{id}" not found.
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
                <p className="text-sm text-gray-500">Status : Available</p>
              </div>
              <div className="flex gap-3">
                <button
                  className="px-3 py-1 border border-blue-500 text-blue-600 rounded hover:bg-blue-50 transition"
                  onClick={() => handleRelocateClick(copy.id)}
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

      <RelocateModal
        isOpen={isModalOpen}
        onClose={() => setModalOpen(false)}
        onRelocate={handleModalRelocate}
        offices={offices}
        mode="relocate"
      />
    </div>
  );
};

export default AdminBookCopyDetail;
