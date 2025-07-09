const TimeZoneHandler = require('../src/TimeZoneHandler');

describe('TimeZoneHandler', () => {
  let timeZoneHandler;

  beforeEach(() => {
    timeZoneHandler = new TimeZoneHandler();
  });

  describe('getCurrentTime', () => {
    test('should get current time for US timezone', () => {
      const result = timeZoneHandler.getCurrentTime('America/New_York');
      
      expect(result).toHaveProperty('timezone', 'America/New_York');
      expect(result).toHaveProperty('localTime');
      expect(result).toHaveProperty('utcTime');
      expect(result).toHaveProperty('timestamp');
      expect(result).toHaveProperty('isDST');
      expect(result).toHaveProperty('offset');
    });

    test('should get current time for AU timezone', () => {
      const result = timeZoneHandler.getCurrentTime('Australia/Sydney');
      
      expect(result).toHaveProperty('timezone', 'Australia/Sydney');
      expect(result).toHaveProperty('localTime');
      expect(result).toHaveProperty('utcTime');
    });

    test('should resolve timezone abbreviation', () => {
      const result = timeZoneHandler.getCurrentTime('PST');
      
      expect(result.timezone).toBe('America/Los_Angeles');
    });

    test('should resolve CA timezone abbreviation', () => {
      const result = timeZoneHandler.getCurrentTime('EST_CA');
      
      expect(result.timezone).toBe('America/Toronto');
    });

    test('should throw error for invalid timezone', () => {
      expect(() => {
        timeZoneHandler.getCurrentTime('Invalid/Timezone');
      }).toThrow('Invalid timezone');
    });

    test('should get current time for VN timezone', () => {
      const result = timeZoneHandler.getCurrentTime('Asia/Ho_Chi_Minh');
      
      expect(result).toHaveProperty('timezone', 'Asia/Ho_Chi_Minh');
      expect(result).toHaveProperty('localTime');
      expect(result).toHaveProperty('utcTime');
    });

    test('should resolve VN timezone abbreviation', () => {
      const result = timeZoneHandler.getCurrentTime('ICT');
      
      expect(result.timezone).toBe('Asia/Ho_Chi_Minh');
    });
  });

  describe('convertTime', () => {
    test('should convert time between US timezones', () => {
      const result = timeZoneHandler.convertTime(
        '2024-01-15 10:00:00',
        'America/New_York',
        'America/Los_Angeles'
      );
      
      expect(result).toHaveProperty('source');
      expect(result).toHaveProperty('target');
      expect(result.source.timezone).toBe('America/New_York');
      expect(result.target.timezone).toBe('America/Los_Angeles');
    });

    test('should convert time between AU timezones', () => {
      const result = timeZoneHandler.convertTime(
        '2024-01-15 10:00:00',
        'Australia/Sydney',
        'Australia/Perth'
      );
      
      expect(result.source.timezone).toBe('Australia/Sydney');
      expect(result.target.timezone).toBe('Australia/Perth');
    });

    test('should convert timestamp', () => {
      const timestamp = Date.now();
      const result = timeZoneHandler.convertTime(
        timestamp,
        'America/New_York',
        'Australia/Sydney'
      );
      
      expect(result).toHaveProperty('timeDifference');
    });

    test('should convert time between VN and US timezones', () => {
      const result = timeZoneHandler.convertTime(
        '2024-07-15 15:00:00',
        'Asia/Ho_Chi_Minh',
        'America/New_York'
      );
      
      expect(result.source.timezone).toBe('Asia/Ho_Chi_Minh');
      expect(result.target.timezone).toBe('America/New_York');
    });
  });

  describe('getRegionTimezones', () => {
    test('should get US timezones', () => {
      const result = timeZoneHandler.getRegionTimezones('US');
      
      expect(Array.isArray(result)).toBe(true);
      expect(result.length).toBeGreaterThan(0);
      expect(result[0]).toHaveProperty('abbreviation');
      expect(result[0]).toHaveProperty('timezone');
      expect(result[0]).toHaveProperty('currentTime');
    });

    test('should get AU timezones', () => {
      const result = timeZoneHandler.getRegionTimezones('AU');
      
      expect(Array.isArray(result)).toBe(true);
      expect(result.length).toBeGreaterThan(0);
    });

    test('should get CA timezones', () => {
      const result = timeZoneHandler.getRegionTimezones('CA');
      
      expect(Array.isArray(result)).toBe(true);
      expect(result.length).toBeGreaterThan(0);
      expect(result[0]).toHaveProperty('abbreviation');
      expect(result[0]).toHaveProperty('timezone');
    });

    test('should get VN region timezones', () => {
      const result = timeZoneHandler.getRegionTimezones('VN');
      
      expect(Array.isArray(result)).toBe(true);
      expect(result.length).toBeGreaterThan(0);
      expect(result[0]).toHaveProperty('abbreviation');
      expect(result[0]).toHaveProperty('timezone');
    });

    test('should throw error for invalid region', () => {
      expect(() => {
        timeZoneHandler.getRegionTimezones('INVALID');
      }).toThrow('Unsupported region');
    });
  });

  describe('getTimezoneByState', () => {
    test('should get timezone for US state', () => {
      const result = timeZoneHandler.getTimezoneByState('California', 'US');
      
      expect(result.state).toBe('California');
      expect(result.region).toBe('US');
      expect(result.timezone).toBe('America/Los_Angeles');
      expect(result).toHaveProperty('currentTime');
    });

    test('should get timezone for AU state', () => {
      const result = timeZoneHandler.getTimezoneByState('New South Wales', 'AU');
      
      expect(result.state).toBe('New South Wales');
      expect(result.region).toBe('AU');
      expect(result.timezone).toBe('Australia/Sydney');
    });

    test('should get timezone for CA province', () => {
      const result = timeZoneHandler.getTimezoneByState('Ontario', 'CA');
      
      expect(result.state).toBe('Ontario');
      expect(result.region).toBe('CA');
      expect(result.timezone).toBe('America/Toronto');
      expect(result).toHaveProperty('currentTime');
    });

    test('should get timezone for VN city', () => {
      const result = timeZoneHandler.getTimezoneByState('Ho Chi Minh City', 'VN');
      
      expect(result.state).toBe('Ho Chi Minh City');
      expect(result.region).toBe('VN');
      expect(result.timezone).toBe('Asia/Ho_Chi_Minh');
      expect(result).toHaveProperty('currentTime');
    });

    test('should get timezone for VN capital', () => {
      const result = timeZoneHandler.getTimezoneByState('Hanoi', 'VN');
      
      expect(result.state).toBe('Hanoi');
      expect(result.region).toBe('VN');
      expect(result.timezone).toBe('Asia/Ho_Chi_Minh');
      expect(result).toHaveProperty('currentTime');
    });

    test('should throw error for invalid state', () => {
      expect(() => {
        timeZoneHandler.getTimezoneByState('Invalid State', 'US');
      }).toThrow('State/Territory/Province/City not found');
    });
  });

  describe('getDSTInfo', () => {
    test('should get DST info for timezone with DST', () => {
      const result = timeZoneHandler.getDSTInfo('America/New_York', 2024);
      
      expect(result).toHaveProperty('timezone', 'America/New_York');
      expect(result).toHaveProperty('year', 2024);
      expect(result).toHaveProperty('hasDST');
      expect(result).toHaveProperty('currentlyDST');
    });

    test('should get DST info for timezone without DST', () => {
      const result = timeZoneHandler.getDSTInfo('Australia/Brisbane', 2024);
      
      expect(result.timezone).toBe('Australia/Brisbane');
      expect(result.hasDST).toBe(false);
    });
  });

  describe('getBusinessHours', () => {
    test('should get business hours info', () => {
      const result = timeZoneHandler.getBusinessHours('America/New_York');
      
      expect(result).toHaveProperty('timezone', 'America/New_York');
      expect(result).toHaveProperty('currentTime');
      expect(result).toHaveProperty('isBusinessHours');
      expect(result).toHaveProperty('isWorkDay');
      expect(result).toHaveProperty('businessHours');
    });

    test('should use custom business hours', () => {
      const result = timeZoneHandler.getBusinessHours('America/New_York', {
        startHour: 8,
        endHour: 18,
        workDays: [1, 2, 3, 4, 5, 6]
      });
      
      expect(result.businessHours.start).toBe('8:00');
      expect(result.businessHours.end).toBe('18:00');
    });
  });

  describe('timeUntilNextBusinessHour', () => {
    test('should calculate time until next business hour', () => {
      const result = timeZoneHandler.timeUntilNextBusinessHour('America/New_York');
      
      expect(result).toHaveProperty('timezone', 'America/New_York');
      expect(result).toHaveProperty('currentTime');
      expect(result).toHaveProperty('nextBusinessHour');
      expect(result).toHaveProperty('timeUntil');
      expect(result.timeUntil).toHaveProperty('days');
      expect(result.timeUntil).toHaveProperty('hours');
      expect(result.timeUntil).toHaveProperty('minutes');
    });
  });
});
