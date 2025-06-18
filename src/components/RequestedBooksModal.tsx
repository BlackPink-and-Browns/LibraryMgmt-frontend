import { useNavigate } from "react-router-dom";
import {type RequestedBooksProp } from "../api-service/user/types";
import Button from "./Button";
import { BookOpen, X } from "lucide-react";
import { useRemoveRequestMutation } from "../api-service/user/user.api";

export default function RequestedBooks({books,closeButton,onClose}: {books:RequestedBooksProp[],closeButton:boolean, onClose?: () => void}) {
  const navigate = useNavigate();
  const [removeBookRequests] = useRemoveRequestMutation();
  const title = "Requested Books";
  const description = "These books have been requested from other users";
  
  const requestedBooks = books.filter((book) => book.status === "NOTIFIED" || book.status === "REQUESTED");
  return (
    <div className="fixed inset-0 bg-[rgba(0,0,0,0.7)] z-50 flex items-center justify-center">
      <section className="bg-white p-4 rounded-xl shadow-lg">
      {closeButton && onClose && (
        <div className="relative">
          <button
            onClick={onClose}
            className="absolute top-3 right-3 text-gray-500 hover:text-black"
          >
            <X />
          </button>
        </div>
      )}
      <h2 className="text-lg font-semibold mb-1 flex items-center gap-2">
        <div className="p-3 rounded-lg bg-theme-light">
          <BookOpen className="h-8 w-8 text-blue-600" />
        </div>
        {title} ({requestedBooks.length})
      </h2>
      <p className="text-sm text-gray-500 mb-4">{description}</p>

      <div className="space-y-3">
        {requestedBooks.map((book) => (
          <div
            key={book.id}
            className="bg-blue-50 p-4 rounded-md  items-center justify-between flex gap-8"
            onClick={() => navigate(`details/${book.book.id}`)}
          >
            <div className="flex flex-col">
              <div className="font-medium">{book.book.title}</div>

              <div className="text-sm">
                Status:{" "}
                <span
                  className={`font-medium ${
                    book.status === "NOTIFIED" ? "text-green-600" : "text-orange-500"
                  }`}
                >
                  {book.status==="NOTIFIED"? "Available" : "Requested"}
                </span>
              </div>
            </div>
            <div className="flex gap-2 justify-end">
  {book.status === "NOTIFIED" && (
    <Button
      variant={{ color: "primary", size: "small" }}
      type="button"
      onClick={(e) => {
        e.stopPropagation();
        navigate(`details/${book.book.id}`);
      }}
    >
      <div className="flex flex-row items-center justify-center text-white">
        <p>Borrow</p>
      </div>
    </Button>
  )}

  <Button
    variant={{ color: "ternary", size: "small" }}
    type="button"
    onClick={async (e) => {
      e.stopPropagation();
      try {
        await removeBookRequests([book.id]); // book.id is the waitlist ID
      } catch (err) {
        console.error("Error removing request", err);
      }
    }}
  >
    <div
      className={`flex flex-row items-center justify-center ${
        book.status === "NOTIFIED" ? "text-purple-600" : "text-purple-600"
      }`}
    >
      <p>Cancel Request</p>
    </div>
  </Button>
</div>

            
          </div>
        ))}
      </div>
    </section>
    </div>
  );
}

