import { BookCard } from "./BookCard";
import type { Book } from "../../types/dataTypes";
import "./SingleMessage.css"
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

interface MessageProps {
    text: string;
    type: 'sent' | 'received';
    books?: Book[];
}

  const TypingIndicator = () => {
  return (
    <div className="typing-indicator">
      <span className="dot dot1"></span>
      <span className="dot dot2"></span>
      <span className="dot dot3"></span>
    </div>
  );
  };

const SingleMessage: React.FC<MessageProps> = ({ text, type, books }) => {
  const processedText = text.replace(/\\n/g, '\n').replace(/\r?\n/g, '  \n');

  return (
    <div>
    <div className={`message ${type}-message`}>
      {type === "received" && text === "Typing..." ? (
        <TypingIndicator />
      ) : type === "received" ? (
        <ReactMarkdown remarkPlugins={[remarkGfm]}>
          {processedText}
        </ReactMarkdown>
      ) : (
        text
      )}
    </div>

      {type === "received" && books && books.length > 0 && (
        <div className="book-card-scroll-container ">
          {books.map((b) => (
            <BookCard key={b.id} book={b} type="chatbot" />
          ))}
        </div>
      )}
    </div>
  );
};


export default SingleMessage;