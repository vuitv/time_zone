const moment = require('moment-timezone');

/**
 * Comprehensive Time Zone Handler for US and AU regions
 * Handles all major time zones, DST transitions, and conversions
 */
class TimeZoneHandler {
  constructor() {
    // US Time Zones
    this.US_TIMEZONES = {
      'EST': 'America/New_York',      // Eastern Standard Time
      'CST': 'America/Chicago',       // Central Standard Time
      'MST': 'America/Denver',        // Mountain Standard Time
      'PST': 'America/Los_Angeles',   // Pacific Standard Time
      'AKST': 'America/Anchorage',    // Alaska Standard Time
      'HST': 'Pacific/Honolulu',      // Hawaii Standard Time
      'EDT': 'America/New_York',      // Eastern Daylight Time
      'CDT': 'America/Chicago',       // Central Daylight Time
      'MDT': 'America/Denver',        // Mountain Daylight Time
      'PDT': 'America/Los_Angeles',   // Pacific Daylight Time
      'AKDT': 'America/Anchorage'    // Alaska Daylight Time
    };

    // AU Time Zones
    this.AU_TIMEZONES = {
      'AEST': 'Australia/Sydney',     // Australian Eastern Standard Time
      'AEDT': 'Australia/Sydney',     // Australian Eastern Daylight Time
      'ACST': 'Australia/Adelaide',   // Australian Central Standard Time
      'ACDT': 'Australia/Adelaide',   // Australian Central Daylight Time
      'AWST': 'Australia/Perth',      // Australian Western Standard Time
      'AWDT': 'Australia/Perth',      // Australian Western Daylight Time
      'AEST_QLD': 'Australia/Brisbane', // Queensland (no DST)
      'ACST_NT': 'Australia/Darwin',  // Northern Territory (no DST)
      'LHST': 'Australia/Lord_Howe',  // Lord Howe Standard Time
      'LHDT': 'Australia/Lord_Howe'   // Lord Howe Daylight Time
    };

    // Combined timezone mapping
    this.TIMEZONE_MAP = {
      ...this.US_TIMEZONES,
      ...this.AU_TIMEZONES
    };

    // US States to timezone mapping
    this.US_STATES_TIMEZONE = {
      'Alabama': 'America/Chicago',
      'Alaska': 'America/Anchorage',
      'Arizona': 'America/Phoenix',
      'Arkansas': 'America/Chicago',
      'California': 'America/Los_Angeles',
      'Colorado': 'America/Denver',
      'Connecticut': 'America/New_York',
      'Delaware': 'America/New_York',
      'Florida': 'America/New_York',
      'Georgia': 'America/New_York',
      'Hawaii': 'Pacific/Honolulu',
      'Idaho': 'America/Denver',
      'Illinois': 'America/Chicago',
      'Indiana': 'America/New_York',
      'Iowa': 'America/Chicago',
      'Kansas': 'America/Chicago',
      'Kentucky': 'America/New_York',
      'Louisiana': 'America/Chicago',
      'Maine': 'America/New_York',
      'Maryland': 'America/New_York',
      'Massachusetts': 'America/New_York',
      'Michigan': 'America/New_York',
      'Minnesota': 'America/Chicago',
      'Mississippi': 'America/Chicago',
      'Missouri': 'America/Chicago',
      'Montana': 'America/Denver',
      'Nebraska': 'America/Chicago',
      'Nevada': 'America/Los_Angeles',
      'New Hampshire': 'America/New_York',
      'New Jersey': 'America/New_York',
      'New Mexico': 'America/Denver',
      'New York': 'America/New_York',
      'North Carolina': 'America/New_York',
      'North Dakota': 'America/Chicago',
      'Ohio': 'America/New_York',
      'Oklahoma': 'America/Chicago',
      'Oregon': 'America/Los_Angeles',
      'Pennsylvania': 'America/New_York',
      'Rhode Island': 'America/New_York',
      'South Carolina': 'America/New_York',
      'South Dakota': 'America/Chicago',
      'Tennessee': 'America/Chicago',
      'Texas': 'America/Chicago',
      'Utah': 'America/Denver',
      'Vermont': 'America/New_York',
      'Virginia': 'America/New_York',
      'Washington': 'America/Los_Angeles',
      'West Virginia': 'America/New_York',
      'Wisconsin': 'America/Chicago',
      'Wyoming': 'America/Denver'
    };

    // AU States/Territories to timezone mapping
    this.AU_STATES_TIMEZONE = {
      'New South Wales': 'Australia/Sydney',
      'Victoria': 'Australia/Melbourne',
      'Queensland': 'Australia/Brisbane',
      'Western Australia': 'Australia/Perth',
      'South Australia': 'Australia/Adelaide',
      'Tasmania': 'Australia/Hobart',
      'Northern Territory': 'Australia/Darwin',
      'Australian Capital Territory': 'Australia/Sydney'
    };
  }

  /**
   * Get current time in specified timezone
   * @param {string} timezone - Timezone identifier
   * @returns {Object} Current time information
   */
  getCurrentTime(timezone) {
    try {
      const tz = this.resolveTimezone(timezone);
      const now = moment.tz(tz);
      
      return {
        timezone: tz,
        localTime: now.format(),
        utcTime: now.utc().format(),
        timestamp: now.valueOf(),
        isDST: now.isDST(),
        offset: now.format('Z'),
        abbreviation: now.format('z')
      };
    } catch (error) {
      throw new Error(`Invalid timezone: ${timezone}`);
    }
  }

  /**
   * Convert time between timezones
   * @param {string} dateTime - Date time string or timestamp
   * @param {string} fromTimezone - Source timezone
   * @param {string} toTimezone - Target timezone
   * @returns {Object} Converted time information
   */
  convertTime(dateTime, fromTimezone, toTimezone) {
    try {
      const fromTz = this.resolveTimezone(fromTimezone);
      const toTz = this.resolveTimezone(toTimezone);
      
      // Parse input datetime
      let sourceMoment;
      if (typeof dateTime === 'number') {
        sourceMoment = moment.tz(dateTime, fromTz);
      } else {
        sourceMoment = moment.tz(dateTime, fromTz);
      }
      
      const targetMoment = sourceMoment.clone().tz(toTz);
      
      return {
        source: {
          timezone: fromTz,
          time: sourceMoment.format(),
          offset: sourceMoment.format('Z'),
          isDST: sourceMoment.isDST()
        },
        target: {
          timezone: toTz,
          time: targetMoment.format(),
          offset: targetMoment.format('Z'),
          isDST: targetMoment.isDST()
        },
        timeDifference: targetMoment.valueOf() - sourceMoment.valueOf()
      };
    } catch (error) {
      throw new Error(`Conversion failed: ${error.message}`);
    }
  }

  /**
   * Get all timezones for a specific region
   * @param {string} region - Region code (US or AU)
   * @returns {Array} Array of timezone information
   */
  getRegionTimezones(region) {
    const regionUpper = region.toUpperCase();
    let timezones = [];
    
    if (regionUpper === 'US') {
      timezones = Object.keys(this.US_TIMEZONES).map(abbr => ({
        abbreviation: abbr,
        timezone: this.US_TIMEZONES[abbr],
        currentTime: this.getCurrentTime(this.US_TIMEZONES[abbr])
      }));
    } else if (regionUpper === 'AU') {
      timezones = Object.keys(this.AU_TIMEZONES).map(abbr => ({
        abbreviation: abbr,
        timezone: this.AU_TIMEZONES[abbr],
        currentTime: this.getCurrentTime(this.AU_TIMEZONES[abbr])
      }));
    } else {
      throw new Error('Unsupported region. Use US or AU.');
    }
    
    return timezones;
  }

  /**
   * Get timezone by state/territory
   * @param {string} state - State or territory name
   * @param {string} region - Region code (US or AU)
   * @returns {Object} Timezone information
   */
  getTimezoneByState(state, region) {
    const regionUpper = region.toUpperCase();
    let timezone;
    
    if (regionUpper === 'US') {
      timezone = this.US_STATES_TIMEZONE[state];
    } else if (regionUpper === 'AU') {
      timezone = this.AU_STATES_TIMEZONE[state];
    } else {
      throw new Error('Unsupported region. Use US or AU.');
    }
    
    if (!timezone) {
      throw new Error(`State/Territory not found: ${state}`);
    }
    
    return {
      state,
      region,
      timezone,
      currentTime: this.getCurrentTime(timezone)
    };
  }

  /**
   * Get DST information for a timezone
   * @param {string} timezone - Timezone identifier
   * @param {number} year - Year to check (default: current year)
   * @returns {Object} DST information
   */
  getDSTInfo(timezone, year = moment().year()) {
    try {
      const tz = this.resolveTimezone(timezone);
      const startOfYear = moment.tz(`${year}-01-01`, tz);
      const endOfYear = moment.tz(`${year}-12-31`, tz);
      
      let dstStart = null;
      let dstEnd = null;
      
      // Find DST transitions
      for (let month = 1; month <= 12; month++) {
        const date = moment.tz(`${year}-${month.toString().padStart(2, '0')}-01`, tz);
        const nextMonth = date.clone().add(1, 'month');
        
        if (date.isDST() !== nextMonth.isDST()) {
          if (nextMonth.isDST()) {
            dstStart = this.findDSTTransition(year, month, tz, true);
          } else {
            dstEnd = this.findDSTTransition(year, month, tz, false);
          }
        }
      }
      
      return {
        timezone: tz,
        year,
        hasDST: dstStart !== null || dstEnd !== null,
        dstStart: dstStart ? dstStart.format() : null,
        dstEnd: dstEnd ? dstEnd.format() : null,
        currentlyDST: moment.tz(tz).isDST()
      };
    } catch (error) {
      throw new Error(`DST info failed: ${error.message}`);
    }
  }

  /**
   * Find exact DST transition time
   * @private
   */
  findDSTTransition(year, month, timezone, isStart) {
    for (let day = 1; day <= 31; day++) {
      const date = moment.tz(`${year}-${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`, timezone);
      if (!date.isValid()) continue;
      
      const nextDay = date.clone().add(1, 'day');
      if (date.isDST() !== nextDay.isDST()) {
        return isStart ? nextDay : date;
      }
    }
    return null;
  }

  /**
   * Resolve timezone identifier
   * @private
   */
  resolveTimezone(timezone) {
    // If it's already a valid timezone identifier
    if (moment.tz.zone(timezone)) {
      return timezone;
    }
    
    // Try to resolve from abbreviation
    const resolved = this.TIMEZONE_MAP[timezone.toUpperCase()];
    if (resolved) {
      return resolved;
    }
    
    throw new Error(`Unknown timezone: ${timezone}`);
  }

  /**
   * Get business hours for a timezone
   * @param {string} timezone - Timezone identifier
   * @param {Object} options - Business hours configuration
   * @returns {Object} Business hours information
   */
  getBusinessHours(timezone, options = {}) {
    const {
      startHour = 9,
      endHour = 17,
      workDays = [1, 2, 3, 4, 5] // Monday to Friday
    } = options;
    
    const tz = this.resolveTimezone(timezone);
    const now = moment.tz(tz);
    
    const isWorkDay = workDays.includes(now.day());
    const currentHour = now.hour();
    const isBusinessHours = isWorkDay && currentHour >= startHour && currentHour < endHour;
    
    return {
      timezone: tz,
      currentTime: now.format(),
      isBusinessHours,
      isWorkDay,
      businessHours: {
        start: `${startHour}:00`,
        end: `${endHour}:00`
      },
      workDays: workDays.map(day => moment().day(day).format('dddd'))
    };
  }

  /**
   * Calculate time until next business hour
   * @param {string} timezone - Timezone identifier
   * @param {Object} options - Business hours configuration
   * @returns {Object} Time until next business hour
   */
  timeUntilNextBusinessHour(timezone, options = {}) {
    const {
      startHour = 9,
      endHour = 17,
      workDays = [1, 2, 3, 4, 5]
    } = options;
    
    const tz = this.resolveTimezone(timezone);
    const now = moment.tz(tz);
    
    // Find next business hour
    let nextBusinessHour = now.clone();
    
    while (true) {
      const dayOfWeek = nextBusinessHour.day();
      const hour = nextBusinessHour.hour();
      
      if (workDays.includes(dayOfWeek) && hour >= startHour && hour < endHour) {
        break;
      }
      
      // If outside business hours on a work day, move to start of business hours
      if (workDays.includes(dayOfWeek) && hour < startHour) {
        nextBusinessHour.hour(startHour).minute(0).second(0).millisecond(0);
        break;
      }
      
      // Move to next day
      nextBusinessHour.add(1, 'day').hour(startHour).minute(0).second(0).millisecond(0);
    }
    
    const duration = moment.duration(nextBusinessHour.diff(now));
    
    return {
      timezone: tz,
      currentTime: now.format(),
      nextBusinessHour: nextBusinessHour.format(),
      timeUntil: {
        days: duration.days(),
        hours: duration.hours(),
        minutes: duration.minutes(),
        totalMinutes: duration.asMinutes()
      }
    };
  }
}

module.exports = TimeZoneHandler;
