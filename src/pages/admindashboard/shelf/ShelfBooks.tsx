import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { EyeIcon, StarIcon, User2Icon } from "lucide-react";
import { useGetShelfDetailsQuery } from "../../../api-service/shelf/shelf.api";
import { useGetBooksListQuery } from "../../../api-service/book/book.api";

const ShelfBooks = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const shelfId = Number(id);

  const { data: shelfData, isLoading, error } = useGetShelfDetailsQuery(shelfId);
  const { data: bookListData } = useGetBooksListQuery({});
  const totalBooks = bookListData || 0;
  console.log("Total Books:", totalBooks);

  
  if (isLoading) return <p className="text-center mt-10">Loading shelf details...</p>;
  if (error) return <p className="text-center mt-10 text-red-500">Error loading shelf data</p>;

  const bookCopies = shelfData?.bookCopies || [];

  return (
    <div className="max-w-4xl mx-auto mt-10 space-y-4 bg-white p-5 shadow-md rounded-xl">
      <h1 className="text-lg font-semibold mb-4">Books in Shelf: {shelfData.label}</h1>

      {bookCopies.length > 0 ? (
        bookCopies.map((copy) => {
          const book = copy.book;
          const currbook=totalBooks.find((b)=>b.id==book.id)
          console.log("booker",currbook)
          return (
            <div
              key={copy.id}
              className="flex items-start gap-4 p-4 border border-gray-300 rounded-2xl shadow-sm hover:shadow-md hover:border-blue-400 transition-all duration-200 bg-white cursor-pointer"
              onClick={() => navigate(`/admin/books/book-list/${book.id}`)}
            >
              {currbook.cover_image ? (
                <img
                  src={currbook.cover_image}
                  alt="Book Cover"
                  className="w-16 h-24 rounded shadow object-cover"
                />
              ) : (
                <div className="w-16 h-24 bg-gray-200 flex items-center justify-center rounded">
                  No Image
                </div>
              )}

              <div className="flex-1">
                <h3 className="text-lg font-semibold text-purple-700">{book.title}</h3>
                <p className="text-sm text-gray-600">
                  by {book.authors?.map((a) => a.name).join(", ") || "Unknown Author"}
                </p>

                <div className="flex gap-3 mt-2 text-sm text-gray-700 flex-wrap">
                  <div>
                    <span className="font-medium text-gray-500">Copy ID: </span>
                    {copy.copyId || "N/A"}
                  </div>
                  <div>
                    <span className="font-medium text-gray-500">Issued To: </span>
                    {copy.issuedTo || "N/A"}
                  </div>
                  <div>
                    <span className="font-medium text-gray-500">Issued Date: </span>
                    {copy.issuedDate || "N/A"}
                  </div>
                  <div>
                    <span className="font-medium text-gray-500">Return Date: </span>
                    {copy.returnDate || "N/A"}
                  </div>
                </div>

                <div className="flex items-center gap-2 mt-2">
                  <span
                    className={`text-xs px-2 py-1 rounded-full font-medium ${
                      book.is_available === true
                        ? "bg-green-100 text-green-700"
                        : "bg-gray-300 text-gray-800"
                    }`}
                  >
                    {book.is_available ? "Available" : "Not Available"}
                  </span>

                  <div className="flex items-center text-yellow-600 text-sm font-medium gap-1">
                    <StarIcon className="w-4 h-4 fill-yellow-500 stroke-none" />
                    {book.avg_rating ?? "N/A"}
                    <span className="text-gray-500">
                      ({book.reviews?.length || 0} reviews)
                    </span>
                  </div>
                </div>
              </div>

              <button className="bg-purple-100 text-purple-700 text-sm px-3 py-1 rounded-md font-medium shadow hover:bg-purple-200 transition flex items-center gap-1">
                <EyeIcon className="w-4 h-4" />
                View Details
              </button>
            </div>
          );
        })
      ) : (
        <p className="text-gray-500">No books in this shelf.</p>
      )}
    </div>
  );
};

export default ShelfBooks;
