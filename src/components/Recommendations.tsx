import React from "react";

const recommendations = [
  { title: "Design Patterns", rating: 4.8, canBorrow: true },
  { title: "JavaScript: The Good Parts", rating: 4.6, canBorrow: true },
  { title: "Refactoring", rating: 4.7, canBorrow: false },
];

export default function Recommendations() {
  return (
    <section className="bg-white p-4 ">
      <h2 className="text-xl font-semibold mb-4">Recommended Books</h2>
      {recommendations.map((book, idx) => (
        <div key={idx} className="mb-2">
          <p className="font-medium">{book.title}</p>
          <p className="text-sm text-gray-600">Rating: {book.rating}</p>
          <p className={`text-sm ${book.canBorrow ? 'text-green-600' : 'text-red-600'}`}>
            {book.canBorrow ? "Available to Borrow" : "Unavailable"}
          </p>
        </div>
      ))}
    </section>
  );
}
