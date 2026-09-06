# Frontend Setup Instructions

## Prerequisites
- Node.js v16+ installed
- npm or yarn

## Installation Steps

### 1. Install Dependencies
```bash
npm install
```

### 2. Create Environment File
```bash
echo "REACT_APP_API_URL=http://localhost:5000" > .env
```

### 3. Start Development Server
```bash
npm start
```

The app will open automatically at `http://localhost:3000`

## Available Scripts

### `npm start`
Runs the app in development mode.
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

### `npm build`
Builds the app for production to the `build` folder.

### `npm test`
Launches the test runner in interactive watch mode.

## Features

- 🔐 User Authentication (JWT)
- 📊 Workout Logging & Tracking
- 📈 Progress Charts & Statistics
- 🎯 Personal Records Tracking
- 👤 Profile Management
- 🌓 Dark Mode Support
- 📱 Fully Responsive Design

## Environment Variables

```
REACT_APP_API_URL=http://localhost:5000
```

## Folder Structure

```
src/
├── components/
│   ├── Navbar.jsx
│   ├── WorkoutForm.jsx
│   ├── WorkoutList.jsx
│   └── ProgressChart.jsx
├── pages/
│   ├── Login.jsx
│   ├── Signup.jsx
│   ├── Dashboard.jsx
│   └── Profile.jsx
├── App.jsx
├── App.css
└── index.js
```

## Technologies Used

- React 18
- React Router v6
- Axios for API calls
- Recharts for data visualization
- Tailwind CSS for styling
- Lucide React for icons

## Deployment

To build and deploy:

```bash
npm run build
```

The build folder is ready to be deployed to services like:
- Vercel
- Netlify
- GitHub Pages
- AWS S3

## Troubleshooting

### Cannot find module errors
```bash
rm -rf node_modules package-lock.json
npm install
```

### CORS errors
- Make sure backend is running on `http://localhost:5000`
- Check `.env` file has correct API URL

### Port 3000 already in use
```bash
PORT=3001 npm start
```

## Support

For issues and questions, please open an issue on GitHub.
