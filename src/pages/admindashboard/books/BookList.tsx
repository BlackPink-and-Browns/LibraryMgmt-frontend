import { useNavigate } from "react-router-dom";

import {bookDb} from "../../../data";
import AdminItemTile from "../../../components/AdminItemTile";


const books=bookDb

const BookList = () => {
    const navigate=useNavigate()
  return (
    <div className="max-w-4xl mx-auto mt-10 space-y-4 bg-white p-5 shadow-md rounded-xl">
      {books.map((book) => (
        <AdminItemTile item={book} type="book" onClick={() => navigate(`/admin/books/book-list/${book.isbn}`)} />

      ))}
    </div>
  );
};

export default BookList;
