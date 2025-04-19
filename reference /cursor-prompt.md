# MedShadow Platform Development Prompt

Create a modern, responsive web application called "MedShadow" that connects high school and college students with medical shadowing, rotation, and volunteering opportunities at hospitals and doctor's offices. Initially targeting Dallas and Chicago markets with plans for nationwide expansion. The application should follow these requirements:

## Tech Stack
- Frontend: Next.js 14 with React
- Styling: Tailwind CSS with a clean, modern, professional color palette
- Backend: Node.js with Express
- Database: MongoDB with Mongoose
- Authentication: NextAuth.js
- Maps/Location: Google Maps API
- Payment Processing: Stripe for student subscriptions

## Core Features

### 1. User Authentication & Profiles
- Implement two distinct user types:
  - **Student profiles**: For high school and college students (subscription-based)
  - **Medical Facility profiles**: For hospitals and doctor's offices (added mainly by admin initially)
  - **Professional profiles**: For medical professionals at those facilities (added by facility)
- Each profile type should have appropriate fields:
  - Students: Name, education level, interests, skills, location, subscription status
  - Facilities: Name, facility type, specialties, location, verification status
  - etc

### 2. Opportunity Listings
- Facilities can create, edit, and manage shadowing and volunteering opportunities
- Each listing should include:
  - Title, description, specialty area
  - Duration and schedule (dates, times)
  - Requirements (education level, skills)
  - Type (paid/unpaid, shadowing/volunteering)
  - Location (with map integration) - focused on Dallas and Chicago initially
  - Application process and deadlines

### 3. Search and Discovery
- Implement a main page showing nearby opportunities
- Include an interactive map view centered on Dallas and Chicago
- Create advanced filtering by:
  - Specialty (cardiology, pediatrics, etc.)
  - Type (paid/unpaid)
  - Distance from user's location
  - Duration and schedule
  - Education level requirements

### 4. Hour Logging System
- Students can log shadowing/volunteering hours
- Include date, duration, facility, supervising physician
- Verification system for facilities to confirm logged hours
- Generate reports/certificates of completed hours
- Dashboard view of accumulated hours by specialty/facility

### 5. Responsive Design
- Ensure the website works flawlessly on all device sizes
- Implement a mobile-first approach
- Optimize all interactive elements for touch interfaces
- Use a clean, modern UI with a professional color palette
- Intuitive navigation and user-friendly design

## Implementation Plan

Start by setting up the project structure and implementing the core functionality. Follow these steps:

1. Initialize a new Next.js project with TypeScript support
2. Set up Tailwind CSS with a professional color scheme (blues, teals, whites with accent colors)
3. Create the database models for users, profiles, opportunities, and hour logs
4. Implement the authentication system with NextAuth.js
5. Build the basic user interface components with a focus on clean, modern design
6. Create the profile creation and management pages
7. Implement the opportunity creation and listing features
8. Add the search and filtering functionality with geolocation focus on Dallas and Chicago
9. Integrate the Google Maps API for location-based features
10. Implement the hour logging system
11. Test thoroughly on various devices
12. Deploy the application

Please begin by setting up the project structure and creating the foundational components for our MedShadow platform, focusing on a clean, modern UI that's intuitive to use.
