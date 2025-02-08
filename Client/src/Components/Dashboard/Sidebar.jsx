import React, { useState, useEffect } from "react";
import { BookOpen, Trophy, User, HelpCircle } from "lucide-react";
import { UserProfile } from "@clerk/clerk-react";
import { Link, useLocation } from "react-router-dom";

const Sidebar = () => {
  const [showUserProfile, setShowUserProfile] = useState(false);
  const location = useLocation();

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

  const navigationItems = [
    {
      icon: BookOpen,
      label: "Learn",
      path: "/dashboard",
      activeColor: "#C1BEFA"
    },
    {
      icon: Trophy,
      label: "Leaderboard",
      path: "/leaderboard",
      activeColor: "#FFDB98"
    },
    {
      icon: User,
      label: "Profile",
      activeColor: "#C1BEFA",
      onClick: () => setShowUserProfile(true)
    },
    {
      icon: HelpCircle,
      label: "FAQ",
      path: "/faqs",
      activeColor: "#7EBB94"
    }
  ];

  const isActivePath = (path) => {
    if (path === "/dashboard") {
      return location.pathname === "/" || location.pathname === path;
    }
    return location.pathname === path;
  };

  return (
    <div className="flex flex-col bg-white w-64 py-16 px-4 space-y-4">
      <div className="px-4">
        <h1 className="text-3xl font-bold text-gray-800">WayMax</h1>
      </div>

      <nav className="flex-1 p-4">
        <ul className="space-y-2">
          {navigationItems.map((item) => {
            const isActive = item.path ? isActivePath(item.path) : false;
            const Icon = item.icon;

            const content = (
              <>
                <Icon 
                  className={`w-5 h-5 mr-3 ${isActive ? 'text-gray-800' : 'text-gray-600'}`}
                />
                <span className={`${isActive ? 'text-gray-800' : 'text-gray-600'}`}>
                  {item.label}
                </span>
              </>
            );

            const className = `
              flex items-center px-4 py-3 rounded-lg transition-all duration-200
              ${isActive ? 'bg-opacity-20 font-medium' : 'hover:bg-gray-100'}
            `;

            if (item.onClick) {
              return (
                <li key={item.label}>
                  <button
                    onClick={item.onClick}
                    className={className}
                    style={{
                      backgroundColor: isActive ? item.activeColor : 'transparent',
                      width: '100%',
                      textAlign: 'left'
                    }}
                  >
                    {content}
                  </button>
                </li>
              );
            }

            return (
              <li key={item.label}>
                <Link
                  to={item.path}
                  className={className}
                  style={{
                    backgroundColor: isActive ? item.activeColor : 'transparent',
                  }}
                >
                  {content}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      {showUserProfile && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center z-50"
          onClick={() => setShowUserProfile(false)}
        >
          <div 
            className="relative"
            onClick={(e) => e.stopPropagation()}
          >
            <UserProfile />
          </div>
        </div>
      )}
    </div>
  );
};

export default Sidebar;