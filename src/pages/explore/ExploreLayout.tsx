import { Outlet } from "react-router-dom";
import ChatbotModal from "../../components/chatbot/ChatbotModal";
import ChatbotButton from "../../components/chatbot/ChatbotButton";
import { useState } from "react";
import NotificationBell from "../../components/NotificationIcon";

export default function ExploreLayout (){

    const [chatbotOpen, setChatbotOpen] = useState(false);

    const toggleChatbot = () => {
        setChatbotOpen(!chatbotOpen);
    }

    return (
        <div className="h-full min-h-screen bg-theme-light">
            <NotificationBell />
            <ChatbotModal isOpen={chatbotOpen} onClose={toggleChatbot} />
            <ChatbotButton onClick={toggleChatbot} isVisible={!chatbotOpen} />
            <Outlet />
        </div>
    )

}