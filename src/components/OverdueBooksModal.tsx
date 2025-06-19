import { useNavigate } from "react-router-dom";
import { borrowedBooksDb } from "../data";
import BorrowedBooks from "./BorrowedBooks";
import { useState } from "react";
import type { IfOverdueResponse } from "../api-service/book/types";

export default function OverdueBooks({books,onClose}: {books:any,onClose?: () => void}) {
  const navigate = useNavigate();
  
  const overdueBooks = books

  
  return (
    <div className="fixed inset-0 bg-[rgba(0,0,0,0.7)] z-50 flex items-center justify-center ">
      <BorrowedBooks
        closeButton={true}
        books={overdueBooks}
        title="Overdue Books"
        description={books.length===0? "no overdue books":"These books are overdue and need to be returned."}
        onClose={onClose}
      />
    </div>
  );
}

