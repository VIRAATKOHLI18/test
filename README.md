# Full-Stack Admin Dashboard

A modern, responsive admin dashboard built with Next.js frontend and Express.js backend.

## Features

### Frontend (Next.js)
- 🎨 Modern UI with Tailwind CSS and Radix UI components
- 📱 Fully responsive design
- ⚡ Fast and optimized with Next.js 14
- 🎭 Smooth animations with Framer Motion
- 🔍 Real-time search and filtering
- 📊 Dashboard with analytics and stats
- 👥 User management interface
- 🎯 TypeScript for type safety

### Backend (Express.js)
- 🚀 RESTful API with Express.js
- 🔐 JWT authentication
- 🛡️ Security middleware (Helmet, CORS, Rate limiting)
- ✅ Input validation with express-validator
- 📝 Request logging with Morgan
- 🔄 CRUD operations for users
- 📊 Dashboard analytics endpoints
- 🏥 Health check endpoints

## Project Structure

```
├── frontend/          # Next.js frontend application
│   ├── src/
│   │   ├── app/       # App router pages
│   │   ├── components/ # Reusable UI components
│   │   └── lib/       # Utilities and API client
│   └── package.json
├── backend/           # Express.js backend API
│   ├── routes/        # API route handlers
│   ├── server.js      # Main server file
│   └── package.json
└── README.md
```

## Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

1. **Install dependencies for both frontend and backend:**
   ```bash
   # Install backend dependencies
   cd backend && npm install
   
   # Install frontend dependencies
   cd ../frontend && npm install
   ```

2. **Set up environment variables:**
   - Backend: Copy `.env.example` to `.env` and configure
   - Frontend: Copy `.env.local.example` to `.env.local` and configure

### Running the Application

#### Option 1: Run both services simultaneously (Recommended)
```bash
cd frontend
npm run dev:full
```

#### Option 2: Run services separately

**Terminal 1 - Backend:**
```bash
cd backend
npm run dev
```

**Terminal 2 - Frontend:**
```bash
cd frontend
npm run dev
```

### Access the Application
- **Frontend:** http://localhost:3000
- **Backend API:** http://localhost:3001/api
- **API Health Check:** http://localhost:3001/api/health

## API Endpoints

### Authentication
- `POST /api/auth/login` - User login
- `POST /api/auth/register` - User registration
- `POST /api/auth/logout` - User logout

### Users
- `GET /api/users` - Get all users (with pagination and search)
- `GET /api/users/:id` - Get user by ID
- `POST /api/users` - Create new user
- `PUT /api/users/:id` - Update user
- `DELETE /api/users/:id` - Delete user

### Dashboard
- `GET /api/dashboard` - Get dashboard overview data
- `GET /api/dashboard/analytics` - Get analytics data

### System
- `GET /api/health` - Health check endpoint

## Default Login Credentials

For testing purposes, you can use:
- **Email:** admin@example.com
- **Password:** password

## Technologies Used

### Frontend
- **Next.js 14** - React framework with App Router
- **TypeScript** - Type safety
- **Tailwind CSS** - Utility-first CSS framework
- **Radix UI** - Accessible component primitives
- **Framer Motion** - Animation library
- **Axios** - HTTP client
- **React Hook Form** - Form handling
- **Zod** - Schema validation

### Backend
- **Express.js** - Web framework
- **JWT** - Authentication
- **bcryptjs** - Password hashing
- **Helmet** - Security middleware
- **CORS** - Cross-origin resource sharing
- **Morgan** - HTTP request logger
- **express-validator** - Input validation
- **express-rate-limit** - Rate limiting

## Development

### Code Structure
- **Frontend components** are organized by feature and reusability
- **Backend routes** are modular and follow RESTful conventions
- **Type safety** is maintained throughout the frontend
- **Error handling** is implemented on both frontend and backend

### Adding New Features
1. **Backend:** Add new routes in the `backend/routes/` directory
2. **Frontend:** Create components in `frontend/src/components/`
3. **API Integration:** Update `frontend/src/lib/api.ts` with new endpoints

## Production Deployment

### Frontend (Vercel/Netlify)
```bash
cd frontend
npm run build
```

### Backend (Railway/Heroku/DigitalOcean)
```bash
cd backend
npm start
```

### Environment Variables for Production
- Update `JWT_SECRET` with a secure random string
- Set `NODE_ENV=production`
- Configure database connection strings
- Update CORS origins for production domains

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

This project is licensed under the MIT License.