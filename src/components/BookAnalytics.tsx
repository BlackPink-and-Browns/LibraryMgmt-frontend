import React from "react";

function BookAnalytics(props: {
  popularBooks: { title: string; borrow_count: number }[];
  popularGenres: { name: string; borrow_count: number }[];
}) {
  const { popularBooks, popularGenres } = props;

  return (
    <div className="  flex flex-col min-w-fit w-full ">

      <div className="bg-white rounded-xl shadow p-5 mb-5">
        <h2 className="text-xl font-bold mb-4 text-gray-800">📚 Popular Books</h2>
        <ul className="space-y-2">
          {popularBooks.map((book, index) => (
            <li
              key={index}
              className="flex justify-between items-center bg-gray-50 p-3 rounded"
            >
              <span className="text-gray-700">{book.title}</span>
              <span className="text-sm text-gray-500">Borrows: {book.borrow_count}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="bg-white rounded-xl shadow p-5">
        <h2 className="text-xl font-bold mb-4 text-gray-800">🏷️ Popular Genres</h2>
        <ul className="space-y-2">
          {popularGenres.map((genre, index) => (
            <li
              key={index}
              className="flex justify-between items-center bg-gray-50 p-3 rounded"
            >
              <span className="text-gray-700">{genre.name}</span>
              <span className="text-sm text-gray-500">Books: {genre.borrow_count}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default BookAnalytics;
