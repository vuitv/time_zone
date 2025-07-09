const moment = require('moment-timezone');

/**
 * Comprehensive Time Zone Handler for US, AU, CA, and VN regions
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

    // CA Time Zones (Canada)
    this.CA_TIMEZONES = {
      'NST': 'America/St_Johns',      // Newfoundland Standard Time
      'NDT': 'America/St_Johns',      // Newfoundland Daylight Time
      'AST': 'America/Halifax',       // Atlantic Standard Time
      'ADT': 'America/Halifax',       // Atlantic Daylight Time
      'EST_CA': 'America/Toronto',    // Eastern Standard Time (Canada)
      'EDT_CA': 'America/Toronto',    // Eastern Daylight Time (Canada)
      'CST_CA': 'America/Winnipeg',   // Central Standard Time (Canada)
      'CDT_CA': 'America/Winnipeg',   // Central Daylight Time (Canada)
      'MST_CA': 'America/Edmonton',   // Mountain Standard Time (Canada)
      'MDT_CA': 'America/Edmonton',   // Mountain Daylight Time (Canada)
      'PST_CA': 'America/Vancouver',  // Pacific Standard Time (Canada)
      'PDT_CA': 'America/Vancouver'   // Pacific Daylight Time (Canada)
    };

    // VN Time Zones (Vietnam)
    this.VN_TIMEZONES = {
      'ICT': 'Asia/Ho_Chi_Minh',      // Indochina Time (UTC+7)
      'VNT': 'Asia/Ho_Chi_Minh',      // Vietnam Time (UTC+7)
      'SGT': 'Asia/Ho_Chi_Minh'       // Saigon Time (historical, UTC+7)
    };

    // Combined timezone mapping
    this.TIMEZONE_MAP = {
      ...this.US_TIMEZONES,
      ...this.AU_TIMEZONES,
      ...this.CA_TIMEZONES,
      ...this.VN_TIMEZONES
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

    // CA Provinces/Territories to timezone mapping
    this.CA_PROVINCES_TIMEZONE = {
      'Newfoundland and Labrador': 'America/St_Johns',
      'Nova Scotia': 'America/Halifax',
      'New Brunswick': 'America/Halifax',
      'Prince Edward Island': 'America/Halifax',
      'Quebec': 'America/Toronto',
      'Ontario': 'America/Toronto',
      'Manitoba': 'America/Winnipeg',
      'Saskatchewan': 'America/Regina',
      'Alberta': 'America/Edmonton',
      'British Columbia': 'America/Vancouver',
      'Yukon': 'America/Whitehorse',
      'Northwest Territories': 'America/Yellowknife',
      'Nunavut': 'America/Iqaluit'
    };

    // VN Provinces/Cities to timezone mapping
    this.VN_PROVINCES_TIMEZONE = {
      // Major cities
      'Ho Chi Minh City': 'Asia/Ho_Chi_Minh',
      'Hanoi': 'Asia/Ho_Chi_Minh',
      'Da Nang': 'Asia/Ho_Chi_Minh',
      'Hai Phong': 'Asia/Ho_Chi_Minh',
      'Can Tho': 'Asia/Ho_Chi_Minh',
      'Bien Hoa': 'Asia/Ho_Chi_Minh',
      'Hue': 'Asia/Ho_Chi_Minh',
      'Nha Trang': 'Asia/Ho_Chi_Minh',
      'Buon Ma Thuot': 'Asia/Ho_Chi_Minh',
      'Quy Nhon': 'Asia/Ho_Chi_Minh',
      'Vung Tau': 'Asia/Ho_Chi_Minh',
      'Nam Dinh': 'Asia/Ho_Chi_Minh',
      'Phan Thiet': 'Asia/Ho_Chi_Minh',
      'Long Xuyen': 'Asia/Ho_Chi_Minh',
      'Ha Long': 'Asia/Ho_Chi_Minh',
      'Thai Nguyen': 'Asia/Ho_Chi_Minh',
      'Thanh Hoa': 'Asia/Ho_Chi_Minh',
      'Rach Gia': 'Asia/Ho_Chi_Minh',
      'Cam Ranh': 'Asia/Ho_Chi_Minh',
      'Vinh': 'Asia/Ho_Chi_Minh',
      'My Tho': 'Asia/Ho_Chi_Minh',
      'Da Lat': 'Asia/Ho_Chi_Minh',
      'Bac Lieu': 'Asia/Ho_Chi_Minh',
      
      // Additional provinces/cities
      'Hai Duong': 'Asia/Ho_Chi_Minh',
      'Hung Yen': 'Asia/Ho_Chi_Minh',
      'Vinh Phuc': 'Asia/Ho_Chi_Minh',
      'Bac Ninh': 'Asia/Ho_Chi_Minh',
      'Quang Ninh': 'Asia/Ho_Chi_Minh',
      'Lang Son': 'Asia/Ho_Chi_Minh',
      'Cao Bang': 'Asia/Ho_Chi_Minh',
      'Ha Giang': 'Asia/Ho_Chi_Minh',
      'Lao Cai': 'Asia/Ho_Chi_Minh',
      'Yen Bai': 'Asia/Ho_Chi_Minh',
      'Tuyen Quang': 'Asia/Ho_Chi_Minh',
      'Phu Tho': 'Asia/Ho_Chi_Minh',
      'Bac Giang': 'Asia/Ho_Chi_Minh',
      'Bac Kan': 'Asia/Ho_Chi_Minh',
      'Dien Bien': 'Asia/Ho_Chi_Minh',
      'Lai Chau': 'Asia/Ho_Chi_Minh',
      'Son La': 'Asia/Ho_Chi_Minh',
      'Hoa Binh': 'Asia/Ho_Chi_Minh',
      'Ha Nam': 'Asia/Ho_Chi_Minh',
      'Thai Binh': 'Asia/Ho_Chi_Minh',
      'Ninh Binh': 'Asia/Ho_Chi_Minh',
      'Nghe An': 'Asia/Ho_Chi_Minh',
      'Ha Tinh': 'Asia/Ho_Chi_Minh',
      'Quang Binh': 'Asia/Ho_Chi_Minh',
      'Quang Tri': 'Asia/Ho_Chi_Minh',
      'Thua Thien Hue': 'Asia/Ho_Chi_Minh',
      'Quang Nam': 'Asia/Ho_Chi_Minh',
      'Quang Ngai': 'Asia/Ho_Chi_Minh',
      'Binh Dinh': 'Asia/Ho_Chi_Minh',
      'Phu Yen': 'Asia/Ho_Chi_Minh',
      'Khanh Hoa': 'Asia/Ho_Chi_Minh',
      'Ninh Thuan': 'Asia/Ho_Chi_Minh',
      'Binh Thuan': 'Asia/Ho_Chi_Minh',
      'Kon Tum': 'Asia/Ho_Chi_Minh',
      'Gia Lai': 'Asia/Ho_Chi_Minh',
      'Dak Lak': 'Asia/Ho_Chi_Minh',
      'Dak Nong': 'Asia/Ho_Chi_Minh',
      'Lam Dong': 'Asia/Ho_Chi_Minh',
      'Binh Phuoc': 'Asia/Ho_Chi_Minh',
      'Tay Ninh': 'Asia/Ho_Chi_Minh',
      'Binh Duong': 'Asia/Ho_Chi_Minh',
      'Dong Nai': 'Asia/Ho_Chi_Minh',
      'Ba Ria Vung Tau': 'Asia/Ho_Chi_Minh',
      'Long An': 'Asia/Ho_Chi_Minh',
      'Tien Giang': 'Asia/Ho_Chi_Minh',
      'Ben Tre': 'Asia/Ho_Chi_Minh',
      'Tra Vinh': 'Asia/Ho_Chi_Minh',
      'Vinh Long': 'Asia/Ho_Chi_Minh',
      'Dong Thap': 'Asia/Ho_Chi_Minh',
      'An Giang': 'Asia/Ho_Chi_Minh',
      'Kien Giang': 'Asia/Ho_Chi_Minh',
      'Ca Mau': 'Asia/Ho_Chi_Minh',
      'Hau Giang': 'Asia/Ho_Chi_Minh',
      'Soc Trang': 'Asia/Ho_Chi_Minh'
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
        utcTime: now.clone().utc().format(),
        timestamp: now.valueOf(),
        isDST: now.isDST(),
        offset: now.utcOffset(), // Returns offset in minutes as integer
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
          offset: sourceMoment.utcOffset(), // Returns offset in minutes as integer
          isDST: sourceMoment.isDST()
        },
        target: {
          timezone: toTz,
          time: targetMoment.format(),
          offset: targetMoment.utcOffset(), // Returns offset in minutes as integer
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
   * @param {string} region - Region code (US, AU, CA, or VN)
   * @returns {Array} Array of timezone information
   */
  getRegionTimezones(region) {
    const regionUpper = region.toUpperCase();
    
    // Map region to timezone collection
    const regionTimezoneMap = {
      'US': this.US_TIMEZONES,
      'AU': this.AU_TIMEZONES,
      'CA': this.CA_TIMEZONES,
      'VN': this.VN_TIMEZONES
    };
    
    const timezoneCollection = regionTimezoneMap[regionUpper];
    if (!timezoneCollection) {
      throw new Error('Unsupported region. Use US, AU, CA, or VN.');
    }
    
    return Object.keys(timezoneCollection).map(abbr => ({
      abbreviation: abbr,
      timezone: timezoneCollection[abbr],
      currentTime: this.getCurrentTime(timezoneCollection[abbr])
    }));
  }

  /**
   * Get timezone by state/territory/province/city
   * @param {string} state - State, territory, province, or city name
   * @param {string} region - Region code (US, AU, CA, or VN)
   * @returns {Object} Timezone information
   */
  getTimezoneByState(state, region) {
    const regionUpper = region.toUpperCase();
    
    // Map region to state/province/city collection
    const regionStateMap = {
      'US': this.US_STATES_TIMEZONE,
      'AU': this.AU_STATES_TIMEZONE,
      'CA': this.CA_PROVINCES_TIMEZONE,
      'VN': this.VN_PROVINCES_TIMEZONE
    };
    
    const stateCollection = regionStateMap[regionUpper];
    if (!stateCollection) {
      throw new Error('Unsupported region. Use US, AU, CA, or VN.');
    }
    
    const timezone = stateCollection[state];
    if (!timezone) {
      throw new Error(`State/Territory/Province/City not found: ${state}`);
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

  /**
   * Format offset from minutes to human-readable string
   * @param {number} offsetMinutes - Offset in minutes
   * @returns {string} Formatted offset string (e.g., "+10:00", "-05:00")
   */
  formatOffset(offsetMinutes) {
    const sign = offsetMinutes >= 0 ? '+' : '-';
    const absMinutes = Math.abs(offsetMinutes);
    const hours = Math.floor(absMinutes / 60);
    const minutes = absMinutes % 60;
    
    return `${sign}${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
  }
}

module.exports = TimeZoneHandler;
