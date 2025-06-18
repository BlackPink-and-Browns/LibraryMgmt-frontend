import { useNavigate } from "react-router-dom";
import AdminItemTile from "../../../components/AdminItemTile";
import { useGetBooksListQuery } from "../../../api-service/book/book.api";

const BookList = () => {
  const navigate = useNavigate();

  const { data: allBooks = [], isLoading, error } = useGetBooksListQuery({});

  console.log("bookslist", allBooks);

  if (isLoading) return <div className="text-3xl">Loading books...</div>;
  if (error) return <div>Failed to load books.</div>;

  return (
    <div className="max-w-4xl mx-auto mt-10 space-y-4 bg-white p-5 shadow-md rounded-xl">
      {allBooks.length > 0 ? (
        allBooks.map((book) => (
          <AdminItemTile
            key={book.id} 
            item={book}
            type="book"
            onClick={() => navigate(`/admin/books/book-list/${book.id}`)}
          />
        ))
      ) : (
        <div>No books available.</div>
      )}
    </div>
  );
};

export default BookList;
