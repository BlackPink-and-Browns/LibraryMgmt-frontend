import { useNavigate } from "react-router-dom";
import { borrowedBooksDb } from "../data";
import BorrowedBooks from "./BorrowedBooks";
import { useState } from "react";
import type { IfOverdueResponse } from "../api-service/book/types";
import { formatDate, getDaysLeft } from "../utils/utils";

export default function OverdueBooks({books,onClose}: {books?:any,onClose?: () => void}) {

  
  const overdueBooks = books.map((borrow) => {
    const book = borrow.bookCopy?.book;
    return {
      borrowId: borrow.id,
      id: book?.id,
      title: book?.title,
      authors: book?.authors?.map((author) => author.name).join(", "),
      coverImage: book?.cover_image,
      rating: book?.avg_rating,
      shelf: borrow.bookCopy?.shelf?.label,
      status: borrow.status,
      borrowedAt: borrow.createdAt,
      due: formatDate(borrow.expires_at),
      daysLeft: getDaysLeft(borrow.expires_at),
    };
  });
  console.log(overdueBooks);
  
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

