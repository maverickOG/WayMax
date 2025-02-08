// services/scraperService.js
const puppeteer = require('puppeteer');
const Course = require('../models/Course');

class ScraperService {
  constructor() {
    this.browser = null;
    this.rateLimitDelay = 2000; // 2 seconds between requests
  }

  async initialize() {
    try {
      this.browser = await puppeteer.launch({
        headless: 'new',
        args: ['--no-sandbox', '--disable-setuid-sandbox']
      });
      console.log('Browser initialized successfully');
    } catch (error) {
      console.error('Failed to initialize browser:', error);
      throw error;
    }
  }

  async close() {
    if (this.browser) {
      await this.browser.close();
    }
  }

  delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

 // services/scraperService.js
async scrapeCourseraCourse(url) {
  let page = null;
  try {
    console.log('Starting Coursera scraping for:', url);
    page = await this.browser.newPage();
    
    await page.setViewport({ width: 1366, height: 768 });
    await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36');

    await page.goto(url, { 
      waitUntil: 'networkidle0',
      timeout: 60000 
    });

    console.log('Page loaded, starting data extraction');

    // Extract course data
    const courseData = await page.evaluate(() => {
      const getDescription = () => {
        const descElement = document.querySelector('[data-test="course-description"]') || 
                          document.querySelector('.description') ||
                          document.querySelector('.about-section');
        return descElement ? descElement.textContent.trim() : 'No description available';
      };

      const getSkillLevel = () => {
        const levelElement = document.querySelector('.difficulty') ||
                           document.querySelector('[data-test="difficulty"]');
        const level = levelElement ? levelElement.textContent.trim() : 'Not Specified';
        // Map to valid enum values
        const levelMap = {
          'Beginner': 'Beginner',
          'Intermediate': 'Intermediate',
          'Advanced': 'Advanced',
          'All Levels': 'All Levels',
          'Not Specified': 'Not Specified'
        };
        return levelMap[level] || 'Not Specified';
      };

      return {
        title: document.querySelector('h1')?.textContent?.trim() || 'Untitled Course',
        description: getDescription(),
        rating: parseFloat(document.querySelector('[data-test="ratings-count-without-asterisk"]')?.textContent || '0'),
        reviewsCount: parseInt(document.querySelector('[data-test="number-of-ratings"]')?.textContent || '0'),
        skillLevel: getSkillLevel(),
        duration: document.querySelector('.duration')?.textContent?.trim() || 'Not specified'
      };
    });

    // Create course document
    const course = new Course({
      ...courseData,
      provider: 'Coursera',
      url,
      lastScraped: new Date()
    });

    await course.save();
    console.log('Successfully scraped and saved course:', courseData.title);

    await page.close();
    return course;

  } catch (error) {
    console.error('Error scraping Coursera course:', error);
    if (page) await page.close();
    throw error;
  }
}

async scrapeUdemyCourse(url) {
  let page = null;
  try {
    console.log('Starting Udemy scraping for:', url);
    page = await this.browser.newPage();
    
    await page.setViewport({ width: 1366, height: 768 });
    await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36');

    await page.goto(url, { 
      waitUntil: 'networkidle0',
      timeout: 60000 
    });

    console.log('Page loaded, starting data extraction');

    // Extract course data
    const courseData = await page.evaluate(() => {
      const getDescription = () => {
        const descElement = document.querySelector('[data-purpose="lead-headline"]') || 
                          document.querySelector('.course-description') ||
                          document.querySelector('[data-purpose="course-description"]');
        return descElement ? descElement.textContent.trim() : 'No description available';
      };

      const getSkillLevel = () => {
        const levelElement = document.querySelector('[data-purpose="skill-level"]') ||
                           document.querySelector('.course-meta-level');
        const level = levelElement ? levelElement.textContent.trim() : 'All Levels';
        // Map Udemy levels to our enum values
        const levelMap = {
          'Beginner Level': 'Beginner',
          'Intermediate Level': 'Intermediate',
          'Expert Level': 'Advanced',
          'All Levels': 'All Levels',
          'Not Specified': 'Not Specified'
        };
        return levelMap[level] || 'All Levels';
      };

      return {
        title: document.querySelector('.udlite-heading-xl')?.textContent?.trim() || 
               document.querySelector('h1')?.textContent?.trim() || 'Untitled Course',
        description: getDescription(),
        rating: parseFloat(document.querySelector('[data-purpose="rating-number"]')?.textContent || '0'),
        reviewsCount: parseInt(document.querySelector('[data-purpose="reviews-text"]')?.textContent?.match(/\d+/)?.[0] || '0'),
        instructor: document.querySelector('[data-purpose="instructor-name-top"]')?.textContent?.trim() || 'Unknown Instructor',
        skillLevel: getSkillLevel(),
        duration: document.querySelector('[data-purpose="course-duration"]')?.textContent?.trim() || 'Duration not specified'
      };
    });

    // Create course document
    const course = new Course({
      ...courseData,
      provider: 'Udemy',
      url,
      lastScraped: new Date()
    });

    await course.save();
    console.log('Successfully scraped and saved course:', courseData.title);

    await page.close();
    return course;

  } catch (error) {
    console.error('Error scraping Udemy course:', error);
    if (page) await page.close();
    throw error;
  }
}
}

module.exports = ScraperService;