import "./ChatbotModal.css"
import { X, SendHorizontal, Brain, ScanEye } from "lucide-react";
import SingleMessage from "./SingleMessage";
import { use, useState } from "react";

interface ChatbotModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const ChatbotModal: React.FC<ChatbotModalProps> = ({ isOpen, onClose }) => {
  const [messages, setMessages] = useState<{type: "sent" | "received", content: string}[]>([]);
  const [inputValue, setInputValue] = useState("");

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  const handleSendMessage = () => {
    if (inputValue.trim() !== "") {
      setMessages([...messages, {type: "sent", content: inputValue}, {type:"received", content:"Hi, How can I help you?"}]); // Add the message to the state
      setInputValue(""); // Clear the input field
    }
  };
  
  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      handleSendMessage();
    }
  };



  if (!isOpen) {
    return null;
  }
  return (
    <div className={`chatbot-modal`}>
      <div className="chatbot-header">
        <div className="chatbot-icon">
          <Brain />
        </div>
        <div>
          <h2 className="chatbot-title">Ask Stylesh !</h2>
          <p className="chatbot-subtitle">Your Intelligent library Assistant</p>
        </div>
        
        
        <button className="chatbot-close-button" onClick={onClose}>
          <X />
        </button>

      </div>
      <div className="chatbot-content">
        <div className="messages">
          {/* Chat messages go here */}
          {messages.map((message, index) => (
            <SingleMessage key={index} type={message.type} text={message.content} />
          ))}
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
}

export default ChatbotModal;
