# Changelog

All notable changes to this project will be documented in this file.

## [1.0.0] - 2025-07-09

### Added
- Complete timezone support for 4 regions: US, AU, CA, VN
- US timezone support (EST, CST, MST, PST, AKST, HST + DST variants)
- AU timezone support (AEST, ACST, AWST + DST variants, Lord Howe)
- CA timezone support (NST, AST, EST, CST, MST, PST + DST variants)
- VN timezone support (ICT, VNT, SGT - all UTC+7, no DST)
- Full state/territory/province/city mapping for all regions
- DST detection and transition calculations
- Business hours calculation with customizable parameters
- Time conversion between any supported timezones
- RESTful API with comprehensive endpoints
- Comprehensive test coverage (27 test cases)
- Demo application showcasing all features

### Features
- **US States**: All 50 states mapped to appropriate timezones
- **AU States/Territories**: 8 states and territories covered
- **CA Provinces/Territories**: 13 provinces and territories covered  
- **VN Provinces/Cities**: 63+ provinces and major cities covered
- **API Endpoints**:
  - GET `/api/timezone/current/:timezone` - Current time lookup
  - POST `/api/timezone/convert` - Time conversion
  - GET `/api/timezone/region/:region` - Regional timezone listing
  - GET `/api/timezone/state/:region/:state` - Location-based lookup
  - GET `/api/timezone/dst/:timezone/:year?` - DST information
  - GET `/api/timezone/business-hours/:timezone` - Business hours
  - POST `/api/timezone/batch-convert` - Batch conversions
  - GET `/health` - Service health check

### Technical Details
- Built with Node.js, Express, and moment-timezone
- Comprehensive error handling and validation
- Clean, maintainable, and well-documented code
- High test coverage with Jest
- RESTful API design following best practices
- Support for both timezone abbreviations and IANA identifiers

### Supported Regions
- **US**: United States (50 states, multiple timezones, DST support)
- **AU**: Australia (8 states/territories, multiple timezones, DST support)
- **CA**: Canada (13 provinces/territories, multiple timezones, DST support)
- **VN**: Vietnam (63+ provinces/cities, single timezone UTC+7, no DST)

### Documentation
- Complete README.md with usage examples
- API documentation with endpoint details
- Code examples and demo application
- Comprehensive test suite demonstrating all features
