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

  async scrapeCourseraCourse(url) {
    let page = null;
    try {
      console.log('Starting Coursera scraping for:', url);
      page = await this.browser.newPage();
      
      // Set viewport and user agent
      await page.setViewport({ width: 1366, height: 768 });
      await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36');

      // Navigate to URL
      await page.goto(url, { 
        waitUntil: 'networkidle0',
        timeout: 60000 
      });

      console.log('Page loaded, starting data extraction');

      // Extract course data
      const courseData = await page.evaluate(() => {
        return {
          title: document.querySelector('h1')?.textContent?.trim() || '',
          description: document.querySelector('[data-test="course-description"]')?.textContent?.trim() || 
                      document.querySelector('.description')?.textContent?.trim() || '',
          rating: parseFloat(document.querySelector('[data-test="ratings-count-without-asterisk"]')?.textContent || 
                           document.querySelector('.ratings-text')?.textContent || '0'),
          reviewsCount: parseInt(document.querySelector('[data-test="number-of-ratings"]')?.textContent || 
                               document.querySelector('.ratings-count')?.textContent || '0'),
          instructor: document.querySelector('.instructor-name')?.textContent?.trim() || '',
          skillLevel: document.querySelector('.difficulty')?.textContent?.trim() || 'Not specified',
          duration: document.querySelector('.duration')?.textContent?.trim() || 'Not specified'
        };
      });

      // Clean and validate the data
      const course = new Course({
        ...courseData,
        provider: 'Coursera',
        url,
        lastScraped: new Date()
      });

      // Save to database
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
        return {
          title: document.querySelector('.udlite-heading-xl')?.textContent?.trim() || 
                 document.querySelector('h1')?.textContent?.trim() || '',
          description: document.querySelector('[data-purpose="lead-headline"]')?.textContent?.trim() ||
                      document.querySelector('.course-description')?.textContent?.trim() || '',
          rating: parseFloat(document.querySelector('[data-purpose="rating-number"]')?.textContent || '0'),
          reviewsCount: parseInt(document.querySelector('[data-purpose="reviews-text"]')?.textContent?.match(/\d+/)?.[0] || '0'),
          instructor: document.querySelector('[data-purpose="instructor-name-top"]')?.textContent?.trim() || '',
          skillLevel: document.querySelector('[data-purpose="skill-level"]')?.textContent?.trim() || 'Not specified',
          duration: document.querySelector('[data-purpose="course-duration"]')?.textContent?.trim() || 'Not specified'
        };
      });

      // Clean and validate the data
      const course = new Course({
        ...courseData,
        provider: 'Udemy',
        url,
        lastScraped: new Date()
      });

      // Save to database
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

  // Helper method to clean text
  cleanText(text) {
    return text ? text.trim().replace(/\s+/g, ' ') : '';
  }

  // Helper method to extract number from string
  extractNumber(text) {
    const match = text?.match(/\d+(\.\d+)?/);
    return match ? parseFloat(match[0]) : 0;
  }
}

module.exports = ScraperService;