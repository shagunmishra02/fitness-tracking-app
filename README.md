# Fitness Tracking App 🏋️

A full-stack web application for tracking fitness workouts, monitoring progress, and achieving fitness goals.

## Features

✨ **Core Features**
- 🔐 Secure user authentication with JWT
- 📝 Comprehensive workout logging (strength, cardio, flexibility)
- 🔥 Auto-calculated calories burned (based on muscle group, duration, intensity & body weight)
- 🔥 Workout streak tracker (current streak + longest streak)
- 🎯 Goal setting (weekly/monthly targets for workouts, calories, or minutes trained)
- 📊 Real-time progress tracking with charts
- 🏆 Personal records (PR) tracking
- 👤 User profile management
- 📱 Fully responsive design
- 🌓 Dark mode support
- 📈 Advanced statistics and analytics

## Quick Start

### Prerequisites
- Node.js v16+
- MongoDB (local or Atlas)
- npm or yarn

### Installation

#### 1. Clone Repository
```bash
git clone https://github.com/shagunmishra02/fitness-tracking-app.git
cd fitness-tracking-app
```

#### 2. Install Dependencies
```bash
npm run install-all
```

#### 3. Configure Backend
```bash
cd backend
cp .env.example .env
```

Edit `backend/.env`:
```env
MONGODB_URI=mongodb://localhost:27017/fitness-app
JWT_SECRET=your_secret_key_here
PORT=5000
NODE_ENV=development
CLIENT_URL=http://localhost:3000
```

#### 4. Configure Frontend
```bash
cd frontend
echo "REACT_APP_API_URL=http://localhost:5000" > .env
```

#### 5. Start Servers

**Terminal 1 - Backend:**
```bash
cd backend
npm run dev
```

**Terminal 2 - Frontend:**
```bash
cd frontend
npm start
```

App will be available at `http://localhost:3000`

---

## Tech Stack

### Frontend
- **React 18** - UI library
- **React Router** - Navigation
- **Axios** - HTTP client
- **Recharts** - Data visualization
- **Tailwind CSS** - Styling
- **Lucide React** - Icons

### Backend
- **Node.js + Express** - Server framework
- **MongoDB** - Database
- **Mongoose** - ODM
- **JWT** - Authentication
- **Bcrypt** - Password hashing
- **CORS** - Cross-origin support

---

## Project Structure

```
fitness-tracking-app/
├── frontend/
│   ├── src/
│   │   ├── components/      # Reusable components
│   │   ├── pages/           # Page components
│   │   ├── App.jsx
│   │   ├── App.css
│   │   └── index.js
│   ├── package.json
│   └── README.md
├── backend/
│   ├── models/              # Mongoose schemas
│   ├── routes/              # API routes
│   ├── controllers/         # Business logic
│   ├── middleware/          # Custom middleware
│   ├── config/              # Configuration
│   ├── server.js
│   ├── package.json
│   └── README.md
├── package.json
├── SETUP.md                 # Detailed setup guide
└── README.md
```

---

## API Documentation

### Authentication Endpoints

#### Register User
```http
POST /api/auth/register
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123",
  "weight": 75,
  "height": 180,
  "age": 25
}
```

#### Login
```http
POST /api/auth/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "password123"
}
```

#### Get Profile
```http
GET /api/auth/profile
Authorization: Bearer {token}
```

#### Update Profile
```http
PUT /api/auth/profile
Authorization: Bearer {token}
Content-Type: application/json

{
  "name": "John Doe",
  "age": 26,
  "weight": 74,
  "height": 180
}
```

### Workout Endpoints

#### Add Workout
```http
POST /api/workouts
Authorization: Bearer {token}
Content-Type: application/json

{
  "exerciseName": "Bench Press",
  "muscleGroup": "chest",
  "workoutType": "strength",
  "sets": 3,
  "reps": 10,
  "weight": 80,
  "duration": 45,
  "intensity": "high",
  "notes": "Great workout!"
}
```

#### Get All Workouts
```http
GET /api/workouts
Authorization: Bearer {token}
```

Query parameters:
- `muscleGroup` - Filter by muscle group
- `startDate` - Filter from date
- `endDate` - Filter to date

#### Get Workout Statistics
```http
GET /api/workouts/stats?period=week
Authorization: Bearer {token}
```

Period options: `week`, `month`, `year`

#### Get Personal Records
```http
GET /api/workouts/prs
Authorization: Bearer {token}
```

#### Get Workout Streak
```http
GET /api/workouts/streak
Authorization: Bearer {token}
```

Returns:
```json
{
  "currentStreak": 3,
  "longestStreak": 12,
  "lastWorkoutDate": "2026-09-05T00:00:00.000Z"
}
```

#### Update Workout
```http
PUT /api/workouts/{id}
Authorization: Bearer {token}
Content-Type: application/json
```

#### Delete Workout
```http
DELETE /api/workouts/{id}
Authorization: Bearer {token}
```

### Goal Endpoints

#### Set/Update a Goal
```http
POST /api/goals
Authorization: Bearer {token}
Content-Type: application/json

{
  "metric": "workouts",
  "period": "weekly",
  "targetValue": 4
}
```

`metric` options: `workouts`, `calories`, `duration`
`period` options: `weekly`, `monthly`

Setting a goal for a metric+period combo you already have will update it (upsert) rather than create a duplicate.

#### Get All Goals (with live progress)
```http
GET /api/goals
Authorization: Bearer {token}
```

Returns each goal with live-calculated progress for the current week/month:
```json
{
  "goals": [
    {
      "_id": "...",
      "metric": "workouts",
      "period": "weekly",
      "targetValue": 4,
      "currentValue": 2,
      "percentage": 50,
      "isCompleted": false
    }
  ]
}
```

#### Delete a Goal
```http
DELETE /api/goals/{id}
Authorization: Bearer {token}
```

---

## Usage Guide

### 1. Sign Up
- Navigate to signup page
- Enter name, email, password
- Provide weight and height
- Click "Sign Up"

### 2. Log In
- Enter email and password
- Click "Login"

### 3. Add Workout
- Go to Dashboard
- Fill in workout form
- Select exercise type (strength, cardio, etc.)
- Enter workout details
- Click "Add Workout"

### 4. Track Progress
- View charts and statistics
- See personal records
- Track muscle group breakdown
- Monitor workout history
- Check your current and longest workout streak on the Dashboard
- Set a weekly or monthly goal (workouts, calories, or minutes) and watch the progress bar fill up as you log workouts

### 5. Manage Profile
- Go to Profile page
- Edit personal information
- Update fitness goals
- View member since date

---

## Features in Detail

### 💪 Workout Logging
- Multiple workout types (strength, cardio, flexibility, sports)
- Support for sets, reps, and weight
- Distance tracking for cardio
- Intensity levels
- Custom notes for each workout
- Calories burned are auto-calculated using a MET-based formula (metric × body weight × duration), personalized to the logged-in user's profile weight

### 🔥 Streaks & Goals
- Current streak: consecutive calendar days with at least one logged workout (still counts if your last workout was yesterday, resets after a full missed day)
- Longest streak: your all-time best consecutive-day run
- Set weekly or monthly goals for number of workouts, total calories burned, or total minutes trained
- Goal progress is calculated live from your actual workout history — no manual tracking needed

### 📊 Progress Tracking
- Weight progression charts
- Muscle group breakdown
- Workout frequency analytics
- Personal records tracking
- Duration and calories analysis

### 👤 User Profiles
- Account management
- Personal information tracking
- Fitness goal setting
- Member statistics

### 🎨 User Interface
- Clean, intuitive design
- Dark/Light mode toggle
- Fully responsive layout
- Real-time form validation
- Smooth animations

---

## Environment Variables

### Backend (.env)
```env
# Database
MONGODB_URI=mongodb://localhost:27017/fitness-app

# JWT
JWT_SECRET=your_super_secret_key
JWT_EXPIRE=7d

# Server
PORT=5000
NODE_ENV=development
CLIENT_URL=http://localhost:3000
```

### Frontend (.env)
```env
REACT_APP_API_URL=http://localhost:5000
```

---

## Deployment

### Frontend (Vercel/Netlify)
1. Build project: `npm run build`
2. Deploy build folder
3. Set environment variable: `REACT_APP_API_URL`

### Backend (Heroku/Railway/Render)
1. Set MongoDB URI and JWT_SECRET
2. Connect GitHub repository
3. Deploy

---

## Future Enhancements

- 🏆 Achievement badges (streaks, PR milestones, workout counts)
- 📄 PDF/CSV export of workout history
- 📏 Body measurements tracking (weight, body fat %, chest/waist/arms over time)
- 🗂️ Workout templates/routines (save & reuse a set of exercises)
- 📱 Mobile app (React Native)
- 🤖 AI workout recommendations
- 👥 Social features (friend tracking, leaderboards)
- ⌚ Wearable integration
- 🎥 Video tutorials

---

## Contributing

Contributions are welcome! Please:

1. Fork the repository
2. Create feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Open Pull Request

---

## License

This project is licensed under the MIT License - see LICENSE file for details.

---

## Support

For support, questions, or issues:
- Open an issue on GitHub
- Check existing documentation
- Review setup guides

---

## Author

**Shagun Mishra** - [@shagunmishra02](https://github.com/shagunmishra02)

---

**Happy Fitness Tracking! 💪🎯**

Made with ❤️ for fitness enthusiasts
