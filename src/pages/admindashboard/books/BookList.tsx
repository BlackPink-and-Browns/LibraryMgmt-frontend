import { useNavigate } from "react-router-dom";
import AdminBookTile from "../../../components/AdminBookTile";
import bookDb from "../../../data";


const books=bookDb

const BookList = () => {
    const naviate=useNavigate()
  return (
    <div className="max-w-4xl mx-auto mt-10 space-y-4 bg-white p-5 shadow-md rounded-xl">
      {books.map((book, index) => (
        <AdminBookTile key={index} book={book}  />
      ))}
    </div>
  );
};

export default BookList;
