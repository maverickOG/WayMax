import { useState } from 'react';
import { MessageCircle } from 'lucide-react';
import Sidebar from './Sidebar';
import Roadmap from './Roadmap';
import Chatbot from './Chatbot';

const Dashboard = () => {
  const [isChatOpen, setIsChatOpen] = useState(true);

  return (
    <div className="flex">
      <Sidebar />
      <Roadmap />
      {isChatOpen && <Chatbot onClose={() => setIsChatOpen(false)} />}
      
      {!isChatOpen && (
        <button
          onClick={() => setIsChatOpen(true)}
          className="fixed bottom-6 right-6 p-4 bg-[#C1BEFA] rounded-full shadow-lg hover:bg-[#C1BEFA]/90 transition-colors"
        >
          <MessageCircle className="w-6 h-6 text-white" />
        </button>
      )}
    </div>
  );
};

export default Dashboard;