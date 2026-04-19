# BackendTest

Full-stack React Vite + Node.js + MongoDB Contact Form Application

## Features
- React Vite frontend with contact form
- Node.js Express backend API
- MongoDB database for storing contacts
- Responsive design
- Environment-based configuration
- Vercel deployment ready

## Setup

### Prerequisites
- Node.js 16+
- MongoDB Atlas account
- Git

### Installation

```bash
# Install backend dependencies
npm install

# Install frontend dependencies
cd client && npm install
```

### Environment Setup

Create `.env` file in root:
```
MONGODB_URI=mongodb+srv://Test:test@t.7bexn6b.mongodb.net/?appName=T
PORT=5000
NODE_ENV=development
```

### Running the Project

**Backend (Terminal 1):**
```bash
npm run server
```

**Frontend (Terminal 2):**
```bash
cd client && npm run dev
```

## Deployment

Deployed on Vercel: [Your Vercel URL]

## Tech Stack
- Frontend: React 18 + Vite + Axios
- Backend: Node.js + Express
- Database: MongoDB
- Deployment: Vercel
