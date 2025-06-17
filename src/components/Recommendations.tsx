// components/Recommendations.tsx
import React from "react";
import type { RecommendationsProps } from "../types/propTypes";
import { BookUser, Star } from "lucide-react";
import { useNavigate } from "react-router-dom";


export default function Recommendations({ books,type }: {books:RecommendationsProps["books"],type?:string}) {
  const admin=type==="admin"
    const navigate = useNavigate();
  return (
    <section className="bg-white p-4 rounded-xl shadow-lg ">
      <h2 className="text-lg font-semibold mb-1 flex items-center gap-2"><div
          className="p-3 rounded-lg  bg-theme-light"
        >
          {admin? (<BookUser></BookUser>):(<Star className="h-8 w-8 text-blue-600"/>)}
        </div>{admin? "Recently Added Book":" Recommended for You"}</h2>
      <p className="text-sm text-gray-500 mb-4">{admin ? "Recent Addition":"Books you might enjoy based on your reading history"}</p>
      <div className="space-y-3">

        {books.map((book, index) => {
  const path = admin ? `books/book-list/${book.id}` : `details/${book.id}`;

  return (
    <div
      key={index}
      className="bg-yellow-50 p-4 rounded-md flex justify-between items-center"
      onClick={() => navigate(path)}
    >
      <div>
        <div className="font-medium">{book.title}</div>
        <div className="text-sm text-gray-600">by {book.author}</div>
        <div className="text-sm text-yellow-700 mt-1">⭐ {book.rating}</div>
      </div>
      {book.available ? (
        <button className="text-sm px-3 py-1 bg-green-100 text-green-700 rounded-md hover:bg-green-200">
          {admin ? "Available" : "Borrow"}
        </button>
      ) : (
        <button className="text-sm px-3 py-1 bg-blue-100 text-blue-700 rounded-md hover:bg-blue-200">
          {admin ? "Not Available" : "Request"}
        </button>
      )}
    </div>
  );
})}


      </div>
    </section>
  );
}
