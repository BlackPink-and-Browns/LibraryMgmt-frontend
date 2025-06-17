import { Outlet } from "react-router-dom";
import ChatbotModal from "../../components/chatbot/ChatbotModal";
import ChatbotButton from "../../components/chatbot/ChatbotButton";
import { useState } from "react";

export default function ExploreLayout (){

    const [chatbotOpen, setChatbotOpen] = useState(false);

    const toggleChatbot = () => {
        setChatbotOpen(!chatbotOpen);
    }

    return (
        <div className="min-h-screen bg-theme-light">
            <ChatbotModal isOpen={chatbotOpen} onClose={toggleChatbot} />
            <ChatbotButton onClick={toggleChatbot} isVisible={!chatbotOpen} />
            <Outlet />
        </div>
    )

}