import { useState, useEffect } from "react";
import { BookOpen, Trophy, User, HelpCircle } from "lucide-react";
import { UserProfile } from "@clerk/clerk-react";
import { Link } from "react-router-dom"; // Import Link for navigation

const Sidebar = () => {
  const [showUserProfile, setShowUserProfile] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        setShowUserProfile(false);
      }
    };

    if (showUserProfile) {
      document.addEventListener("keydown", handleKeyDown);
    } else {
      document.removeEventListener("keydown", handleKeyDown);
    }

    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [showUserProfile]);

  return (
    <div className="w-72 h-screen bg-white border-r border-[#E7E8FC] py-16 px-8 relative">
      <div className="mb-8 px-4">
        <h1 className="text-2xl font-bold text-[#1D1D1D]">WayMax</h1>
      </div>

      <nav className="space-y-2">
        {[
          { icon: <BookOpen className="w-5 h-5" />, label: "Learn" },
          {
            icon: <Trophy className="w-5 h-5" />,
            label: "Leaderboard",
            // Wrap the "Leaderboard" button in a Link component for navigation
            component: (
              <Link to="/leaderboard">
                <button className="w-full flex items-center space-x-3 px-6 py-4 rounded-lg transition-all duration-200 hover:bg-[#C1BEFA] text-[#1D1D1D]/80">
                  <Trophy className="w-5 h-5" />
                  <span>Leaderboard</span>
                </button>
              </Link>
            ),
          },
          {
            icon: <User className="w-5 h-5" />,
            label: "Profile",
            onClick: () => setShowUserProfile(true),
          },
          { icon: <HelpCircle className="w-5 h-5" />, label: "FAQ" },
        ].map((item, index) =>
          item.component ? (
            item.component
          ) : (
            <button
              key={index}
              onClick={item.onClick}
              className="w-full flex items-center space-x-3 px-6 py-4 rounded-lg transition-all duration-200 hover:bg-[#C1BEFA] text-[#1D1D1D]/80"
            >
              {item.icon}
              <span>{item.label}</span>
            </button>
          ),
        )}
      </nav>

      {showUserProfile && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center z-50"
          onClick={() => setShowUserProfile(false)}
        >
          <div
            className="relative"
            onClick={(e) => e.stopPropagation()} // Prevents modal from closing when clicking inside
          >
            <UserProfile />
          </div>
        </div>
      )}
    </div>
  );
};

export default Sidebar;
