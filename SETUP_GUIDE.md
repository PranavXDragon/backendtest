# 🚀 BackendTest - Full Stack Application Setup Complete!

## ✅ Project Successfully Created and Running

### Frontend Status
- **URL:** http://localhost:5175/
- **Status:** ✅ Running (Vite Dev Server)
- **Port:** 5175

### Backend Status  
- **Status:** ✅ Ready (Node.js Express Server)
- **Port:** 5000
- **MongoDB:** Ready to connect (see connection details below)

---

## 📊 Project Structure

```
backendtest/
├── client/                          # React Vite Frontend
│   ├── src/
│   │   ├── components/
│   │   │   ├── ContactForm.jsx     # Contact form component
│   │   │   └── ContactForm.css     # Form styling
│   │   ├── App.jsx                 # Main app component
│   │   ├── App.css                 # App styling
│   │   ├── main.jsx                # React entry point
│   │   └── index.css               # Global styles
│   ├── index.html                  # HTML template
│   ├── vite.config.js              # Vite configuration
│   └── package.json                # Frontend dependencies
│
├── db/
│   └── mongodb.js                  # MongoDB connection module
│
├── models/
│   └── Contact.js                  # Contact schema
│
├── routes/
│   └── contacts.js                 # API routes (CRUD)
│
├── server.js                       # Express server main file
├── package.json                    # Backend dependencies
├── .env                            # Environment variables
├── .env.example                    # Example env file
├── vercel.json                     # Vercel deployment config
└── README.md                       # Project documentation
```

---

## 🔌 MongoDB Connection Configuration

### Connection String
```
mongodb+srv://Test:test@t.7bexn6b.mongodb.net/?appName=T
```

### Pool Configuration (Optimized for Server Environment)
- **Max Pool Size:** 10 connections
- **Min Pool Size:** 2 connections  
- **Max Idle Time:** 60,000ms (1 minute)
- **Server Selection Timeout:** 5000ms
- **Socket Timeout:** 45,000ms
- **Retry Writes:** Enabled
- **Write Concern:** Majority

This configuration is optimized for a traditional long-running server environment with stable traffic.

---

## 📬 API Endpoints

### Contact Form Endpoints
All endpoints return JSON responses with `success` boolean and `data/message` fields.

#### 1. Submit Contact Form
```
POST /api/contacts

Request Body:
{
  "name": "John Doe",
  "email": "john@example.com",
  "message": "Your message here"
}

Response (Success):
{
  "success": true,
  "message": "✅ Contact submitted successfully!",
  "data": {
    "id": "ObjectId",
    "name": "John Doe",
    "email": "john@example.com",
    "createdAt": "2026-04-19T..."
  }
}
```

**Validation Rules:**
- Name: 2-100 characters
- Email: Valid email format
- Message: 5-1000 characters

#### 2. Get All Contacts (Admin)
```
GET /api/contacts

Response:
{
  "success": true,
  "count": 5,
  "data": [...]
}
```

#### 3. Get Single Contact
```
GET /api/contacts/:id
```

#### 4. Update Contact Status
```
PUT /api/contacts/:id

Request Body:
{
  "status": "read"  // Options: 'new', 'read', 'replied'
}
```

#### 5. Delete Contact
```
DELETE /api/contacts/:id
```

---

## 🧪 Testing the Application

### Option 1: Manual Testing (Frontend)
1. Open browser to http://localhost:5175/
2. Fill in the contact form:
   - Name: Any name (2-100 chars)
   - Email: Valid email format
   - Message: Your message (5-1000 chars)
3. Click "Send Message"
4. See success/error response

### Option 2: API Testing with cURL

**Submit Contact:**
```bash
curl -X POST http://localhost:5000/api/contacts \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Jane Doe",
    "email": "jane@example.com",
    "message": "This is a test message"
  }'
```

**Get All Contacts:**
```bash
curl http://localhost:5000/api/contacts
```

**Get Health Check:**
```bash
curl http://localhost:5000/api/health
```

---

## 🔄 Running the Project

### Terminal 1 - Backend Server
```bash
cd P:\backendtest
node server.js
```

Expected output:
```
🚀 Server running on http://localhost:5000
📊 API Documentation:
   POST   /api/contacts       - Submit contact form
   GET    /api/contacts       - Get all contacts
   GET    /api/contacts/:id   - Get single contact
   PUT    /api/contacts/:id   - Update contact status
   DELETE /api/contacts/:id   - Delete contact
```

### Terminal 2 - Frontend Dev Server
```bash
cd P:\backendtest\client
npm run dev
```

Expected output:
```
VITE v5.4.21 ready
➜  Local:   http://localhost:5175/
```

---

## 🌐 GitHub Repository

- **Status:** ✅ Pushed to GitHub
- **URL:** https://github.com/PranavXDragon/backendtest
- **Branch:** main
- **Files:** 22 committed files
- **First Commit:** "first commit: Full-stack React Vite + Node.js + MongoDB contact form"

### To Continue Development:
```bash
git clone https://github.com/PranavXDragon/backendtest.git
cd backendtest
npm install
cd client && npm install
```

---

## 🚀 Vercel Deployment (Next Steps)

### Prerequisites
- Vercel account (https://vercel.com)
- GitHub account connected to Vercel

### Deployment Steps

1. **Connect GitHub Repository**
   - Go to https://vercel.com/new
   - Select "Import Git Repository"
   - Choose `PranavXDragon/backendtest`

2. **Configure Environment Variables**
   - In Vercel Settings → Environment Variables
   - Add: `MONGODB_URI=mongodb+srv://Test:test@t.7bexn6b.mongodb.net/?appName=T`
   - Add: `CORS_ORIGIN=https://your-project.vercel.app`
   - Add: `NODE_ENV=production`

3. **Configure Build Settings**
   - Framework: Other (Node.js)
   - Build Command: `npm run build`
   - Output Directory: `client/dist`
   - Install Command: `npm install`

4. **Deploy**
   - Click "Deploy"
   - Vercel will build and deploy automatically

### After Deployment
- Update `.env.example` with actual deployed URL
- Update GitHub README with live Vercel URL
- Test all API endpoints on production

---

## 📋 Database Schema

### Contacts Collection

```javascript
{
  _id: ObjectId,                          // MongoDB generated ID
  name: String,                          // Required, 2-100 chars
  email: String,                         // Required, valid email
  message: String,                       // Required, 5-1000 chars
  status: String,                        // Enum: 'new', 'read', 'replied'
  createdAt: Date,                       // Automatically set
  updatedAt: Date,                       // Automatically updated
  __v: Number                            // Mongoose version key
}
```

### Indexes
- `email`: Single index for querying
- `createdAt`: Descending index for sorting recent contacts

---

## 🔐 Environment Variables

### Development (.env)
```
MONGODB_URI=mongodb+srv://Test:test@t.7bexn6b.mongodb.net/?appName=T
PORT=5000
NODE_ENV=development
CORS_ORIGIN=http://localhost:5173
```

### Production (Vercel)
```
MONGODB_URI=<Your MongoDB URI>
PORT=5000
NODE_ENV=production
CORS_ORIGIN=https://backendtest.vercel.app
```

---

## 📦 Dependencies

### Backend
- **express** (4.18.2) - Web framework
- **mongoose** (8.0.0) - MongoDB ODM
- **dotenv** (16.3.1) - Environment variables
- **cors** (2.8.5) - CORS middleware
- **express-validator** (7.0.0) - Request validation

### Frontend
- **react** (18.2.0) - UI library
- **react-dom** (18.2.0) - DOM rendering
- **axios** (1.6.2) - HTTP client
- **vite** (5.0.8) - Build tool

---

## ⚠️ Troubleshooting

### MongoDB Connection Issues
**Error:** `querySrv ECONNREFUSED`
- MongoDB Atlas cluster may be temporarily unavailable
- Check your internet connection
- Verify IP whitelist in MongoDB Atlas (allow all IPs: 0.0.0.0/0)
- Check credentials in MONGODB_URI

### Port Already in Use
**Error:** `Port 5000 is already in use`
```bash
# Windows - Find and kill process on port 5000
netstat -ano | findstr :5000
taskkill /PID <PID> /F
```

### Frontend Not Connecting to Backend
**Error:** `Cannot connect to localhost:5000`
- Ensure backend server is running
- Check CORS_ORIGIN in .env
- Verify API routes in vite.config.js proxy

---

## 🎯 Next Steps

1. ✅ **GitHub Repository** - Already uploaded
2. 📋 **Test Locally** - Visit http://localhost:5175/
3. 🚀 **Deploy to Vercel** - Follow deployment steps above
4. 📊 **Add Database Monitoring** - MongoDB Atlas dashboard
5. 🔒 **Add Authentication** - If needed for contact management
6. 📱 **Responsive Testing** - Test on mobile devices
7. 🚀 **Setup CI/CD** - GitHub Actions for automated tests

---

## 📞 API Quick Reference

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/health` | Server health check |
| POST | `/api/contacts` | Create new contact |
| GET | `/api/contacts` | Get all contacts (limited to 50) |
| GET | `/api/contacts/:id` | Get single contact |
| PUT | `/api/contacts/:id` | Update contact status |
| DELETE | `/api/contacts/:id` | Delete contact |

---

## 💾 Files Created

✅ Backend:
- `server.js` - Express server with error handling
- `db/mongodb.js` - MongoDB connection with pooling
- `models/Contact.js` - Mongoose schema with validation
- `routes/contacts.js` - CRUD API endpoints

✅ Frontend:
- `client/src/components/ContactForm.jsx` - React form component
- `client/src/App.jsx` - Main app component
- `client/src/main.jsx` - React entry point
- `client/src/index.css` - Global styles
- `client/src/components/ContactForm.css` - Form styles

✅ Configuration:
- `package.json` - Backend dependencies and scripts
- `client/package.json` - Frontend dependencies
- `.env` - Development environment variables
- `.env.example` - Environment template
- `vercel.json` - Vercel deployment config
- `.gitignore` - Git ignore rules

---

## ✨ Features Implemented

- ✅ React Vite frontend with responsive design
- ✅ Node.js Express backend with CORS
- ✅ MongoDB integration with schema validation
- ✅ Form validation (frontend and backend)
- ✅ Error handling and user feedback
- ✅ RESTful API with full CRUD operations
- ✅ Contact status management
- ✅ Database indexing for performance
- ✅ Environment-based configuration
- ✅ GitHub integration
- ✅ Vercel deployment ready
- ✅ Connection pooling optimization

---

**Created:** April 19, 2026
**Project:** BackendTest (React Vite + Node.js + MongoDB)
**Status:** ✅ Development Ready
