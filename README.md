
EVChargeLab - Starter project
=============================

What you get:
- Frontend (React) simplified single-page dashboard in evchargelab-frontend
- Backend (Node.js + Express) starter in evchargelab-backend
- A zipped package for quick sharing/pitch

How to run (static demo - easiest):
1. Navigate to evchargelab-frontend/public
2. Open index.html in a browser (or use a static server like `npx serve public`)

How to run (full stack):
1. Install Node.js and MongoDB.
2. Backend:
   - cd evchargelab-backend
   - npm init -y
   - npm install express mongoose cors
   - node server.js
3. Frontend (recommended: use a React dev setup):
   - cd evchargelab-frontend
   - create a React app and replace src with provided files, or use tools like Vite/CRA.
   - install dependencies: react, react-dom, recharts

Notes:
- This is a starter template for SIH. Tweak styles, wire the frontend to the backend endpoints, and add auth/payment integrations for production.
