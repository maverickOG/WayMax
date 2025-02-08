import React, { useEffect, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import {
  ChevronRight,
  Star,
  MessageCircle,
  Trophy,
  BookOpen,
  Bot,
  Users,
  Github,
  Twitter,
  Linkedin,
  Instagram,
  ArrowRight,
  Mail,
  Heart,
  GraduationCap,
  Code,
  ScrollText,
  ChevronUp,
  User,
} from "lucide-react";
import { useUser, SignIn, SignUp } from "@clerk/clerk-react";
import { useNavigate } from "react-router-dom";

const LandingPage = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [showSignInModal, setShowSignInModal] = useState(false);
  const [showSignUpModal, setShowSignUpModal] = useState(false);
  const { scrollYProgress } = useScroll();
  const scale = useTransform(scrollYProgress, [0, 1], [0.98, 1]);
  const { isSignedIn, user } = useUser();
  const navigate = useNavigate();

  // Redirect if signed in
  useEffect(() => {
    if (isSignedIn) {
      navigate("/dashboard");
    }
  }, [isSignedIn, navigate]);

  // Scroll to top functionality
  const toggleVisibility = () => {
    if (window.pageYOffset > 300) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    window.addEventListener("scroll", toggleVisibility);
    return () => {
      window.removeEventListener("scroll", toggleVisibility);
    };
  }, []);

  // Enhanced animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
    },
  };

  const fadeIn = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 },
  };

  const cards = [
    {
      title: "Data Structures and Algorithms",
      description: "Master the fundamentals of programming",
      lessons: "15+ Lessons",
      bgColor: "bg-green-100/25",
      topics: [
        "Arrays, Linked Lists & Trees",
        "Searching & Sorting Algorithms",
        "Dynamic Programming & Graphs",
        "Problem Solving Techniques",
      ],
    },
    {
      title: "Full Stack Development",
      description: "Build modern web applications",
      lessons: "25+ Lessons",
      bgColor: "bg-amber-100/25",
      topics: [
        "Frontend (React, Next.js)",
        "Backend (Node.js, Express)",
        "Databases & API Design",
        "DevOps & Deployment",
      ],
    },
    {
      title: "AI & Machine Learning",
      description: "Dive into artificial intelligence",
      lessons: "32+ Lessons",
      bgColor: "bg-purple-100/25",
      topics: [
        "Machine Learning Fundamentals",
        "Deep Learning & Neural Networks",
        "Natural Language Processing",
        "Computer Vision & Applications",
      ],
    },
  ];

  const features = [
    {
      icon: <BookOpen className="w-12 h-12" />,
      title: "Interactive Learning",
      description:
        "Learn by doing with hands-on coding exercises and real-time feedback",
      bg: "bg-indigo-50",
    },
    {
      icon: <Trophy className="w-12 h-12" />,
      title: "Gamified Experience",
      description:
        "Earn rewards, track progress, and compete with friends while learning",
      bg: "bg-amber-50",
    },
    {
      icon: <Users className="w-12 h-12" />,
      title: "Community Support",
      description: "Join a community of learners and get help when you need it",
      bg: "bg-indigo-50",
    },
    {
      icon: <Bot className="w-12 h-12" />,
      title: "AI Learning Assistant",
      description:
        "Get instant help from our Gemini-powered AI chatbot available 24/7",
      bg: "bg-amber-50",
    },
  ];

  // Modal Components
  const SignInModal = () => (
    <div
      className={`fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 ${showSignInModal ? "" : "hidden"}`}
    >
      <div>
        <button
          onClick={() => setShowSignInModal(false)}
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
        ></button>
        <SignIn />
      </div>
    </div>
  );

  const SignUpModal = () => (
    <div
      className={`fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 ${showSignUpModal ? "" : "hidden"}`}
    >
      <div>
        <button
          onClick={() => setShowSignUpModal(false)}
          // className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
        ></button>
        <SignUp />
      </div>
    </div>
  );

  return (
    <div className="w-full relative">
      <SignInModal />
      <SignUpModal />

      {/* Announcement Bar */}
      <div className="w-full h-9 bg-amber-100 flex items-center justify-center text-sm font-medium">
        🎉 New Course Alert: System Design Fundamentals - Learn More
      </div>

      {/* Navigation */}
      <nav className="bg-white py-6 px-8 border-b">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="text-2xl font-bold">WayMax</div>
          <div className="flex items-center space-x-8">
            <a href="#" className="text-gray-700 hover:text-gray-900">
              Courses
            </a>
            <a href="#" className="text-gray-700 hover:text-gray-900">
              Paths
            </a>
            <a href="#" className="text-gray-700 hover:text-gray-900">
              Community
            </a>
            <a href="#" className="text-gray-700 hover:text-gray-900">
              About
            </a>
            {isSignedIn ? (
              <button
                onClick={() => navigate("/dashboard")}
                className="px-6 py-2 bg-amber-200 rounded-lg hover:bg-amber-300 transition-colors"
              >
                Dashboard
              </button>
            ) : (
              <button
                onClick={() => setShowSignInModal(true)}
                className="px-6 py-2 bg-amber-200 rounded-lg hover:bg-amber-300 transition-colors"
              >
                Sign In
              </button>
            )}
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <motion.section
        className="bg-amber-50 py-24"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <div className="max-w-7xl mx-auto px-8 grid grid-cols-2 gap-12">
          <div className="space-y-8">
            <motion.h1
              className="text-6xl font-black leading-tight"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              Master Computer Science Like Never Before
            </motion.h1>
            <motion.p
              className="text-2xl text-gray-700"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              Interactive lessons, real-world projects, and AI-powered
              assistance to help you become a skilled programmer.
            </motion.p>
            <motion.div
              className="flex space-x-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              {isSignedIn ? (
                <button
                  onClick={() => navigate("/dashboard")}
                  className="px-8 py-4 bg-amber-200 rounded-xl text-xl hover:bg-amber-300 transition-colors"
                >
                  Go to Dashboard
                </button>
              ) : (
                <button
                  onClick={() => setShowSignUpModal(true)}
                  className="px-8 py-4 bg-amber-200 rounded-xl text-xl hover:bg-amber-300 transition-colors"
                >
                  Get Started
                </button>
              )}
              <button
                onClick={() => {
                  document
                    .getElementById("learning-paths")
                    ?.scrollIntoView({ behavior: "smooth" });
                }}
                className="px-8 py-4 border-2 border-amber-400 rounded-xl text-xl hover:bg-amber-100 transition-colors"
              >
                View Curriculum
              </button>
            </motion.div>
            <p className="text-sm text-gray-600">
              We'll never share your information with anyone.
            </p>
          </div>
          <div className="relative">
            {/* Placeholder for hero illustration */}
            <div className="w-full h-full bg-amber-200/20 rounded-2xl flex items-center justify-center">
              <p className="text-gray-500">Hero Illustration</p>
            </div>
          </div>
        </div>
      </motion.section>

      {/* Features Section */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-8">
          <h2 className="text-4xl font-bold text-center mb-16">
            Why Choose Our Platform?
          </h2>
          <div className="grid grid-cols-1 gap-6">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                className={`p-12 rounded-xl border-2 border-black ${feature.bg} hover:scale-[1.02] transition-transform`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <div className="flex items-start space-x-6">
                  {feature.icon}
                  <div>
                    <h3 className="text-2xl font-medium mb-2">
                      {feature.title}
                    </h3>
                    <p className="text-xl text-gray-700">
                      {feature.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* AI Assistant Section */}
      <section className="bg-indigo-50/50 py-24">
        <div className="max-w-7xl mx-auto px-8">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            <h2 className="text-4xl font-bold mb-8">
              Meet Your AI Learning Assistant
            </h2>
            <p className="text-xl mb-12">
              Powered by Google's Gemini AI, our intelligent chatbot provides
              instant help, explanations, and guidance throughout your learning
              journey. Get unstuck quickly with personalized support available
              right in your learning dashboard.
            </p>

            {/* Chat Demo */}
            <div className="bg-white rounded-xl border-2 border-black p-6 space-y-4">
              {/* User Message */}
              <div className="flex items-center space-x-4">
                <User className="w-6 h-6 text-black -mt-0.5" />
                <div className="bg-amber-100/25 rounded-xl p-4">
                  <p className="text-lg">
                    How can I understand recursion better?
                  </p>
                </div>
              </div>

              {/* AI Response */}
              <div className="flex items-center space-x-4">
                <Bot className="w-6 h-6 text-black -mt-0.5" />
                <div className="bg-green-100/25 rounded-xl p-4">
                  <p className="text-lg">
                    Let me explain recursion with a simple example and then
                    break it down...
                  </p>
                </div>
              </div>
            </div>

            <ul className="space-y-4 text-xl">
              {[
                "24/7 instant support for your questions",
                "Detailed explanations of complex concepts",
                "Code debugging assistance",
                "Practice problem suggestions",
                "Learning path recommendations",
              ].map((item, index) => (
                <motion.li
                  key={index}
                  className="flex items-center space-x-4"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Star className="w-6 h-6 text-amber-400" />
                  <span>{item}</span>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        </div>
      </section>

      {/* Learning Paths Section */}
      <section className="py-24" id="learning-paths">
        <div className="max-w-7xl mx-auto px-8">
          <h2 className="text-4xl font-bold mb-16">Learning Paths</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {cards.map((card, index) => (
              <motion.div
                key={card.title}
                className={`${card.bgColor} border-2 border-black rounded-xl p-8 space-y-6`}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <h3 className="text-2xl font-medium">{card.title}</h3>
                <p className="text-lg">{card.description}</p>
                <p className="text-blue-600 text-sm">{card.lessons}</p>
                <ul className="space-y-2">
                  {card.topics.map((topic, i) => (
                    <li key={i} className="flex items-center space-x-2 text-lg">
                      <ChevronRight className="w-4 h-4" />
                      <span>{topic}</span>
                    </li>
                  ))}
                </ul>
                <button className="w-full py-3 bg-white rounded-xl text-blue-600 hover:bg-gray-50 transition-colors flex items-center justify-center space-x-2">
                  <span>Explore Path</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </motion.div>
            ))}
          </div>
          <div className="mt-16 text-center">
            <p className="text-2xl mb-4">And that's not all.</p>
            <p className="text-lg text-gray-700">
              Explore more specialized paths in System Design, Object Oriented
              Programming, Cybersecurity, and many more...
            </p>
          </div>
        </div>
      </section>

      {/* Enhanced Footer */}
      <footer className="bg-gray-900 text-white pt-20 pb-10">
        <div className="max-w-7xl mx-auto px-8">
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {/* Company Info */}
            <motion.div variants={itemVariants} className="space-y-6">
              <h3 className="text-2xl font-bold">WayMax</h3>
              <p className="text-gray-400 leading-relaxed">
                Empowering the next generation of developers with cutting-edge
                computer science education and AI-powered learning assistance.
              </p>
              <div className="flex space-x-4">
                <motion.a
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  href="#"
                  className="p-2 bg-gray-800 rounded-lg hover:bg-gray-700 transition-colors"
                >
                  <Github className="w-5 h-5" />
                </motion.a>
                <motion.a
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  href="#"
                  className="p-2 bg-gray-800 rounded-lg hover:bg-gray-700 transition-colors"
                >
                  <Twitter className="w-5 h-5" />
                </motion.a>
                <motion.a
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  href="#"
                  className="p-2 bg-gray-800 rounded-lg hover:bg-gray-700 transition-colors"
                >
                  <Linkedin className="w-5 h-5" />
                </motion.a>
                <motion.a
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  href="#"
                  className="p-2 bg-gray-800 rounded-lg hover:bg-gray-700 transition-colors"
                >
                  <Instagram className="w-5 h-5" />
                </motion.a>
              </div>
            </motion.div>

            {/* Quick Links */}
            <motion.div variants={itemVariants} className="space-y-6">
              <h3 className="text-xl font-semibold">Quick Links</h3>
              <ul className="space-y-3">
                {[
                  {
                    text: "Courses",
                    icon: <GraduationCap className="w-4 h-4" />,
                  },
                  {
                    text: "Learning Paths",
                    icon: <Code className="w-4 h-4" />,
                  },
                  {
                    text: "Practice Problems",
                    icon: <ScrollText className="w-4 h-4" />,
                  },
                  {
                    text: "Success Stories",
                    icon: <Star className="w-4 h-4" />,
                  },
                ].map((item, index) => (
                  <motion.li
                    key={index}
                    whileHover={{ x: 5 }}
                    className="group"
                  >
                    <a
                      href="#"
                      className="flex items-center space-x-2 text-gray-400 hover:text-white transition-colors"
                    >
                      {item.icon}
                      <span>{item.text}</span>
                    </a>
                  </motion.li>
                ))}
              </ul>
            </motion.div>

            {/* Resources */}
            <motion.div variants={itemVariants} className="space-y-6">
              <h3 className="text-xl font-semibold">Resources</h3>
              <ul className="space-y-3">
                {[
                  "Documentation",
                  "Community Guidelines",
                  "Student Handbook",
                  "Career Resources",
                  "Partner Program",
                ].map((item, index) => (
                  <motion.li
                    key={index}
                    whileHover={{ x: 5 }}
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    <a href="#">{item}</a>
                  </motion.li>
                ))}
              </ul>
            </motion.div>

            {/* Newsletter */}
            <motion.div variants={itemVariants} className="space-y-6">
              <h3 className="text-xl font-semibold">Stay Updated</h3>
              <p className="text-gray-400">
                Subscribe to our newsletter for the latest updates, tutorials,
                and tech news.
              </p>
              <div className="space-y-4">
                <div className="relative">
                  <input
                    type="email"
                    placeholder="Enter your email"
                    className="w-full px-4 py-3 bg-gray-800 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-amber-400"
                  />
                  <button className="absolute right-2 top-1/2 transform -translate-y-1/2 p-2 bg-amber-400 rounded-lg hover:bg-amber-500 transition-colors">
                    <ArrowRight className="w-4 h-4 text-gray-900" />
                  </button>
                </div>
                <p className="text-sm text-gray-500">
                  By subscribing, you agree to our Privacy Policy and Terms of
                  Service.
                </p>
              </div>
            </motion.div>
          </motion.div>

          {/* Bottom Footer */}
          <motion.div
            variants={itemVariants}
            className="mt-16 pt-8 border-t border-gray-800"
          >
            <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
              <div className="flex items-center space-x-2 text-gray-400">
                <span>Made with</span>
                <Heart className="w-4 h-4 text-red-500" />
                <span>by the WayMax Team</span>
              </div>
              <div className="flex space-x-6 text-sm text-gray-400">
                <a href="#" className="hover:text-white transition-colors">
                  Privacy Policy
                </a>
                <a href="#" className="hover:text-white transition-colors">
                  Terms of Service
                </a>
                <a href="#" className="hover:text-white transition-colors">
                  Cookie Policy
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      </footer>

      {/* Scroll to Top Button */}
      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: isVisible ? 1 : 0 }}
        transition={{ duration: 0.2 }}
        onClick={scrollToTop}
        className={`fixed right-8 bottom-8 p-4 bg-amber-400 rounded-full shadow-lg hover:bg-amber-500 transition-colors ${
          isVisible ? "block" : "hidden"
        }`}
      >
        <ChevronUp className="w-6 h-6" />
      </motion.button>
    </div>
  );
};

export default LandingPage;
