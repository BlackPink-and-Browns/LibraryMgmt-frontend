  import "./ChatbotModal.css";
  import { X, SendHorizontal, Brain, ScanEye, Maximize2 } from "lucide-react";
  import SingleMessage from "./SingleMessage";
  import { useState } from "react";
  import { useEffect, useRef } from "react";
import type { Book } from "../../types/dataTypes";


  interface ChatbotModalProps {
    isOpen: boolean;
    onClose: () => void;
  }




  const ChatbotModal: React.FC<ChatbotModalProps> = ({ isOpen, onClose }) => {
    const [messages, setMessages] = useState<{ type: "sent" | "received"; content: string, books?: Book[] }[]>([]);
    const [inputValue, setInputValue] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const messagesEndRef = useRef<HTMLDivElement>(null);    

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      setInputValue(event.target.value);
    };

    const expandModal = () => {
      document.querySelector(".chatbot-modal")?.classList.toggle("expanded");
    }

    const handleSendMessage = async () => {
      if (inputValue.trim() === "") return;

      const userMessage = inputValue;
      setMessages((prev) => [...prev, { type: "sent", content: userMessage }]);
      setInputValue("");
      setIsLoading(true);

      try {
        const response = await fetch("http://localhost:8000/chat", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ message: userMessage, auth_token: "auth_tken_here"}),
        });

        const data = await response.json();
        console.log(data);
        const botMessage = data?.message || "Sorry, I didn’t understand that.";
        const books = data?.books || [];
        console.log(books);
        setMessages((prev) => [...prev, { type: "received", content: botMessage, books: books }]);
      } catch (error) {
        console.error("Error sending message:", error);
        setMessages((prev) => [
          ...prev,
          { type: "received", content: "Oops! Something went wrong." },
        ]);
      } finally {
        setIsLoading(false);
      }
    };

    const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
      if (event.key === "Enter") {
        handleSendMessage();
      }
    };


    useEffect(() => {
      if (messagesEndRef.current) {
        messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
      }
    }, [messages, isLoading]);

    if (!isOpen) return null;

    return (
      <div className={`chatbot-modal bg-theme-light`}>
        <div className="chatbot-header">
          <div className="chatbot-icon">
            <Brain />
          </div>
          <div>
            <h2 className="chatbot-title">Ask Stylesh!</h2>
            <p className="chatbot-subtitle">Your Intelligent Library Assistant</p>
          </div>
          <div className="chatbot-header-buttons">
            <button className="maximize-button" onClick={expandModal}>
              <Maximize2 size={"20px"} strokeWidth={"2px"} color="white" />
            </button>
            <button className="close-button" onClick={onClose}>
              <X size={"25px"} strokeWidth={"2px"} color="white" />
            </button>
          </div>
        </div>
        <div className="chatbot-content">
          <div className="messages">
            {/* <SingleMessage books={[book]} type="received" text="Hi! Ask me anything about books." /> */}
            {messages.map((message, index) => (
              <SingleMessage key={index} type={message.type} text={message.content} books={message.books} />
            ))}
            {isLoading && <SingleMessage type="received" text="Typing..." />}
            <div ref={messagesEndRef} />
          </div>
          <div className="chatbot-input-area">
            <input
              type="text"
              className="input"
              placeholder="Suggest me..."
              value={inputValue}
              onChange={handleInputChange}
              onKeyDown={handleKeyDown}
            />
            <button className="camera-button">
              <ScanEye size={"40px"} strokeWidth={"1px"} color="#007bff" />
            </button>
            <button className="send-button" onClick={handleSendMessage}>
              <SendHorizontal />
            </button>
          </div>
        </div>
      </div>
    );
  };

  export default ChatbotModal;
