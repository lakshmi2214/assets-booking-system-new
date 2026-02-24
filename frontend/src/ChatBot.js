import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaRobot, FaPaperPlane, FaBars, FaQuestionCircle, FaNewspaper, FaRedo, FaTimes, FaSearch, FaBoxOpen, FaCalendarCheck } from 'react-icons/fa';
import './ChatBot.css';

const ChatBot = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState([
        { id: 1, text: "Welcome to Asset Booking System (ABS). I am your automated Smart Assistant here to help you.", sender: 'bot' },
        { id: 2, text: "What can I do for you today?", sender: 'bot' }
    ]);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [inputValue, setInputValue] = useState("");
    const messagesEndRef = useRef(null);
    const navigate = useNavigate();

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages, isOpen]);

    const handleSendMessage = (text = inputValue) => {
        if (!text.trim()) return;

        // Add user message
        const newUserMsg = { id: Date.now(), text: text, sender: 'user' };
        setMessages(prev => [...prev, newUserMsg]);
        setInputValue("");

        // Simulate Bot Response
        setTimeout(() => {
            let botResponse = { id: Date.now() + 1, text: "I'm not sure I understand. Try checking the menu options!", sender: 'bot' };
            const lowerText = text.toLowerCase();

            if (lowerText.includes('asset') || lowerText.includes('browse')) {
                botResponse.text = "You can view all our available assets on the inventory page.";
                setTimeout(() => navigate('/assets'), 1500);
            } else if (lowerText.includes('book') || lowerText.includes('reservation')) {
                botResponse.text = "Ready to make a booking? Let me take you there.";
                setTimeout(() => navigate('/book-asset'), 1500);
            } else if (lowerText.includes('hello') || lowerText.includes('hi')) {
                botResponse.text = "Hello! How can I assist you with your asset requirements?";
            } else if (lowerText.includes('help')) {
                botResponse.text = "You can use the menu below to browse assets, manage bookings, or check FAQs.";
            }

            setMessages(prev => [...prev, botResponse]);
        }, 800);
    };

    const handleReset = () => {
        setMessages([
            { id: 1, text: "Welcome to Asset Booking System (ABS). I am your automated Smart Assistant here to help you.", sender: 'bot' },
            { id: 2, text: "What can I do for you today?", sender: 'bot' }
        ]);
        setIsMenuOpen(false);
    };

    const QuickOption = ({ text, action }) => (
        <button className="option-chip" onClick={() => handleSendMessage(text)}>
            {text}
        </button>
    );

    return (
        <div className="chatbot-container">
            {/* Toggle Button */}
            {!isOpen && (
                <button className="chatbot-toggle" onClick={() => setIsOpen(true)}>
                    <FaRobot />
                </button>
            )}

            {/* Chat Window */}
            {isOpen && (
                <div className="chatbot-window">
                    <div className="chatbot-header">
                        <div className="chatbot-title">
                            <div className="bot-avatar-small"><FaRobot /></div>
                            ABS Assistant
                        </div>
                        <button style={{ background: 'none', border: 'none', color: 'white', fontSize: '1.2rem', cursor: 'pointer' }} onClick={() => setIsOpen(false)}>
                            <FaTimes />
                        </button>
                    </div>

                    {/* Chat Area */}
                    <div className="chatbot-messages">
                        {messages.map((msg) => (
                            <div key={msg.id} className={`message ${msg.sender}`}>
                                {msg.text}
                            </div>
                        ))}
                        {messages[messages.length - 1].sender === 'bot' && (
                            <div className="chatbot-options">
                                <QuickOption text="Browse Assets" />
                                <QuickOption text="My Bookings" />
                                <QuickOption text="Help" />
                            </div>
                        )}
                        <div ref={messagesEndRef} />
                    </div>

                    {/* Input Area */}
                    <div className="chatbot-input-area">
                        <input
                            type="text"
                            className="chatbot-input"
                            placeholder="Type your message..."
                            value={inputValue}
                            onChange={(e) => setInputValue(e.target.value)}
                            onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                        />
                        <button className="chatbot-send" onClick={() => handleSendMessage()}>
                            <FaPaperPlane />
                        </button>
                    </div>

                    {/* Bottom Nav */}
                    <div className="chatbot-nav">
                        <button className="nav-item" onClick={() => setIsMenuOpen(true)}>
                            <FaBars className="nav-icon" />
                            <span>Menu</span>
                        </button>
                        <button className="nav-item" onClick={() => handleSendMessage("Show me FAQs")}>
                            <FaQuestionCircle className="nav-icon" />
                            <span>FAQs</span>
                        </button>
                        <button className="nav-item" onClick={() => handleSendMessage("Any new updates?")}>
                            <FaNewspaper className="nav-icon" />
                            <span>News</span>
                        </button>
                        <button className="nav-item" onClick={handleReset}>
                            <FaRedo className="nav-icon" />
                            <span>Reset</span>
                        </button>
                    </div>

                    {/* Overlay Menu (Like in screenshot) */}
                    {isMenuOpen && (
                        <div className="menu-modal-overlay">
                            <h3 className="menu-title">Menu</h3>
                            <div className="menu-grid">
                                <div className="menu-circle-btn" onClick={() => { setIsMenuOpen(false); navigate('/assets'); }}>
                                    <FaSearch size={24} />
                                    <span style={{ fontSize: '12px', fontWeight: '500' }}>Browse</span>
                                </div>
                                <div className="menu-circle-btn" onClick={() => { setIsMenuOpen(false); navigate('/book-asset'); }}>
                                    <FaCalendarCheck size={24} />
                                    <span style={{ fontSize: '12px', fontWeight: '500' }}>Book</span>
                                </div>
                                <div className="menu-circle-btn" onClick={() => { setIsMenuOpen(false); navigate('/bookings'); }}>
                                    <FaBoxOpen size={24} />
                                    <span style={{ fontSize: '12px', fontWeight: '500' }}>My Items</span>
                                </div>
                            </div>
                            <button className="close-menu-btn" onClick={() => setIsMenuOpen(false)}>Close</button>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default ChatBot;
