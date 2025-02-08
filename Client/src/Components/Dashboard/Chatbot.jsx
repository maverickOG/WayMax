import { useState } from 'react';
import { X, Send } from 'lucide-react';

const Chatbot = ({ isOpen, onClose }) => {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([
    { text: "Hello! I'm your AI learning assistant. How can I help you today?", isBot: true }
  ]);

  const sendMessage = (e) => {
    e.preventDefault();
    if (message.trim()) {
      setMessages(prev => [...prev, { text: message, isBot: false }]);
      setMessage('');
      setTimeout(() => {
        setMessages(prev => [...prev, { 
          text: "I'm analyzing your learning path and will suggest relevant resources shortly.", 
          isBot: true 
        }]);
      }, 1000);
    }
  };

  return (
    <div className="w-80 h-screen border-l border-[#E7E8FC] bg-white py-16 px-4">
      <div className="h-full flex flex-col">
        <div className="flex items-center justify-between mb-4 px-4">
          <h3 className="font-semibold text-[#1D1D1D]">AI Learning Assistant</h3>
          <button onClick={onClose} className="p-1 hover:bg-[#E7E8FC]/10 rounded">
            <X className="w-5 h-5" />
          </button>
        </div>
        
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`p-3 rounded-xl max-w-[80%] ${
                msg.isBot
                  ? 'bg-[#E7E8FC] mr-auto'
                  : 'bg-[#C1BEFA] text-white ml-auto'
              }`}
            >
              {msg.text}
            </div>
          ))}
        </div>

        <form onSubmit={sendMessage} className="mt-4">
          <div className="flex space-x-2">
            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Type your message..."
              className="flex-1 bg-[#E7E8FC]/20 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#C1BEFA]"
            />
            <button
              type="submit"
              className="p-2 bg-[#C1BEFA] rounded-lg hover:bg-[#C1BEFA]/90 transition-colors"
            >
              <Send className="w-5 h-5 text-white" />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Chatbot;