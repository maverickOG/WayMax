const express = require('express');
const router = express.Router();
const { GoogleGenerativeAI } = require('@google/generative-ai');

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const chatHistories = new Map();

// Initial system prompt to set context
const INITIAL_PROMPT = `You are an educational advisor and course recommendation expert. Your role is to:
1. Help users find the best learning path based on their goals and experience
2. Recommend specific courses and resources
3. Provide structured learning plans
4. Answer questions about programming, technology, and career development

When recommending courses:
- Ask about user's current skill level if not mentioned
- Consider time commitment and learning style
- Suggest free resources when available
- Provide structured learning paths
- Break down complex topics into manageable steps

Focus areas:
- Programming and development
- Data science and AI
- Web development
- Mobile development
- Cloud computing
- Cybersecurity`;

// Function to format course recommendations
function formatCoursePrompt(userMessage) {
  return `As an educational advisor, please help with: ${userMessage}

Consider:
- Skill level required
- Time commitment
- Prerequisites
- Learning outcomes
- Practical projects
- Industry relevance

Provide recommendations in a clear, structured format.`;
}

router.post('/chat', async (req, res) => {
  try {
    const { message, sessionId, queryType } = req.body;
    
    if (!sessionId) {
      return res.status(400).json({ error: 'Session ID is required' });
    }

    // Get or create chat history
    if (!chatHistories.has(sessionId)) {
      const model = genAI.getGenerativeModel({ model: "gemini-pro" });
      const chat = model.startChat({
        history: [
          {
            role: "user",
            parts: INITIAL_PROMPT,
          },
          {
            role: "model",
            parts: "I understand my role as an educational advisor. I'll provide tailored course recommendations and learning paths based on users' needs and goals.",
          },
        ],
        generationConfig: {
          maxOutputTokens: 2048,
          temperature: 0.7,
        },
      });
      chatHistories.set(sessionId, chat);
    }

    const chat = chatHistories.get(sessionId);
    
    let formattedMessage = message;
    if (queryType === 'course_recommendation') {
      formattedMessage = formatCoursePrompt(message);
    }

    const result = await chat.sendMessage(formattedMessage);
    const response = await result.response;
    const text = response.text();
    
    res.json({ 
      response: text,
      sessionId: sessionId
    });

  } catch (error) {
    console.error('Chat error:', error);
    res.status(500).json({ error: 'Failed to get response' });
  }
});

router.post('/learning-path', async (req, res) => {
  try {
    const { goal, experience, timeCommitment, sessionId } = req.body;
    
    const prompt = `Create a detailed learning path for someone with the following:
    Goal: ${goal}
    Current Experience: ${experience}
    Available Time: ${timeCommitment}

    Please provide:
    1. Step-by-step learning plan
    2. Estimated time for each step
    3. Recommended resources
    4. Practice projects
    5. Milestones to track progress`;

    // Use the existing chat mechanism with the specialized prompt
    const chat = chatHistories.get(sessionId) || await initializeChat(sessionId);
    const result = await chat.sendMessage(prompt);
    const response = await result.response;
    
    res.json({ 
      response: response.text(),
      sessionId: sessionId
    });
  } catch (error) {
    console.error('Learning path error:', error);
    res.status(500).json({ error: 'Failed to generate learning path' });
  }
});

async function initializeChat(sessionId) {
  const model = genAI.getGenerativeModel({ model: "gemini-pro" });
  const chat = model.startChat({
    history: [{ role: "user", parts: INITIAL_PROMPT }],
    generationConfig: {
      maxOutputTokens: 2048,
      temperature: 0.7,
    },
  });
  chatHistories.set(sessionId, chat);
  return chat;
}

module.exports = router;