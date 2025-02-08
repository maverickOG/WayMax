const express = require('express');
const router = express.Router();
const ScraperService = require('../services/scraperService');
const { authenticateUser, authorizeAdmin } = require('../middleware/auth');

// Initialize scraper service
const scraperService = new ScraperService();

// Initialize the scraper when the server starts
scraperService.initialize().catch(console.error);

// Route to trigger scraping for a specific course
router.post('/scrape-course', async (req, res) => {
  try {
    const { url } = req.body;
    
    if (!url) {
      return res.status(400).json({ error: 'URL is required' });
    }

    // Determine the course provider from the URL
    const provider = url.includes('coursera.org') ? 'Coursera' : 
                    url.includes('udemy.com') ? 'Udemy' : null;

    if (!provider) {
      return res.status(400).json({ error: 'Unsupported course provider' });
    }

    // Call appropriate scraping method
    const course = provider === 'Coursera' ? 
      await scraperService.scrapeCourseraCourse(url) :
      await scraperService.scrapeUdemyCourse(url);

    res.json({ success: true, course });

  } catch (error) {
    console.error('Scraping error:', error);
    res.status(500).json({ error: 'Failed to scrape course' });
  }
});

// Route to get all scraped courses
router.get('/courses', async (req, res) => {
  try {
    const courses = await Course.find()
      .sort({ createdAt: -1 })
      .limit(50);
    res.json(courses);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch courses' });
  }
});

module.exports = router;

