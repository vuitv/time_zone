const TimeZoneHandler = require('./src/TimeZoneHandler');

// Initialize the TimeZoneHandler
const timeZoneHandler = new TimeZoneHandler();

console.log('=== Time Zone Handler Demo ===\n');

// 1. Get current time in different US timezones
console.log('1. Current time in US timezones:');
const usTimezones = ['EST', 'CST', 'MST', 'PST'];
usTimezones.forEach(tz => {
  try {
    const result = timeZoneHandler.getCurrentTime(tz);
    console.log(`${tz}: ${result.localTime} (${result.abbreviation}, DST: ${result.isDST})`);
  } catch (error) {
    console.log(`${tz}: Error - ${error.message}`);
  }
});

console.log('\n2. Current time in AU timezones:');
const auTimezones = ['AEST', 'ACST', 'AWST'];
auTimezones.forEach(tz => {
  try {
    const result = timeZoneHandler.getCurrentTime(tz);
    console.log(`${tz}: ${result.localTime} (${result.abbreviation}, DST: ${result.isDST})`);
  } catch (error) {
    console.log(`${tz}: Error - ${error.message}`);
  }
});

// 2. Convert time between timezones
console.log('\n3. Time conversion examples:');
try {
  const conversion1 = timeZoneHandler.convertTime(
    '2024-07-15 10:00:00',
    'America/New_York',
    'America/Los_Angeles'
  );
  console.log(`NY to LA: ${conversion1.source.time} → ${conversion1.target.time}`);

  const conversion2 = timeZoneHandler.convertTime(
    '2024-07-15 14:00:00',
    'Australia/Sydney',
    'Australia/Perth'
  );
  console.log(`Sydney to Perth: ${conversion2.source.time} → ${conversion2.target.time}`);
} catch (error) {
  console.log(`Conversion error: ${error.message}`);
}

// 3. Get timezone by state
console.log('\n4. Timezone by state/territory:');
try {
  const californiaTime = timeZoneHandler.getTimezoneByState('California', 'US');
  console.log(`California: ${californiaTime.timezone} - ${californiaTime.currentTime.localTime}`);

  const nswTime = timeZoneHandler.getTimezoneByState('New South Wales', 'AU');
  console.log(`NSW: ${nswTime.timezone} - ${nswTime.currentTime.localTime}`);
} catch (error) {
  console.log(`State lookup error: ${error.message}`);
}

// 4. DST Information
console.log('\n5. DST Information:');
try {
  const dstInfoNY = timeZoneHandler.getDSTInfo('America/New_York', 2024);
  console.log(`New York DST 2024:`);
  console.log(`  Has DST: ${dstInfoNY.hasDST}`);
  console.log(`  Currently DST: ${dstInfoNY.currentlyDST}`);
  console.log(`  DST Start: ${dstInfoNY.dstStart}`);
  console.log(`  DST End: ${dstInfoNY.dstEnd}`);

  const dstInfoSydney = timeZoneHandler.getDSTInfo('Australia/Sydney', 2024);
  console.log(`\nSydney DST 2024:`);
  console.log(`  Has DST: ${dstInfoSydney.hasDST}`);
  console.log(`  Currently DST: ${dstInfoSydney.currentlyDST}`);
} catch (error) {
  console.log(`DST info error: ${error.message}`);
}

// 5. Business Hours
console.log('\n6. Business Hours:');
try {
  const businessHoursNY = timeZoneHandler.getBusinessHours('America/New_York');
  console.log(`New York Business Hours:`);
  console.log(`  Current time: ${businessHoursNY.currentTime}`);
  console.log(`  Is business hours: ${businessHoursNY.isBusinessHours}`);
  console.log(`  Is work day: ${businessHoursNY.isWorkDay}`);

  const nextBusinessHour = timeZoneHandler.timeUntilNextBusinessHour('America/New_York');
  console.log(`  Next business hour: ${nextBusinessHour.nextBusinessHour}`);
  console.log(`  Time until: ${nextBusinessHour.timeUntil.hours}h ${nextBusinessHour.timeUntil.minutes}m`);
} catch (error) {
  console.log(`Business hours error: ${error.message}`);
}

// 6. Regional comparison
console.log('\n7. Regional timezone comparison:');
try {
  const usRegion = timeZoneHandler.getRegionTimezones('US');
  console.log(`US has ${usRegion.length} timezone abbreviations`);
  
  const auRegion = timeZoneHandler.getRegionTimezones('AU');
  console.log(`AU has ${auRegion.length} timezone abbreviations`);
} catch (error) {
  console.log(`Regional comparison error: ${error.message}`);
}

console.log('\n=== Demo Complete ===');
