import { useNavigate } from "react-router-dom";
import { borrowedBooksDb } from "../data";
import BorrowedBooks from "./BorrowedBooks";
import { useState } from "react";

export default function OverdueBooks({onClose}: {onClose?: () => void}) {
  const navigate = useNavigate();
  const borrowedBooks = borrowedBooksDb;

  const overdueBooks = borrowedBooks.filter((book) => book.daysLeft <= 0);

  
  return (
    <div className="fixed inset-0 bg-[rgba(0,0,0,0.7)] z-50 flex items-center justify-center">
      <BorrowedBooks
        closeButton={true}
        books={overdueBooks}
        title="Overdue Books"
        description="These books are overdue and need to be returned."
        onClose={onClose}
      />
    </div>
  );
}

