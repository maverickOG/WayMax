// services/ChatService.js
import axios from 'axios';

const API_URL = 'http://localhost:3000/api';

export const ChatService = {
  sendMessage: async (message, sessionId) => {
    try {
      const response = await axios.post(`${API_URL}/chatbot/chat`, {
        message,
        sessionId
      });
      return response.data;
    } catch (error) {
      console.error('Chat error:', error);
      throw error;
    }
  },

  getLearningPath: async (goal, experience, timeCommitment) => {
    try {
      const response = await axios.post(`${API_URL}/chatbot/learning-path`, {
        goal,
        experience,
        timeCommitment,
        sessionId: 'user123'
      });
      return response.data;
    } catch (error) {
      console.error('Learning path error:', error);
      throw error;
    }
  }
};

export default ChatService;