import React from "react";

interface Book {
  title: string;
  author: string;
  dueDate: string;
  daysLeft: number;
}

const borrowedBooks: Book[] = [
  { title: "Clean Code", author: "Robert C. Martin", dueDate: "Jan 15", daysLeft: 3 },
  { title: "The Pragmatic Programmer", author: "Andrew Hunt", dueDate: "Jan 20", daysLeft: 8 },
];

export default function BorrowedBooks() {
  return (
    <section className="bg-white p-4 ">
      <h2 className="text-xl font-semibold mb-4">Currently Borrowed Books</h2>
      {borrowedBooks.map((book, idx) => (
        <div key={idx} className="mb-2">
          <p className="font-medium">{book.title} <span className="text-sm text-gray-500">by {book.author}</span></p>
          <p className="text-sm text-gray-600">Due: {book.dueDate} ({book.daysLeft} days left)</p>
        </div>
      ))}
    </section>
  );
}
