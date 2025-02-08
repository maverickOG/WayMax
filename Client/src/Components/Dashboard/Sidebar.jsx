import { BookOpen, Trophy, User, HelpCircle } from 'lucide-react';

const Sidebar = () => (
  <div className="w-72 h-screen bg-white border-r border-[#E7E8FC] py-16 px-8">
    <div className="mb-8 px-4">
      <h1 className="text-2xl font-bold text-[#1D1D1D]">WayMax</h1>
    </div>
    
    <nav className="space-y-2">
      {[
        { icon: <BookOpen className="w-5 h-5" />, label: 'Learn', active: true },
        { icon: <Trophy className="w-5 h-5" />, label: 'Leaderboard' },
        { icon: <User className="w-5 h-5" />, label: 'Profile' },
        { icon: <HelpCircle className="w-5 h-5" />, label: 'FAQ' },
      ].map((item, index) => (
        <button
          key={index}
          className={`w-full flex items-center space-x-3 px-6 py-4 rounded-lg transition-all duration-200 ${
            item.active 
              ? 'bg-[#C1BEFA]/25 text-[#1D1D1D] font-medium' 
              : 'hover:bg-[#C1BEFA] text-[#1D1D1D]/80'
          }`}
        >
          {item.icon}
          <span>{item.label}</span>
        </button>
      ))}
    </nav>
  </div>
);

export default Sidebar;