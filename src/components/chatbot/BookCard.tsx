import { useNavigate } from "react-router-dom";
import type { Book } from "../../types/dataTypes";
import "./BookCard.css"

interface BookCardProps {
  book: Book;
  type?: "chatbot" | "library";
}

export const BookCard: React.FC<BookCardProps> = ({ book }) => {
  const navigate = useNavigate();
  return (
    <div className="chatbot-book-card" onClick={() => {navigate(`/explore/details/${book.id}`)}}>
      <div className="chatbot-book-card-content" >
        <img src={book.cover_image} className="book-cover" alt={book.title} />
        <h4 className="chatbot-book-title">{book.title}</h4>
        <p className="chatbot-book-author">by {book.author}</p>
        <div className="chatbot-book-info">
          {/* <p><strong>Rating:</strong> ⭐ {book.rating}</p> */}
          {/* <p><strong>Location:</strong> {book.location}</p> */}
          <p><strong>Description:</strong> {book.description}</p>

        </div>
      </div>
    </div>
  );
};
