import type { Book } from "../../types/dataTypes";
import "./BookCard.css"

interface BookCardProps {
  book: {};
  type?: "chatbot" | "library";
}

export const BookCard: React.FC<BookCardProps> = ({ book }) => {
  return (
    <div className="chatbot-book-card">
      <div className="chatbot-book-card-content">
        <img src={"#"} className="book-cover" alt={book.title} />
        <h4 className="chatbot-book-title">{book.title}</h4>
        <p className="chatbot-book-author">by {book.author}</p>
        <div className="chatbot-book-info">
          <p><strong>Rating:</strong> ⭐ {book.rating}</p>
          <p><strong>Location:</strong> {book.location}</p>
        </div>
      </div>
    </div>
  );
};
