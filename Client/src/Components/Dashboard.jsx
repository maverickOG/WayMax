import React, { useState } from 'react';
import {
  BookOpen,
  Trophy,
  User,
  HelpCircle,
  MessageCircle,
  X,
  Send,
  Menu
} from 'lucide-react';

const Dashboard = () => {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [chatMessages, setChatMessages] = useState([
    { text: "Hello! How can I help you with your learning journey today?", isBot: true }
  ]);

  const sendMessage = (e) => {
    e.preventDefault();
    if (message.trim()) {
      setChatMessages([...chatMessages, { text: message, isBot: false }]);
      setMessage('');
      // Simulate bot response
      setTimeout(() => {
        setChatMessages(prev => [...prev, { 
          text: "Thanks for your message! I'm here to help you learn.", 
          isBot: true 
        }]);
      }, 1000);
    }
  };

  return (
    <div className="flex h-screen bg-[#1D1D1D] text-[#FFFFFF]">
      {/* Sidebar */}
      <div className="w-64 border-r border-[#E7E8FC]/10">
        <div className="p-6">
          <h1 className="text-2xl font-bold">LearnCS</h1>
        </div>
        
        <nav className="mt-6">
          {[
            { icon: <BookOpen className="w-5 h-5" />, label: 'Learn', active: true },
            { icon: <Trophy className="w-5 h-5" />, label: 'Leaderboard' },
            { icon: <User className="w-5 h-5" />, label: 'Profile' },
            { icon: <HelpCircle className="w-5 h-5" />, label: 'FAQ' },
          ].map((item, index) => (
            <button
              key={index}
              className={`w-full flex items-center space-x-3 px-6 py-4 transition-colors ${
                item.active 
                  ? 'bg-[#C1BEFA]/10 border-r-4 border-[#C1BEFA]' 
                  : 'hover:bg-[#C1BEFA]/5'
              }`}
            >
              {item.icon}
              <span>{item.label}</span>
            </button>
          ))}
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        <div className="p-8">
          <h2 className="text-3xl font-bold mb-8">Your Learning Journey</h2>
          
          {/* Roadmap */}
          <div className="bg-[#1D1D1D] border-2 border-[#E7E8FC]/10 rounded-xl p-6">
            <div className="space-y-6">
              {[
                { title: 'Fundamentals', progress: 100, color: '#7EBB94' },
                { title: 'Data Structures', progress: 75, color: '#FFDB98' },
                { title: 'Algorithms', progress: 45, color: '#C1BEFA' },
                { title: 'System Design', progress: 10, color: '#E7E8FC' },
              ].map((item, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex justify-between">
                    <span>{item.title}</span>
                    <span>{item.progress}%</span>
                  </div>
                  <div className="h-2 bg-[#E7E8FC]/10 rounded-full">
                    <div 
                      className="h-full rounded-full transition-all duration-300"
                      style={{ 
                        width: `${item.progress}%`,
                        backgroundColor: item.color
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Chat Button */}
      <button
        onClick={() => setIsChatOpen(true)}
        className="fixed bottom-6 right-6 p-4 bg-[#C1BEFA] rounded-full shadow-lg hover:bg-[#C1BEFA]/90 transition-colors"
      >
        <MessageCircle className="w-6 h-6 text-[#1D1D1D]" />
      </button>

      {/* Chat Popup */}
      {isChatOpen && (
        <div className="fixed bottom-24 right-6 w-96 bg-[#1D1D1D] border-2 border-[#E7E8FC]/10 rounded-xl shadow-xl">
          <div className="flex items-center justify-between p-4 border-b border-[#E7E8FC]/10">
            <h3 className="font-semibold">AI Learning Assistant</h3>
            <button 
              onClick={() => setIsChatOpen(false)}
              className="p-1 hover:bg-[#E7E8FC]/10 rounded"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
          
          <div className="h-96 overflow-y-auto p-4 space-y-4">
            {chatMessages.map((msg, index) => (
              <div
                key={index}
                className={`p-3 rounded-xl max-w-[80%] ${
                  msg.isBot
                    ? 'bg-[#C1BEFA]/10 mr-auto'
                    : 'bg-[#C1BEFA] text-[#1D1D1D] ml-auto'
                }`}
              >
                {msg.text}
              </div>
            ))}
          </div>

          <form onSubmit={sendMessage} className="p-4 border-t border-[#E7E8FC]/10">
            <div className="flex space-x-2">
              <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Type your message..."
                className="flex-1 bg-[#E7E8FC]/10 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#C1BEFA]"
              />
              <button
                type="submit"
                className="p-2 bg-[#C1BEFA] rounded-lg hover:bg-[#C1BEFA]/90 transition-colors"
              >
                <Send className="w-5 h-5 text-[#1D1D1D]" />
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default Dashboard;