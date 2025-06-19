import "./ChatbotModal.css";
import { X, SendHorizontal, Brain, ScanEye, Maximize2 } from "lucide-react";
import SingleMessage from "./SingleMessage";
import { useState, useEffect, useRef } from "react";
import type { Book } from "../../types/dataTypes";

interface ChatbotModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const ChatbotModal: React.FC<ChatbotModalProps> = ({ isOpen, onClose }) => {
  const [messages, setMessages] = useState<{ type: "sent" | "received" | "typing"; content: string; books?: Book[], imageBase64?: string  }[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showCamera, setShowCamera] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const auth_token = localStorage.getItem("token") || "no_token";

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  const expandModal = () => {
    document.querySelector(".chatbot-modal")?.classList.toggle("expanded");
  };

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
        body: JSON.stringify({ message: userMessage, auth_token: auth_token }),
      });

      const data = await response.json();
      const botMessage = data?.message || "Sorry, I didn’t understand that.";
      const books = data?.books || [];
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

  useEffect(() => {
  if (showCamera && videoRef.current) {
    navigator.mediaDevices.getUserMedia({ video: true })
      .then((stream) => {
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          videoRef.current.play().catch((err) =>
            console.error("Auto-play failed:", err)
          );
        }
      })
      .catch((err) => {
        console.error("Camera error:", err);
        alert("Unable to access the camera. Please grant permission.");
      });
  }
}, [showCamera]);


  const stopCamera = () => {
    if (videoRef.current?.srcObject) {
      const stream = videoRef.current.srcObject as MediaStream;
      stream.getTracks().forEach((track) => track.stop());
      videoRef.current.srcObject = null;
    }
  };

  const captureImage = () => {
  const video = videoRef.current;
  const canvas = canvasRef.current;

  if (video && canvas) {
    const context = canvas.getContext("2d");
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    context?.drawImage(video, 0, 0, canvas.width, canvas.height);

    const base64Image = canvas.toDataURL("image/jpeg").split(",")[1];


    // 🟦 Then send to backend
    sendMessageWithImage(base64Image);
    stopCamera();
    setShowCamera(false);
  }
};


  const sendMessageWithImage = async (base64Image: string) => {
    setMessages((prev) => [...prev, { type: "sent", content: "", imageBase64: `data:image/jpeg;charset-utf-8;base64,${base64Image}` }]);
    console.log("Sending image to backend:", base64Image);
    setIsLoading(true);

    try {
      const response = await fetch("http://localhost:8000/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: "",
          auth_token: "auth_tken_ere",
          image_base64: base64Image,
        }),
      });

      const data = await response.json();
      const botMessage = data?.message || "Sorry, I didn’t understand that.";
      const books = data?.books || [];
      setMessages((prev) => [...prev, { type: "received", content: botMessage, books }]);
    } catch (error) {
      console.error("Error sending image message:", error);
      setMessages((prev) => [
        ...prev,
        { type: "received", content: "Oops! Something went wrong with the image." },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

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
          {messages.map((message, index) => (
            <SingleMessage key={index} type={message.type} text={message.content} books={message.books} imageBase64={message.imageBase64} />
          ))}
          {isLoading && <SingleMessage type="typing" text="Typing..." />}
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
          <button className="camera-button" onClick={() => setShowCamera(true)}>
            <ScanEye size={"40px"} strokeWidth={"1px"} color="#007bff" />
          </button>
          <button className="send-button" onClick={handleSendMessage}>
            <SendHorizontal />
          </button>
        </div>
      </div>

      {showCamera && (
      <div className="camera-modal">
        <video
          ref={videoRef}
          autoPlay
          playsInline
          muted
          className="camera-feed"
        />
        <canvas ref={canvasRef} style={{ display: "none" }} />
        <div className="camera-buttons">
          <button onClick={captureImage}>Capture</button>
          <button onClick={() => { stopCamera(); setShowCamera(false); }}>Close</button>
        </div>
      </div>
    )}

    </div>
  );
};

export default ChatbotModal;
