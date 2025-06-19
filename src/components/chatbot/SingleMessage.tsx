import { BookCard } from "./BookCard";
import type { Book } from "../../types/dataTypes";
import "./SingleMessage.css"
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

interface MessageProps {
    text: string;
    type: 'sent' | 'received' | 'typing';
    imageBase64?: string;
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

const SingleMessage: React.FC<MessageProps> = ({ text, type, books, imageBase64 }) => {
  const processedText = text.replace(/\\n/g, '\n').replace(/\r?\n/g, '  \n');
  console.log("text",text, "imageBase64", imageBase64);

  if (type === "typing") {
    return (
      <div >
        <TypingIndicator />
      </div>
    );
  }

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
      {imageBase64 && (
        <img
          src={imageBase64}
          alt="User sent"
          style={{ maxWidth: "100%", borderRadius: "8px", marginTop: "8px"}}
        />
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