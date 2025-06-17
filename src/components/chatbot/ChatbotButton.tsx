import React from 'react';
import {BotMessageSquare} from 'lucide-react';

const buttonStyle: React.CSSProperties = {
    position: 'fixed',
    bottom: '32px',
    right: '32px',
    width: '64px',
    height: '64px',
    borderRadius: '50%',
    background: 'linear-gradient(135deg, #4f8cff 60%, #6ee7b7 100%)',
    boxShadow: '0 4px 16px rgba(0,0,0,0.18)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    border: 'none',
    cursor: 'pointer',
    zIndex: 800,
    transition: 'box-shadow 0.2s',
};

const iconStyle: React.CSSProperties = {
    width: '32px',
    height: '32px',
    color: '#fff',
};

type ChatbotButtonProps = {
    onClick: () => void;
    isVisible?: boolean;
};

const ChatbotButton: React.FC<ChatbotButtonProps> = ({ onClick, isVisible }) => {
    if (!isVisible) return null;

    return (
        <button style={buttonStyle} onClick={onClick} aria-label="Open Chatbot">
            <BotMessageSquare style={iconStyle} />
        </button>
    )
    
};

export default ChatbotButton;