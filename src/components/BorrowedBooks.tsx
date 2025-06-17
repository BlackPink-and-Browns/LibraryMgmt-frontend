import React from "react";
import { useNavigate } from "react-router-dom";
import { BookOpen } from "lucide-react";
import type { BorrowedBooksProps } from "../types/propTypes";

export default function BorrowedBooks({ books }: BorrowedBooksProps) {
  const navigate = useNavigate();

  return (
    <section className="bg-white p-4 rounded-xl shadow-lg">
      <h2 className="text-lg font-semibold mb-1 flex items-center gap-2">
        <div className="p-3 rounded-lg bg-gradient-to-br from-blue-100 to-purple-100">
          <BookOpen className="h-8 w-8 text-blue-600" />
        </div>
        Currently Borrowed ({books.length})
      </h2>
      <p className="text-sm text-gray-500 mb-4">
        Books you currently have checked out
      </p>

      <div className="space-y-3">
        {books.map((book) => (
          <div
            key={book.id}
            className="bg-blue-50 p-4 rounded-md space-y-1 justify-between items-center flex gap-4"
            onClick={() => navigate(`details/${book.id}`)}
          >
            <div className="flex flex-col ">
              <div className="font-medium">{book.title}</div>
              <div className="text-sm text-gray-600">by {book.author}</div>
              <div className="text-sm text-blue-600">Shelf: {book.shelf}</div>
            </div>

            <div className="flex justify-end flex-col items-end space-y-1">
              <div className="text-sm text-gray-500">
                Due: {book.due} <br />
                <span className="text-red-500">{book.daysLeft} days left</span>
              </div>

              <button
                className="text-sm px-3 py-1 border text-blue-500 bg-white rounded-md hover:bg-blue-50"
                onClick={(e) => {
                  e.stopPropagation();
                  navigate(`returnbook/${book.id}`, { state:book });
                }}
              >
                Return Book
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
