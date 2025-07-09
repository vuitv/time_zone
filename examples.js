const TimeZoneHandler = require('./src/TimeZoneHandler');

/**
 * Real-world examples demonstrating comprehensive timezone handling
 * for US and AU regions
 */

class TimeZoneExamples {
  constructor() {
    this.handler = new TimeZoneHandler();
  }

  /**
   * Example 1: Meeting Scheduler
   * Find optimal meeting time across multiple timezones
   */
  async findOptimalMeetingTime() {
    console.log('=== Meeting Scheduler Example ===');
    
    const participants = [
      { name: 'John', location: 'New York', timezone: 'America/New_York' },
      { name: 'Alice', location: 'Los Angeles', timezone: 'America/Los_Angeles' },
      { name: 'Bob', location: 'Sydney', timezone: 'Australia/Sydney' },
      { name: 'Emma', location: 'Perth', timezone: 'Australia/Perth' }
    ];

    // Proposed meeting time: 10 AM EST
    const proposedMeeting = '2025-07-15 10:00:00';
    const sourceTimezone = 'America/New_York';

    console.log(`\nProposed meeting: ${proposedMeeting} (${sourceTimezone})`);
    console.log('Local times for participants:');

    participants.forEach(participant => {
      const localTime = this.handler.convertTime(
        proposedMeeting,
        sourceTimezone,
        participant.timezone
      );
      
      const businessHours = this.handler.getBusinessHours(participant.timezone);
      
      console.log(`${participant.name} (${participant.location}): ${localTime.target.time} - ${businessHours.isBusinessHours ? '✅ Business hours' : '❌ Outside business hours'}`);
    });

    // Find when it's business hours for everyone
    console.log('\n--- Finding alternative times ---');
    const businessHourOptions = [];
    
    for (let hour = 8; hour <= 18; hour++) {
      const testTime = `2025-07-15 ${hour.toString().padStart(2, '0')}:00:00`;
      let allInBusinessHours = true;
      let timeDetails = [];
      
      for (const participant of participants) {
        const localTime = this.handler.convertTime(testTime, sourceTimezone, participant.timezone);
        const businessHours = this.handler.getBusinessHours(participant.timezone);
        
        // Check if the converted time is in business hours
        const localHour = new Date(localTime.target.time).getHours();
        const inBusinessHours = businessHours.isWorkDay && localHour >= 9 && localHour <= 17;
        
        if (!inBusinessHours) {
          allInBusinessHours = false;
        }
        
        timeDetails.push({
          name: participant.name,
          localTime: localTime.target.time,
          inBusinessHours
        });
      }
      
      if (allInBusinessHours) {
        businessHourOptions.push({
          proposedTime: testTime,
          details: timeDetails
        });
      }
    }

    if (businessHourOptions.length > 0) {
      console.log('✅ Found optimal meeting times:');
      businessHourOptions.slice(0, 3).forEach((option, index) => {
        console.log(`\nOption ${index + 1}: ${option.proposedTime} (EST)`);
        option.details.forEach(detail => {
          console.log(`  ${detail.name}: ${detail.localTime}`);
        });
      });
    } else {
      console.log('❌ No time found where all participants are in business hours');
    }
  }

  /**
   * Example 2: Multi-region Business Hours Dashboard
   */
  async businessHoursDashboard() {
    console.log('\n=== Business Hours Dashboard ===');
    
    const offices = [
      { name: 'New York HQ', timezone: 'America/New_York' },
      { name: 'Los Angeles', timezone: 'America/Los_Angeles' },
      { name: 'Chicago', timezone: 'America/Chicago' },
      { name: 'Sydney', timezone: 'Australia/Sydney' },
      { name: 'Melbourne', timezone: 'Australia/Melbourne' },
      { name: 'Perth', timezone: 'Australia/Perth' }
    ];

    console.log('\nCurrent status of all offices:');
    
    offices.forEach(office => {
      const currentTime = this.handler.getCurrentTime(office.timezone);
      const businessHours = this.handler.getBusinessHours(office.timezone);
      const nextBusinessHour = this.handler.timeUntilNextBusinessHour(office.timezone);
      
      const status = businessHours.isBusinessHours ? '🟢 OPEN' : '🔴 CLOSED';
      const timeUntilNext = businessHours.isBusinessHours 
        ? 'Currently open' 
        : `Opens in ${nextBusinessHour.timeUntil.hours}h ${nextBusinessHour.timeUntil.minutes}m`;
      
      console.log(`${office.name.padEnd(15)} | ${status} | ${currentTime.localTime} | ${timeUntilNext}`);
    });
  }

  /**
   * Example 3: DST Transition Analysis
   */
  async dstTransitionAnalysis() {
    console.log('\n=== DST Transition Analysis ===');
    
    const timezonesWithDST = [
      'America/New_York',
      'America/Los_Angeles',
      'America/Chicago',
      'Australia/Sydney',
      'Australia/Melbourne',
      'Australia/Adelaide'
    ];

    console.log('\nDST Status for 2024:');
    
    timezonesWithDST.forEach(timezone => {
      const dstInfo = this.handler.getDSTInfo(timezone, 2024);
      const currentTime = this.handler.getCurrentTime(timezone);
      
      console.log(`\n${timezone}:`);
      console.log(`  Currently DST: ${dstInfo.currentlyDST ? '✅ Yes' : '❌ No'}`);
      console.log(`  Current offset: ${currentTime.offset}`);
      
      if (dstInfo.hasDST) {
        console.log(`  DST Start: ${dstInfo.dstStart}`);
        console.log(`  DST End: ${dstInfo.dstEnd}`);
      } else {
        console.log(`  DST: Not observed`);
      }
    });
  }

  /**
   * Example 4: Time Zone Comparison Tool
   */
  async timeZoneComparison() {
    console.log('\n=== Time Zone Comparison Tool ===');
    
    const timezones = [
      'America/New_York',
      'America/Los_Angeles',
      'America/Chicago',
      'Australia/Sydney',
      'Australia/Perth',
      'Pacific/Honolulu'
    ];

    console.log('\nCurrent time comparison:');
    console.log('Timezone'.padEnd(25) + 'Local Time'.padEnd(25) + 'UTC Offset'.padEnd(12) + 'DST');
    console.log('─'.repeat(80));

    timezones.forEach(timezone => {
      const timeInfo = this.handler.getCurrentTime(timezone);
      const dstStatus = timeInfo.isDST ? '✅' : '❌';
      
      console.log(
        timezone.padEnd(25) + 
        timeInfo.localTime.padEnd(25) + 
        timeInfo.offset.padEnd(12) + 
        dstStatus
      );
    });
  }

  /**
   * Example 5: Travel Time Calculator
   */
  async travelTimeCalculator() {
    console.log('\n=== Travel Time Calculator ===');
    
    const flights = [
      {
        from: { city: 'New York', timezone: 'America/New_York' },
        to: { city: 'Los Angeles', timezone: 'America/Los_Angeles' },
        departure: '2025-07-15 14:00:00',
        duration: 6 // hours
      },
      {
        from: { city: 'Los Angeles', timezone: 'America/Los_Angeles' },
        to: { city: 'Sydney', timezone: 'Australia/Sydney' },
        departure: '2025-07-15 22:00:00',
        duration: 15 // hours
      },
      {
        from: { city: 'Sydney', timezone: 'Australia/Sydney' },
        to: { city: 'Perth', timezone: 'Australia/Perth' },
        departure: '2025-07-16 10:00:00',
        duration: 5 // hours
      }
    ];

    console.log('\nFlight schedule with local times:');
    
    flights.forEach((flight, index) => {
      console.log(`\n--- Flight ${index + 1} ---`);
      console.log(`Route: ${flight.from.city} → ${flight.to.city}`);
      
      // Departure time
      const departureLocal = this.handler.getCurrentTime(flight.from.timezone);
      console.log(`Departure: ${flight.departure} (${flight.from.city} time)`);
      
      // Calculate arrival time
      const departureUTC = this.handler.convertTime(
        flight.departure,
        flight.from.timezone,
        'UTC'
      );
      
      const arrivalUTC = new Date(new Date(departureUTC.target.time).getTime() + flight.duration * 60 * 60 * 1000);
      const arrivalLocal = this.handler.convertTime(
        arrivalUTC.toISOString(),
        'UTC',
        flight.to.timezone
      );
      
      console.log(`Arrival: ${arrivalLocal.target.time} (${flight.to.city} time)`);
      console.log(`Flight duration: ${flight.duration} hours`);
      
      // Time difference
      const timeDiff = this.handler.convertTime(
        flight.departure,
        flight.from.timezone,
        flight.to.timezone
      );
      console.log(`Time zone difference: ${flight.from.city} vs ${flight.to.city}`);
    });
  }

  /**
   * Example 6: Market Hours Tracker
   */
  async marketHoursTracker() {
    console.log('\n=== Market Hours Tracker ===');
    
    const markets = [
      { name: 'NYSE', timezone: 'America/New_York', open: 9, close: 16 },
      { name: 'NASDAQ', timezone: 'America/New_York', open: 9, close: 16 },
      { name: 'CME', timezone: 'America/Chicago', open: 8, close: 15 },
      { name: 'ASX', timezone: 'Australia/Sydney', open: 10, close: 16 },
      { name: 'TSX', timezone: 'America/Toronto', open: 9, close: 16 }
    ];

    console.log('\nMarket status:');
    
    markets.forEach(market => {
      const businessHours = this.handler.getBusinessHours(market.timezone, {
        startHour: market.open,
        endHour: market.close,
        workDays: [1, 2, 3, 4, 5] // Monday to Friday
      });
      
      const currentTime = this.handler.getCurrentTime(market.timezone);
      const status = businessHours.isBusinessHours ? '🟢 OPEN' : '🔴 CLOSED';
      
      console.log(`${market.name.padEnd(10)} | ${status} | ${currentTime.localTime} | ${market.open}:00-${market.close}:00`);
    });
  }

  /**
   * Run all examples
   */
  async runAllExamples() {
    await this.findOptimalMeetingTime();
    await this.businessHoursDashboard();
    await this.dstTransitionAnalysis();
    await this.timeZoneComparison();
    await this.travelTimeCalculator();
    await this.marketHoursTracker();
    
    console.log('\n=== All Examples Complete ===');
  }
}

// Run examples if this file is executed directly
if (require.main === module) {
  const examples = new TimeZoneExamples();
  examples.runAllExamples().catch(console.error);
}

module.exports = TimeZoneExamples;
