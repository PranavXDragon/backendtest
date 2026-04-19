# BackendTest

Full-stack Next.js + MongoDB Contact Form Application

## Features
- Next.js 14 frontend with React 18
- MongoDB database with Mongoose
- RESTful API endpoints
- Contact form with validation
- Status dashboard
- Responsive design
- Vercel deployment ready

## Tech Stack
- **Frontend:** Next.js 14 + React 18
- **Backend:** Next.js API Routes
- **Database:** MongoDB Atlas
- **Deployment:** Vercel

## Quick Start

### Prerequisites
- Node.js 18+
- MongoDB Atlas account

### Installation

```bash
npm install
```

### Environment Setup

Create `.env.local`:
```
MONGODB_URI=mongodb+srv://Test:Test@t.7bexn6b.mongodb.net/?appName=T
```

### Running

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## Project Structure

```
backendtest/
├── pages/                 # Next.js pages and API routes
│   ├── api/              # API endpoints
│   │   ├── health.js     # Health check
│   │   └── contacts/     # Contact endpoints
│   ├── _app.js           # App wrapper
│   ├── _document.js      # Document wrapper
│   ├── index.js          # Home page
│   ├── contact.js        # Contact form page
│   └── status.js         # Status dashboard
├── lib/                  # Utilities
│   ├── mongodb.js        # MongoDB connection
│   └── models/           # Mongoose models
├── styles/               # CSS modules
└── public/               # Static files
```

## API Endpoints

- `POST /api/contacts` - Create contact
- `GET /api/contacts` - Get all contacts
- `GET /api/contacts/[id]` - Get single contact
- `PUT /api/contacts/[id]` - Update contact
- `DELETE /api/contacts/[id]` - Delete contact
- `GET /api/health` - Health check

## Deployment

### Vercel

```bash
npm run build
npm run start
```

### Environment Variables for Vercel

```
MONGODB_URI=mongodb+srv://Test:Test@t.7bexn6b.mongodb.net/?appName=T
NODE_ENV=production
```

## License

ISC
