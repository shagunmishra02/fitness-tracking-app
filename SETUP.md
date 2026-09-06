# 🏋️ Fitness Tracking App - Setup Guide

## Quick Start

### Prerequisites
- Node.js v16+ and npm
- MongoDB (local or MongoDB Atlas)
- Git

---

## Backend Setup

### 1. Navigate to backend directory
```bash
cd backend
```

### 2. Install dependencies
```bash
npm install
```

### 3. Create .env file
```bash
cp .env.example .env
```

### 4. Configure .env
Edit `backend/.env` and add your values:

```env
# MongoDB Connection
MONGODB_URI=mongodb://localhost:27017/fitness-app
# OR for MongoDB Atlas:
# MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/fitness-app

# JWT Configuration
JWT_SECRET=your_super_secret_jwt_key_change_this_in_production
JWT_EXPIRE=7d

# Server Configuration
PORT=5000
NODE_ENV=development

# Client URL
CLIENT_URL=http://localhost:3000
```

### 5. Start backend server

**Development mode (with auto-reload):**
```bash
npm run dev
```

**Production mode:**
```bash
npm start
```

You should see:
```
✅ Server running on http://localhost:5000
```

---

## Frontend Setup

### 1. Navigate to frontend directory
```bash
cd frontend
```

### 2. Install dependencies
```bash
npm install
```

### 3. Create .env file
```bash
echo "REACT_APP_API_URL=http://localhost:5000" > .env
```

### 4. Start frontend development server
```bash
npm start
```

The app will open at `http://localhost:3000`

---

## Testing the App

### 1. Sign Up
- Go to http://localhost:3000/signup
- Create a new account with:
  - Name, Email, Password
  - Weight (kg), Height (cm)
  - Age and Gender (optional)

### 2. Log In
- Enter your credentials
- You'll be redirected to the dashboard

### 3. Add Workouts
- Fill in workout details (exercise name, sets, reps, weight, etc.)
- Click "Add Workout"

### 4. View Progress
- See charts and statistics
- Filter workouts by type
- Edit or delete workouts

### 5. Update Profile
- Go to Profile page
- Edit your information
- Set fitness goals

---

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/profile` - Get user profile (requires token)
- `PUT /api/auth/profile` - Update user profile (requires token)

### Workouts
- `GET /api/workouts` - Get all workouts (requires token)
- `POST /api/workouts` - Add new workout (requires token)
- `GET /api/workouts/:id` - Get specific workout (requires token)
- `PUT /api/workouts/:id` - Update workout (requires token)
- `DELETE /api/workouts/:id` - Delete workout (requires token)
- `GET /api/workouts/stats` - Get statistics (requires token)
- `GET /api/workouts/prs` - Get personal records (requires token)

---

## Example API Requests

### Register
```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "email": "john@example.com",
    "password": "password123",
    "weight": 75,
    "height": 180,
    "age": 25
  }'
```

### Login
```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "john@example.com",
    "password": "password123"
  }'
```

### Add Workout
```bash
curl -X POST http://localhost:5000/api/workouts \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -d '{
    "exerciseName": "Bench Press",
    "muscleGroup": "chest",
    "workoutType": "strength",
    "sets": 3,
    "reps": 10,
    "weight": 80,
    "duration": 45,
    "intensity": "high"
  }'
```

---

## Using MongoDB Atlas

1. Go to https://www.mongodb.com/cloud/atlas
2. Create a free account
3. Create a new cluster
4. Get your connection string
5. Add it to `.env`:
   ```
   MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/fitness-app
   ```

---

## Troubleshooting

### MongoDB connection error
- Make sure MongoDB is running locally or you have internet for Atlas
- Check your connection string in `.env`
- Verify network access if using Atlas

### CORS errors
- Make sure both servers are running (backend on 5000, frontend on 3000)
- Check `CLIENT_URL` in backend `.env`

### Port already in use
- Change port in `.env`: `PORT=5001`
- Or kill the process: `lsof -ti:5000 | xargs kill -9`

### Missing dependencies
```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install
```

---

## Project Structure

```
fitness-tracking-app/
├── backend/
│   ├── models/
│   │   ├── User.js
│   │   └── Workout.js
│   ├── routes/
│   │   ├── auth.js
│   │   └── workouts.js
│   ├── middleware/
│   │   └── auth.js
│   ├── controllers/
│   │   ├── authController.js
│   │   └── workoutController.js
│   ├── config/
│   │   └── db.js
│   ├── server.js
│   ├── package.json
│   └── .env.example
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Navbar.jsx
│   │   │   ├── WorkoutForm.jsx
│   │   │   ├── WorkoutList.jsx
│   │   │   └── ProgressChart.jsx
│   │   ├── pages/
│   │   │   ├── Login.jsx
│   │   │   ├── Signup.jsx
│   │   │   ├── Dashboard.jsx
│   │   │   └── Profile.jsx
│   │   ├── App.jsx
│   │   ├── App.css
│   │   └── index.js
│   ├── public/
│   │   └── index.html
│   ├── package.json
│   └── .env.example
│
└── README.md
```

---

## Features Implemented

✅ User Authentication (Register/Login)
✅ Workout Logging (Strength, Cardio, Flexibility)
✅ Progress Tracking with Charts
✅ Personal Records Tracking
✅ Workout History & Filtering
✅ User Profile Management
✅ Dark Mode Support
✅ Responsive Design
✅ Real-time Statistics
✅ Input Validation
✅ Error Handling

---

## Next Steps

- Add mobile app (React Native)
- Implement AI-powered workout recommendations
- Add social features (friend tracking, leaderboards)
- Advanced analytics and insights
- Export workouts to PDF
- Integration with fitness wearables
- Workout video tutorials
- Community features

---

## Support

If you encounter any issues:
1. Check the troubleshooting section
2. Review the error messages in console
3. Check GitHub issues
4. Open a new issue with detailed description

---

**Happy Fitness Tracking! 💪**
