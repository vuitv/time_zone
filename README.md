# Time Zone Handler

Comprehensive time zone handling system for US, AU, CA, and VN regions with full DST support, business hours calculation, and timezone conversions.

## Features

- ✅ Complete US timezone support (EST, CST, MST, PST, AKST, HST + DST variants)
- ✅ Complete AU timezone support (AEST, ACST, AWST + DST variants)
- ✅ Complete CA timezone support (NST, AST, EST, CST, MST, PST + DST variants)
- ✅ Complete VN timezone support (ICT, VNT, SGT - Indochina Time UTC+7)
- ✅ State/Territory/Province/City to timezone mapping
- ✅ DST (Daylight Saving Time) detection and transitions
- ✅ Business hours calculation
- ✅ Time conversion between any timezones
- ✅ RESTful API endpoints
- ✅ Comprehensive test coverage

## Installation

```bash
npm install
```

## Usage

### Start the server
```bash
npm start
```

### Run in development mode
```bash
npm run dev
```

### Run tests
```bash
npm test
```

### Run demo
```bash
node demo.js
```

### View Interactive Documentation
```bash
# Start the server first
npm start

# Then open documentation.html in your browser
# Features an interactive timezone selector for all supported countries
```

## 🌐 Interactive Web Interface

The project includes a beautiful interactive web interface in `documentation.html`:

- **Country Selection**: Choose from US 🇺🇸, AU 🇦🇺, CA 🇨🇦, or VN 🇻🇳
- **Location Selection**: Pick states, provinces, or cities within each country
- **Live Time Display**: Real-time clock updates every second
- **Timezone Information**: Shows UTC offset, DST status, and timezone ID
- **Responsive Design**: Works on desktop and mobile devices

Simply open `documentation.html` in your browser after starting the server to try it out!

## API Endpoints

### Get Current Time
```
GET /api/timezone/current/:timezone
```
Examples:
- `/api/timezone/current/PST`
- `/api/timezone/current/America/New_York`
- `/api/timezone/current/Australia/Sydney`

### Convert Time
```
POST /api/timezone/convert
Content-Type: application/json

{
  "dateTime": "2024-07-15 10:00:00",
  "fromTimezone": "America/New_York",
  "toTimezone": "Australia/Sydney"
}
```

### Get Region Timezones
```
GET /api/timezone/region/:region
```
Examples:
- `/api/timezone/region/US`
- `/api/timezone/region/AU`
- `/api/timezone/region/CA`

### Get Timezone by State
```
GET /api/timezone/state/:region/:state
```
Examples:
- `/api/timezone/state/US/California`
- `/api/timezone/state/AU/New%20South%20Wales`
- `/api/timezone/state/CA/Ontario`
- `/api/timezone/state/VN/Ho%20Chi%20Minh%20City`
- `/api/timezone/state/VN/Hanoi`

### Get DST Information
```
GET /api/timezone/dst/:timezone/:year?
```
Examples:
- `/api/timezone/dst/America/New_York/2024`
- `/api/timezone/dst/Australia/Sydney`

### Business Hours
```
GET /api/timezone/business-hours/:timezone?startHour=9&endHour=17&workDays=1,2,3,4,5
```

### Time Until Next Business Hour
```
GET /api/timezone/next-business-hour/:timezone
```

### Compare Multiple Timezones
```
GET /api/timezone/comparison?timezones=PST,EST,AEST
```

### Batch Convert
```
POST /api/timezone/batch-convert
Content-Type: application/json

{
  "conversions": [
    {
      "dateTime": "2024-07-15 10:00:00",
      "fromTimezone": "PST",
      "toTimezone": "EST"
    },
    {
      "dateTime": "2024-07-15 14:00:00",
      "fromTimezone": "AEST",
      "toTimezone": "PST"
    }
  ]
}
```

## Supported Timezones

### US Timezones
- **EST/EDT**: Eastern Standard/Daylight Time (America/New_York)
- **CST/CDT**: Central Standard/Daylight Time (America/Chicago)
- **MST/MDT**: Mountain Standard/Daylight Time (America/Denver)
- **PST/PDT**: Pacific Standard/Daylight Time (America/Los_Angeles)
- **AKST/AKDT**: Alaska Standard/Daylight Time (America/Anchorage)
- **HST**: Hawaii Standard Time (Pacific/Honolulu)

### AU Timezones
- **AEST/AEDT**: Australian Eastern Standard/Daylight Time (Australia/Sydney)
- **ACST/ACDT**: Australian Central Standard/Daylight Time (Australia/Adelaide)
- **AWST/AWDT**: Australian Western Standard/Daylight Time (Australia/Perth)
- **AEST_QLD**: Queensland Time (Australia/Brisbane) - No DST
- **ACST_NT**: Northern Territory Time (Australia/Darwin) - No DST
- **LHST/LHDT**: Lord Howe Standard/Daylight Time (Australia/Lord_Howe)

### CA Timezones (Canada)
- **NST/NDT**: Newfoundland Standard/Daylight Time (America/St_Johns)
- **AST/ADT**: Atlantic Standard/Daylight Time (America/Halifax)
- **EST_CA/EDT_CA**: Eastern Standard/Daylight Time (America/Toronto)
- **CST_CA/CDT_CA**: Central Standard/Daylight Time (America/Winnipeg)
- **MST_CA/MDT_CA**: Mountain Standard/Daylight Time (America/Edmonton)
- **PST_CA/PDT_CA**: Pacific Standard/Daylight Time (America/Vancouver)

### VN Timezones (Vietnam)
- **ICT**: Indochina Time (Asia/Ho_Chi_Minh) - UTC+7, No DST
- **VNT**: Vietnam Time (Asia/Ho_Chi_Minh) - UTC+7, No DST  
- **SGT**: Saigon Time (Asia/Ho_Chi_Minh) - UTC+7, No DST (Historical)

### US States Coverage
All 50 US states are mapped to their respective timezones, including special cases like Arizona (no DST) and states spanning multiple time zones.

### AU States/Territories Coverage
All Australian states and territories are covered:
- New South Wales → Australia/Sydney
- Victoria → Australia/Melbourne
- Queensland → Australia/Brisbane
- Western Australia → Australia/Perth
- South Australia → Australia/Adelaide
- Tasmania → Australia/Hobart
- Northern Territory → Australia/Darwin
- Australian Capital Territory → Australia/Sydney

### CA Provinces/Territories Coverage
All Canadian provinces and territories are covered:
- Ontario → America/Toronto
- Quebec → America/Toronto
- British Columbia → America/Vancouver
- Alberta → America/Edmonton
- Manitoba → America/Winnipeg
- Saskatchewan → America/Regina
- Nova Scotia → America/Halifax
- New Brunswick → America/Halifax
- Prince Edward Island → America/Halifax
- Newfoundland and Labrador → America/St_Johns
- Yukon → America/Whitehorse
- Northwest Territories → America/Yellowknife
- Nunavut → America/Iqaluit

### VN Provinces/Cities Coverage  
All 63 Vietnamese provinces and major cities are covered:
- Ho Chi Minh City → Asia/Ho_Chi_Minh
- Hanoi → Asia/Ho_Chi_Minh
- Da Nang → Asia/Ho_Chi_Minh
- Hai Phong → Asia/Ho_Chi_Minh
- Can Tho → Asia/Ho_Chi_Minh
- And 58+ other provinces/cities → Asia/Ho_Chi_Minh

*Note: Vietnam uses a single timezone (UTC+7) for the entire country.*

## Code Examples

### Basic Usage
```javascript
const TimeZoneHandler = require('./src/TimeZoneHandler');
const handler = new TimeZoneHandler();

// Get current time
const currentTime = handler.getCurrentTime('PST');
console.log(currentTime);

// Convert time
const converted = handler.convertTime(
  '2024-07-15 10:00:00',
  'America/New_York',
  'Australia/Sydney'
);
console.log(converted);

// Get timezone by state
const stateTime = handler.getTimezoneByState('California', 'US');
console.log(stateTime);
```

### Advanced Features
```javascript
// DST information
const dstInfo = handler.getDSTInfo('America/New_York', 2024);
console.log('DST starts:', dstInfo.dstStart);
console.log('DST ends:', dstInfo.dstEnd);

// Business hours
const businessHours = handler.getBusinessHours('America/New_York', {
  startHour: 9,
  endHour: 17,
  workDays: [1, 2, 3, 4, 5] // Monday to Friday
});
console.log('Is business hours:', businessHours.isBusinessHours);

// Time until next business hour
const nextBusiness = handler.timeUntilNextBusinessHour('America/New_York');
console.log('Next business hour in:', nextBusiness.timeUntil);
```

## Testing

The project includes comprehensive tests covering:
- Timezone resolution and validation
- Time conversion accuracy
- DST detection and transitions
- Business hours calculation
- Regional timezone listings
- State/territory mapping
- Error handling

Run tests with:
```bash
npm test
```

## Error Handling

The API provides consistent error responses:
```json
{
  "success": false,
  "error": "Invalid timezone: INVALID_TZ"
}
```

Common error scenarios:
- Invalid timezone identifiers
- Missing required parameters
- Invalid date/time formats
- Unsupported regions
- Unknown states/territories

## Configuration

Environment variables in `.env`:
```
PORT=3000
NODE_ENV=development
DEFAULT_START_HOUR=9
DEFAULT_END_HOUR=17
DEFAULT_WORK_DAYS=1,2,3,4,5
LOG_LEVEL=info
```

## Dependencies

- **moment-timezone**: Robust timezone handling and conversions
- **express**: Web framework for API endpoints
- **cors**: Cross-origin resource sharing
- **dotenv**: Environment variable management
- **jest**: Testing framework
- **nodemon**: Development server with auto-restart

## License

MIT License
