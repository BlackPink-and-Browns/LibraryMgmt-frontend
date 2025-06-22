import { useNavigate } from "react-router-dom";
import { BookOpen, X } from "lucide-react";
import type { BorrowedBooksProps } from "../types/propTypes";
import Button from "./Button";

export default function BorrowedBooks({
  books,
  title,
  description,
  closeButton,
  onClose,
}: {
  books: any;
  title?: string;
  description?: string;
  closeButton?: boolean;
  onClose?: () => void;
}) {
  const navigate = useNavigate();

  return (
    <section className="bg-white p-4 rounded-xl shadow-lg">
      {closeButton && onClose && (
        <div className="relative">
          <button
            onClick={onClose}
            className="absolute  right-1 text-gray-500 hover:text-black"
          >
            <X />
          </button>
        </div>
      )}
      <h2 className="text-lg font-semibold mb-1 flex items-center gap-2">
        <div className="p-3 rounded-lg bg-theme-light">
          <BookOpen className="h-8 w-8 text-blue-600" />
        </div>
        {title} ({books.length})
      </h2>
      <p className="text-sm text-gray-500 mb-4">{description}</p>

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

            <div className="flex justify-end flex-col  space-y-1">
              <div className="text-sm text-gray-500">
                Due: {book.due} <br />
                <span className="text-red-500">
                  {book.daysLeft >= 0
                    ? `${book.daysLeft} days left`
                    : `${-book.daysLeft} days overdue`}
                </span>
              </div>

              <Button
                variant={{ color: "ternary", size: "small" }}
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  navigate(`returnbook/${book.borrow}`, { state: book });
                }}
              >
                <div className="flex flex-row items-center justify-center text-blue-500">
                  <p>Return</p>
                </div>
              </Button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
