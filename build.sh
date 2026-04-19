#!/bin/bash
# Deploy script for Vercel

# Build backend (if needed)
npm install

# Build frontend
cd client
npm install
npm run build
cd ..

echo "✅ Build complete! Ready for Vercel deployment."
