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

console.log('\n3. Current time in CA timezones:');
const caTimezones = ['NST', 'AST', 'EST_CA', 'CST_CA', 'MST_CA', 'PST_CA'];
caTimezones.forEach(tz => {
  try {
    const result = timeZoneHandler.getCurrentTime(tz);
    console.log(`${tz}: ${result.localTime} (${result.abbreviation}, DST: ${result.isDST})`);
  } catch (error) {
    console.log(`${tz}: Error - ${error.message}`);
  }
});

console.log('\n3.1. Current time in VN timezones:');
const vnTimezones = ['ICT', 'VNT'];
vnTimezones.forEach(tz => {
  try {
    const result = timeZoneHandler.getCurrentTime(tz);
    console.log(`${tz}: ${result.localTime} (${result.abbreviation}, DST: ${result.isDST})`);
  } catch (error) {
    console.log(`${tz}: Error - ${error.message}`);
  }
});

// 2. Convert time between timezones
console.log('\n4. Time conversion examples:');
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

  const conversion3 = timeZoneHandler.convertTime(
    '2024-07-15 12:00:00',
    'America/Toronto',
    'America/Vancouver'
  );
  console.log(`Toronto to Vancouver: ${conversion3.source.time} → ${conversion3.target.time}`);

  const conversion4 = timeZoneHandler.convertTime(
    '2024-07-15 15:00:00',
    'Asia/Ho_Chi_Minh',
    'America/New_York'
  );
  console.log(`Ho Chi Minh to New York: ${conversion4.source.time} → ${conversion4.target.time}`);
} catch (error) {
  console.log(`Conversion error: ${error.message}`);
}

// 3. Get timezone by state
console.log('\n5. Timezone by state/territory/province:');
try {
  const californiaTime = timeZoneHandler.getTimezoneByState('California', 'US');
  console.log(`California: ${californiaTime.timezone} - ${californiaTime.currentTime.localTime}`);

  const nswTime = timeZoneHandler.getTimezoneByState('New South Wales', 'AU');
  console.log(`NSW: ${nswTime.timezone} - ${nswTime.currentTime.localTime}`);

  const ontarioTime = timeZoneHandler.getTimezoneByState('Ontario', 'CA');
  console.log(`Ontario: ${ontarioTime.timezone} - ${ontarioTime.currentTime.localTime}`);

  const hcmcTime = timeZoneHandler.getTimezoneByState('Ho Chi Minh City', 'VN');
  console.log(`Ho Chi Minh City: ${hcmcTime.timezone} - ${hcmcTime.currentTime.localTime}`);

  const hanoiTime = timeZoneHandler.getTimezoneByState('Hanoi', 'VN');
  console.log(`Hanoi: ${hanoiTime.timezone} - ${hanoiTime.currentTime.localTime}`);
} catch (error) {
  console.log(`State lookup error: ${error.message}`);
}

// 4. DST Information
console.log('\n6. DST Information:');
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

  const dstInfoToronto = timeZoneHandler.getDSTInfo('America/Toronto', 2024);
  console.log(`\nToronto DST 2024:`);
  console.log(`  Has DST: ${dstInfoToronto.hasDST}`);
  console.log(`  Currently DST: ${dstInfoToronto.currentlyDST}`);

  const dstInfoHCMC = timeZoneHandler.getDSTInfo('Asia/Ho_Chi_Minh', 2024);
  console.log(`\nHo Chi Minh City DST 2024:`);
  console.log(`  Has DST: ${dstInfoHCMC.hasDST}`);
  console.log(`  Currently DST: ${dstInfoHCMC.currentlyDST}`);
} catch (error) {
  console.log(`DST info error: ${error.message}`);
}

// 5. Business Hours
console.log('\n7. Business Hours:');
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
console.log('\n8. Regional timezone comparison:');
try {
  const usRegion = timeZoneHandler.getRegionTimezones('US');
  console.log(`US has ${usRegion.length} timezone abbreviations`);
  
  const auRegion = timeZoneHandler.getRegionTimezones('AU');
  console.log(`AU has ${auRegion.length} timezone abbreviations`);

  const caRegion = timeZoneHandler.getRegionTimezones('CA');
  console.log(`CA has ${caRegion.length} timezone abbreviations`);

  const vnRegion = timeZoneHandler.getRegionTimezones('VN');
  console.log(`VN has ${vnRegion.length} timezone abbreviations`);
} catch (error) {
  console.log(`Regional comparison error: ${error.message}`);
}

console.log('\n=== Demo Complete ===');
