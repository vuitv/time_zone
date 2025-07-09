const express = require('express');
const router = express.Router();
const TimeZoneHandler = require('../TimeZoneHandler');

const timeZoneHandler = new TimeZoneHandler();

/**
 * GET /api/timezone/current/:timezone
 * Get current time in specified timezone
 */
router.get('/current/:timezone', (req, res) => {
  try {
    const { timezone } = req.params;
    const result = timeZoneHandler.getCurrentTime(timezone);
    res.json({
      success: true,
      data: result
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message
    });
  }
});

/**
 * POST /api/timezone/convert
 * Convert time between timezones
 * Body: { dateTime, fromTimezone, toTimezone }
 */
router.post('/convert', (req, res) => {
  try {
    const { dateTime, fromTimezone, toTimezone } = req.body;
    
    if (!dateTime || !fromTimezone || !toTimezone) {
      return res.status(400).json({
        success: false,
        error: 'Missing required fields: dateTime, fromTimezone, toTimezone'
      });
    }
    
    const result = timeZoneHandler.convertTime(dateTime, fromTimezone, toTimezone);
    res.json({
      success: true,
      data: result
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message
    });
  }
});

/**
 * GET /api/timezone/region/:region
 * Get all timezones for a region (US, AU, CA, or VN)
 */
router.get('/region/:region', (req, res) => {
  try {
    const { region } = req.params;
    const result = timeZoneHandler.getRegionTimezones(region);
    res.json({
      success: true,
      data: {
        region: region.toUpperCase(),
        timezones: result
      }
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message
    });
  }
});

/**
 * GET /api/timezone/state/:region/:state
 * Get timezone by state/territory
 */
router.get('/state/:region/:state', (req, res) => {
  try {
    const { region, state } = req.params;
    const stateName = decodeURIComponent(state);
    const result = timeZoneHandler.getTimezoneByState(stateName, region);
    res.json({
      success: true,
      data: result
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message
    });
  }
});

/**
 * GET /api/timezone/dst/:timezone/:year?
 * Get DST information for a timezone
 */
router.get('/dst/:timezone/:year?', (req, res) => {
  try {
    const { timezone, year } = req.params;
    const yearNum = year ? parseInt(year) : undefined;
    const result = timeZoneHandler.getDSTInfo(timezone, yearNum);
    res.json({
      success: true,
      data: result
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message
    });
  }
});

/**
 * GET /api/timezone/business-hours/:timezone
 * Get business hours information
 */
router.get('/business-hours/:timezone', (req, res) => {
  try {
    const { timezone } = req.params;
    const { startHour, endHour, workDays } = req.query;
    
    const options = {};
    if (startHour) options.startHour = parseInt(startHour);
    if (endHour) options.endHour = parseInt(endHour);
    if (workDays) options.workDays = workDays.split(',').map(day => parseInt(day));
    
    const result = timeZoneHandler.getBusinessHours(timezone, options);
    res.json({
      success: true,
      data: result
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message
    });
  }
});

/**
 * GET /api/timezone/next-business-hour/:timezone
 * Calculate time until next business hour
 */
router.get('/next-business-hour/:timezone', (req, res) => {
  try {
    const { timezone } = req.params;
    const { startHour, endHour, workDays } = req.query;
    
    const options = {};
    if (startHour) options.startHour = parseInt(startHour);
    if (endHour) options.endHour = parseInt(endHour);
    if (workDays) options.workDays = workDays.split(',').map(day => parseInt(day));
    
    const result = timeZoneHandler.timeUntilNextBusinessHour(timezone, options);
    res.json({
      success: true,
      data: result
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message
    });
  }
});

/**
 * GET /api/timezone/comparison
 * Compare multiple timezones
 */
router.get('/comparison', (req, res) => {
  try {
    const { timezones } = req.query;
    
    if (!timezones) {
      return res.status(400).json({
        success: false,
        error: 'Missing timezones parameter. Use comma-separated timezone list.'
      });
    }
    
    const timezoneList = timezones.split(',');
    const comparison = timezoneList.map(tz => {
      try {
        return timeZoneHandler.getCurrentTime(tz.trim());
      } catch (error) {
        return {
          timezone: tz.trim(),
          error: error.message
        };
      }
    });
    
    res.json({
      success: true,
      data: {
        comparison,
        requestedTimezones: timezoneList
      }
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message
    });
  }
});

/**
 * POST /api/timezone/batch-convert
 * Convert multiple times to different timezones
 */
router.post('/batch-convert', (req, res) => {
  try {
    const { conversions } = req.body;
    
    if (!conversions || !Array.isArray(conversions)) {
      return res.status(400).json({
        success: false,
        error: 'Missing conversions array. Each item should have dateTime, fromTimezone, toTimezone'
      });
    }
    
    const results = conversions.map((conversion, index) => {
      try {
        const { dateTime, fromTimezone, toTimezone } = conversion;
        return {
          index,
          result: timeZoneHandler.convertTime(dateTime, fromTimezone, toTimezone)
        };
      } catch (error) {
        return {
          index,
          error: error.message,
          input: conversion
        };
      }
    });
    
    res.json({
      success: true,
      data: {
        results,
        totalConversions: conversions.length
      }
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message
    });
  }
});

module.exports = router;
