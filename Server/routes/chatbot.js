const express = require('express');
const router = express.Router();
const { GoogleGenerativeAI } = require('@google/generative-ai');
const axios = require('axios');

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const PROMPTREPO_API_KEY = process.env.PROMPTREPO_API_KEY;
const PROMPTREPO_BASE_URL = 'https://api.promptrepo.com/api/private';

const chatHistories = new Map();

const INITIAL_PROMPT = `You are an educational advisor and course recommendation expert...`; // Your existing prompt

// Helper function to detect if we should use PromptRepo
async function shouldUsePromptRepo(message) {
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });
    const result = await model.generateContent(`
      Is this message asking for course recommendations or a learning path? Reply with only "YES" or "NO":
      "${message}"
    `);
    const response = await result.response.text();
    return response.trim().toUpperCase() === 'YES';
  } catch (error) {
    console.error('Detection error:', error);
    return false;
  }
}

router.post('/chat', async (req, res) => {
  try {
    const { message, sessionId } = req.body;
    
    if (!sessionId) {
      return res.status(400).json({ error: 'Session ID is required' });
    }

    // Check if we should use PromptRepo
    const usePromptRepo = await shouldUsePromptRepo(message);

    if (usePromptRepo) {
      try {
        // Try PromptRepo first
        const promptRepoResponse = await axios.post(
          `${PROMPTREPO_BASE_URL}/waymax-courserecommendationstrainingdata`,
          [{
            goal: message,
            experience_level: "any",
            time_available: "flexible",
            preferred_platform: "any",
            learning_style: "any"
          }],
          {
            headers: {
              'Content-Type': 'application/json',
              'x-api-key': PROMPTREPO_API_KEY
            }
          }
        );

        res.json({ 
          response: promptRepoResponse.data,
          sessionId: sessionId,
          source: 'promptrepo'
        });
        return;
      } catch (promptRepoError) {
        console.log('PromptRepo failed, falling back to Gemini:', promptRepoError);
        // Continue to Gemini if PromptRepo fails
      }
    }

    // Default Gemini behavior
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });

    if (!chatHistories.has(sessionId)) {
      const chat = model.startChat({
        history: [{
          role: "user",
          parts: [{ text: INITIAL_PROMPT }]
        }],
        generationConfig: {
          maxOutputTokens: 2048,
          temperature: 0.7,
        },
      });
      chatHistories.set(sessionId, chat);
    }

    const chat = chatHistories.get(sessionId);
    const result = await chat.sendMessage([{ text: message }]);
    const response = await result.response;
    
    res.json({ 
      response: response.text(),
      sessionId: sessionId,
      source: 'gemini'
    });

  } catch (error) {
    console.error('Chat error:', error);
    res.status(500).json({ error: 'Failed to get response' });
  }
});

// Modified learning path endpoint to try PromptRepo first
router.post('/learning-path', async (req, res) => {
  try {
    const { goal, experience, timeCommitment, sessionId } = req.body;
    
    try {
      // Try PromptRepo first
      const promptRepoResponse = await axios.post(
        `${PROMPTREPO_BASE_URL}/waymax-learningpathstrainingdata`,
        [{
          career_goal: goal,
          current_skills: experience,
          time_commitment: timeCommitment,
          preferred_learning_style: "practical",
          target_completion: "6 months"
        }],
        {
          headers: {
            'Content-Type': 'application/json',
            'x-api-key': PROMPTREPO_API_KEY
          }
        }
      );

      res.json({ 
        response: promptRepoResponse.data,
        sessionId: sessionId,
        source: 'promptrepo'
      });
      return;
    } catch (promptRepoError) {
      console.log('PromptRepo failed, falling back to Gemini:', promptRepoError);
      // Continue to Gemini if PromptRepo fails
    }

    // Fallback to original Gemini behavior
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

    const model = genAI.getGenerativeModel({ model: "gemini-pro" });
    const result = await model.generateContent(prompt);
    const response = await result.response;
    
    res.json({ 
      response: response.text(),
      sessionId: sessionId,
      source: 'gemini'
    });
  } catch (error) {
    console.error('Learning path error:', error);
    res.status(500).json({ error: 'Failed to generate learning path' });
  }
});

module.exports = router;