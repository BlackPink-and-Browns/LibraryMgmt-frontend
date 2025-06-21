import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import AdminItemTile from "../../../components/AdminItemTile";
import { useGetBooksListQuery } from "../../../api-service/book/book.api";
import LoadingSpinner from "../../../components/LoadingSpinner";

const BookList = () => {
  const navigate = useNavigate();
  const { data: allBooks = [], isLoading } = useGetBooksListQuery({});
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  if (isLoading) return <LoadingSpinner message="Fetching books..." />;

  const filteredBooks = allBooks.filter((book) => {
    const matchesSearch =
      book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      book.authors?.some((a) =>
        a.name.toLowerCase().includes(searchTerm.toLowerCase())
      );

    const matchesStatus =
      statusFilter === "all"
        ? true
        : statusFilter === "available"
        ? book.is_available === true
        : book.is_available === false;

    return matchesSearch && matchesStatus;
  });

  return (
    <div className="max-w-4xl mx-auto mt-10 space-y-4 bg-white p-5 shadow-md rounded-xl">
      <h2 className="text-2xl font-semibold mb-4">Book List</h2>

      <div className="flex flex-col sm:flex-row gap-4 mb-4">
        <input
          type="text"
          placeholder="Search by title or author..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="flex-1 border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
        />

        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="w-full sm:w-48 border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
        >
          <option value="all">All</option>
          <option value="available">Available</option>
          <option value="unavailable">Unavailable</option>
        </select>
      </div>

      {filteredBooks.length > 0 ? (
        filteredBooks.map((book) => (
          <AdminItemTile
            key={book.id}
            item={book}
            type="book"
            onClick={() => navigate(`/admin/books/book-list/${book.id}`)}
          />
        ))
      ) : (
        <div className="text-gray-500 text-center">
          No matching books found.
        </div>
      )}
    </div>
  );
};

export default BookList;
