import { BookCard } from "../../pages";
import type { Book } from "../../types/propTypes";
import "./SingleMessage.css"

interface MessageProps {
    text: string;
    type: 'sent' | 'received';
    books?: Book[];
}

const SingleMessage: React.FC<MessageProps> = ({ text, type, books }) => (
    <>
    <div className={`message ${type}-message`}>
        {text}
    </div>
    {type === 'received' && books && (
        <div className="book-card-container">
            {books.map((b) => (
                <BookCard
                    key={b.book_id}
                    bookCard={b}
                />
            ))}
        </div>
    )}
    </>
  
);

export default SingleMessage;