import { useNavigate } from "react-router-dom";
import { bookDb, borrowedBooksDb } from "../data";
import BorrowedBooks from "./BorrowedBooks";
import { useState } from "react";

export default function RequestedBooks({onClose}: {onClose?: () => void}) {
  const navigate = useNavigate();
  const Books = bookDb;

  const RequestedBooks = Books.filter((book) => book.copies[0].status === "Borrowed");

  
  return (
    <div className="fixed inset-0 bg-[rgba(0,0,0,0.7)] z-50 flex items-center justify-center">
      <BorrowedBooks
        closeButton={true}
        books={RequestedBooks}
        title="Requested Books"
        description="These books are currently being read by other users"
        onClose={onClose}
      />
    </div>
  );
}

