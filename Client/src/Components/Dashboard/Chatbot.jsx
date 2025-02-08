// Components/Dashboard/Chatbot.jsx
import { useState, useEffect, useRef } from 'react';
import { X, Send } from 'lucide-react';
import ChatService from '../../../services/chatService';
import { useUser } from "@clerk/clerk-react";

const Chatbot = ({ isOpen, onClose }) => {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([
    { text: "Hello! I'm your AI learning assistant. How can I help you today?", isBot: true }
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const { user } = useUser();
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const sendMessage = async (e) => {
    e.preventDefault();
    if (message.trim()) {
      const userMessage = { text: message, isBot: false };
      setMessages(prev => [...prev, userMessage]);
      setIsLoading(true);

      try {
        const response = await ChatService.sendMessage(message, user?.id || 'anonymous');
        
        let botResponse;
        if (response.source === 'promptrepo') {
          // Format PromptRepo response
          botResponse = {
            text: formatPromptRepoResponse(response.response[0]),
            isBot: true,
            isStructured: true
          };
        } else {
          // Regular Gemini response
          botResponse = {
            text: response.response,
            isBot: true
          };
        }

        setMessages(prev => [...prev, botResponse]);
      } catch (error) {
        setMessages(prev => [...prev, {
          text: "Sorry, I encountered an error. Please try again.",
          isBot: true,
          isError: true
        }]);
      } finally {
        setIsLoading(false);
        setMessage('');
      }
    }
  };

  const formatPromptRepoResponse = (data) => {
    if (!data) return "Sorry, I couldn't process that request.";
    
    if (data.recommended_course_1) {
      return `Here are some recommended courses:

1. ${data.recommended_course_1} (${data.platform_1})
   - Difficulty: ${data.difficulty_1}
   - Duration: ${data.duration_1}
   - Prerequisites: ${data.prerequisites_1}

2. ${data.recommended_course_2} (${data.platform_2})
   - Difficulty: ${data.difficulty_2}
   - Duration: ${data.duration_2}
   - Prerequisites: ${data.prerequisites_2}

Recommended learning order: ${data.learning_order}
Estimated completion time: ${data.estimated_completion}`;
    }
    
    return JSON.stringify(data, null, 2);
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
              } ${msg.isError ? 'bg-red-100 text-red-600' : ''}`}
            >
              <pre className={`whitespace-pre-wrap ${msg.isStructured ? 'font-mono text-sm' : ''}`}>
                {msg.text}
              </pre>
            </div>
          ))}
          {isLoading && (
            <div className="bg-[#E7E8FC] p-3 rounded-xl max-w-[80%] mr-auto">
              <div className="flex space-x-2">
                <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" />
                <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce delay-100" />
                <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce delay-200" />
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        <form onSubmit={sendMessage} className="mt-4">
          <div className="flex space-x-2">
            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Type your message..."
              className="flex-1 bg-[#E7E8FC]/20 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#C1BEFA]"
              disabled={isLoading}
            />
            <button
              type="submit"
              className={`p-2 bg-[#C1BEFA] rounded-lg transition-colors ${
                isLoading ? 'opacity-50 cursor-not-allowed' : 'hover:bg-[#C1BEFA]/90'
              }`}
              disabled={isLoading}
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