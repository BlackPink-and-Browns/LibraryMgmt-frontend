import React from "react";
import { useNavigate } from "react-router-dom";
import { useGetAllBorrowsQuery } from "../../../api-service/book/borrow.api";
import LoadingSpinner from "../../../components/LoadingSpinner";

const Issuedbook = () => {
  const navigate = useNavigate();
  const { data: borrowrecord, isLoading, error } = useGetAllBorrowsQuery({});

   if (isLoading) return <LoadingSpinner message="Fetching Issued books..." />;
  if (error) return <p className="text-center mt-10 text-red-500">Error fetching borrow records.</p>;

  return (
    <div className="max-w-5xl mx-auto mt-10 space-y-4 bg-white p-5 shadow-md rounded-xl">
      <h2 className="text-2xl font-semibold mb-6">Issued Books</h2>

      {borrowrecord?.records?.length === 0 ? (
        <p className="text-gray-500">No books currently issued.</p>
      ) : (
        borrowrecord.records.map((record) => {
          const book = record.bookCopy.book;
          const borrower = record.borrowedBy;

          return (
            <div
              key={record.id}
              className="p-4 border border-gray-200 rounded-xl hover:bg-gray-50 transition"
            >
              <div className="flex gap-4">
                <img
                  src={book.cover_image}
                  alt={book.title}
                  className="w-24 h-32 object-cover rounded"
                />

                <div className="flex-1 space-y-1">
                  <h3 className="text-lg font-semibold">{book.title}</h3>
                  <p className="text-sm text-gray-600">
                    <strong>Borrowed by:</strong> {borrower.name} ({borrower.role})
                  </p>
                  <p className="text-sm text-gray-500">
                    <strong>Borrowed At:</strong>{" "}
                    {new Date(record.borrowed_at).toLocaleString()}
                  </p>
                  <p className="text-sm text-gray-500">
                    <strong>Expires At:</strong>{" "}
                    {new Date(record.expires_at).toLocaleString()}
                  </p>
                  <p className="text-sm text-gray-500">
                    <strong>Status:</strong>{" "}
                    <span
                      className={`px-2 py-1 rounded-full text-xs ${
                        record.status === "BORROWED"
                          ? "bg-yellow-100 text-yellow-700"
                          : "bg-green-100 text-green-700"
                      }`}
                    >
                      {record.status}
                    </span>
                  </p>
                </div>
              </div>
            </div>
          );
        })
      )}
    </div>
  );
};

export default Issuedbook;
