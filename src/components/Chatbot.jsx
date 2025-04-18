// Chatbot.jsx
import React, { useState } from 'react';
import { FaComments } from 'react-icons/fa';

const Chatbot = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMsg = { sender: "user", text: input };
    setMessages(prev => [...prev, userMsg]);

    const botResponse = await fetch("http://localhost:5000/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message: input }),
    }).then(res => res.json());

    setMessages(prev => [...prev, { sender: "bot", text: botResponse.reply }]);
    setInput("");
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleSend();
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* Chat icon button */}
      {!isOpen && (
        <button
          className="bg-blue-600 text-white p-4 rounded-full shadow-lg hover:bg-blue-700 transition"
          onClick={() => setIsOpen(true)}
        >
          <FaComments className="w-6 h-6" />
        </button>
      )}

      {/* Chat window */}
      {isOpen && (
        <div className="bg-white rounded-xl shadow-lg w-80 h-[400px] flex flex-col">
          {/* Header */}
          <div className="bg-blue-600 text-white px-4 py-2 rounded-t-xl flex justify-between items-center">
            <span className="font-medium">AI Assistant</span>
            <button
              className="text-white text-lg"
              onClick={() => setIsOpen(false)}
            >
              ×
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto px-3 py-2">
            {messages.map((msg, i) => (
              <div key={i} className={`my-1 text-sm ${msg.sender === 'user' ? 'text-right' : 'text-left'}`}>
                <span className={`${msg.sender === 'user' ? 'bg-blue-100' : 'bg-gray-100'} px-3 py-1 rounded-xl inline-block`}>
                  {msg.text}
                </span>
              </div>
            ))}
          </div>

          {/* Input */}
          <div className="flex gap-2 px-3 pb-3">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              className="flex-1 px-2 border border-gray-300 rounded"
              placeholder="Ask something..."
            />
            <button
              onClick={handleSend}
              className="px-3 bg-blue-500 text-white rounded"
            >
              Send
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Chatbot;
