# MedShadow Platform

A modern web platform connecting students with medical shadowing, rotation, and volunteering opportunities at hospitals and doctor's offices.

## Features

- User Authentication & Profiles (Students, Medical Facilities, Professionals)
- Opportunity Listings with Advanced Search
- Location-based Discovery
- Hour Logging System
- Review and Rating System
- Responsive Design

## Tech Stack

- Frontend: Next.js 14 with React
- Styling: Tailwind CSS
- Backend: Node.js with Express
- Database: MongoDB with Mongoose
- Authentication: NextAuth.js
- Maps: Google Maps API

## Prerequisites

- Node.js 18.x or later
- MongoDB 5.x or later
- Google Maps API key
- SMTP server for email notifications

## Getting Started

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/medshadow.git
   cd medshadow
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables:
   - Copy `.env.example` to `.env`
   - Update the variables with your configuration

4. Start the development server:
   ```bash
   npm run dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser

## Project Structure

```
medshadow/
├── src/
│   ├── app/              # Next.js app directory
│   ├── components/       # Reusable UI components
│   ├── lib/             # Utility functions and configurations
│   ├── models/          # MongoDB models
│   ├── types/           # TypeScript type definitions
│   ├── utils/           # Helper functions
│   ├── hooks/           # Custom React hooks
│   ├── context/         # React context providers
│   └── styles/          # Global styles
├── public/              # Static assets
└── package.json         # Project dependencies
```

## Development

### Code Style

- Follow the ESLint configuration
- Use TypeScript for type safety
- Follow the component-based architecture
- Use Tailwind CSS for styling

### Database

- MongoDB is used as the primary database
- Mongoose is used as the ODM
- Models are defined in the `src/models` directory

### Authentication

- NextAuth.js is used for authentication
- Supports multiple user roles
- JWT-based session management

### API Routes

- RESTful API design
- Located in `src/app/api`
- Follow REST conventions

## Deployment

1. Build the application:
   ```bash
   npm run build
   ```

2. Start the production server:
   ```bash
   npm start
   ```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.
