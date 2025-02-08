import { BookOpenCheck, Code, Video, Puzzle, ChevronRight } from 'lucide-react';
import { motion } from 'framer-motion';

const learningPath = [
  {
    title: "Programming Fundamentals",
    type: "section",
    items: [
      {
        title: "Introduction to Programming",
        type: "content",
        icon: <BookOpenCheck className="w-5 h-5" />,
        color: "#C1BEFA",
        completed: true,
        link: "https://example.com/intro"
      },
      {
        title: "Build a Calculator",
        type: "project",
        icon: <Code className="w-5 h-5" />,
        color: "#7EBB94",
        completed: true,
        link: "https://example.com/calculator"
      },
    ]
  },
  {
    title: "Data Structures",
    type: "section",
    items: [
      {
        title: "Arrays & Linked Lists",
        type: "video",
        icon: <Video className="w-5 h-5" />,
        color: "#FFDB98",
        completed: false,
        link: "https://example.com/arrays"
      },
      {
        title: "Task Manager App",
        type: "project",
        icon: <Code className="w-5 h-5" />,
        color: "#7EBB94",
        completed: false,
        link: "https://example.com/task-manager"
      },
    ]
  },
  {
    title: "Algorithms",
    type: "section",
    items: [
      {
        title: "Sorting Algorithms",
        type: "interactive",
        icon: <Puzzle className="w-5 h-5" />,
        color: "#E7E8FC",
        completed: false,
        link: "https://example.com/sorting"
      },
    ]
  }
];

const Roadmap = () => {
  return (
    <div className="flex-1 h-screen overflow-y-auto py-16 px-36">
      <h2 className="text-4xl font-bold text-[#1D1D1D] mb-8">Your Learning Path</h2>
      
      <div className="space-y-12">
        {learningPath.map((section, sectionIndex) => (
          <div key={sectionIndex} className="space-y-4">
            <h3 className="text-xl font-semibold text-[#1D1D1D]/80">{section.title}</h3>
            
            <div className="space-y-4">
              {section.items.map((item, itemIndex) => (
                <motion.div
                  key={itemIndex}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: itemIndex * 0.1 }}
                  className={`p-4 rounded-xl border-2 ${
                    item.completed 
                      ? 'border-[#7EBB94]/30 bg-[#7EBB94]/5' 
                      : 'border-[#E7E8FC] hover:border-[#C1BEFA]/50'
                  } transition-all duration-200 cursor-pointer group`}
                >
                  <div className="flex items-center space-x-4">
                    <div 
                      className="p-2 rounded-lg"
                      style={{ backgroundColor: `${item.color}20` }}
                    >
                      {item.icon}
                    </div>
                    
                    <div className="flex-1">
                      <h4 className="font-medium text-[#1D1D1D]">{item.title}</h4>
                      <p className="text-sm text-[#1D1D1D]/60 capitalize">{item.type}</p>
                    </div>

                    <ChevronRight className="w-5 h-5 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Roadmap;