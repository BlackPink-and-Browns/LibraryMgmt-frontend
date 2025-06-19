import React from "react";

type Book = {
  id: number;
  title: string;
  createdAt: string;
  is_available: boolean;
  avg_rating: number;
  authors: { id: number; name: string }[];
};

const RecentlyAddedBooks = ({ books }: { books: Book[] }) => {
  return (
    <div className="p-4 bg-white rounded-2xl shadow-md w-full">
      <h2 className="text-xl font-semibold mb-4">Recently Added Books</h2>
      {books.length === 0 ? (
        <p className="text-sm text-gray-500">No books added recently.</p>
      ) : (
        <ul className="space-y-4">
          {books.map((book) => (
            <li
              key={book.id}
              className="p-4 border rounded-xl hover:bg-gray-50 transition"
            >
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-lg font-medium">{book.title}</p>
                  <p className="text-sm text-gray-500">
                    {book.authors.map((a) => a.name).join(", ")}
                  </p>
                  <p className="text-xs text-gray-400">
                    Added on {new Date(book.createdAt).toLocaleString()}
                  </p>
                </div>
                <div className="text-right text-sm">
                  <p
                    className={`font-medium ${
                      book.is_available ? "text-green-600" : "text-red-500"
                    }`}
                  >
                    {book.is_available ? "Available" : "Not Available"}
                  </p>
                  {/* <p className="text-yellow-600">⭐ {book.avg_rating}</p> */}
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default RecentlyAddedBooks;
