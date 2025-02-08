import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import AuthPage from "./pages/AuthPage";
// import Leaderboard from "./components/leaderboard";
import Dashboard from "./Components/Dashboard/Dashboard";
import ComingSoon from "./Components/ComingSoon";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/auth" element={<AuthPage />} />
        <Route path="/leaderboard" element={<ComingSoon />} />
        <Route path="/faqs" element={<ComingSoon />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </Router>
  );
}

export default App;
