// routes/recommendations.js
const express = require('express');
const router = express.Router();
const axios = require('axios');

const PROMPTREPO_API_KEY = process.env.PROMPTREPO_API_KEY;
const PROMPTREPO_BASE_URL = 'https://api.promptrepo.com/api/private';

router.post('/course-recommendations', async (req, res) => {
  try {
    const { goal, experience_level, time_available, preferred_platform, learning_style } = req.body;

    const response = await axios.post(
      `${PROMPTREPO_BASE_URL}/waymax-courserecommendationstrainingdata`,
      [{
        goal,
        experience_level,
        time_available,
        preferred_platform,
        learning_style
      }],
      {
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': PROMPTREPO_API_KEY
        }
      }
    );

    res.json(response.data);
  } catch (error) {
    console.error('Course recommendations error:', error);
    res.status(500).json({ error: 'Failed to get course recommendations' });
  }
});

router.post('/learning-path', async (req, res) => {
  try {
    const { career_goal, current_skills, time_commitment, preferred_learning_style, target_completion } = req.body;

    const response = await axios.post(
      `${PROMPTREPO_BASE_URL}/waymax-learningpathstrainingdata`,
      [{
        career_goal,
        current_skills,
        time_commitment,
        preferred_learning_style,
        target_completion
      }],
      {
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': PROMPTREPO_API_KEY
        }
      }
    );

    res.json(response.data);
  } catch (error) {
    console.error('Learning path error:', error);
    res.status(500).json({ error: 'Failed to get learning path' });
  }
});

module.exports = router;