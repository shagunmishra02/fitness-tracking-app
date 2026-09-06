# Backend Setup Instructions

## Prerequisites
- Node.js v16+ installed
- npm or yarn
- MongoDB (local or MongoDB Atlas account)

## Installation Steps

### 1. Install Dependencies
```bash
npm install
```

### 2. Create Environment File
```bash
cp .env.example .env
```

### 3. Configure MongoDB

**Option A: Local MongoDB**
```env
MONGODB_URI=mongodb://localhost:27017/fitness-app
```

**Option B: MongoDB Atlas (Cloud)**
1. Sign up at https://www.mongodb.com/cloud/atlas
2. Create a cluster
3. Get connection string
4. Add to `.env`:
```env
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/fitness-app
```

### 4. Set JWT Secret
```env
JWT_SECRET=your_super_secret_key_change_in_production
JWT_EXPIRE=7d
```

### 5. Start Server

**Development (with auto-reload):**
```bash
npm run dev
```

**Production:**
```bash
npm start
```

Server will run on `http://localhost:5000`

## Environment Variables

```env
# Database
MONGODB_URI=mongodb://localhost:27017/fitness-app

# JWT
JWT_SECRET=your_secret_key
JWT_EXPIRE=7d

# Server
PORT=5000
NODE_ENV=development

# Client
CLIENT_URL=http://localhost:3000
```

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register user
- `POST /api/auth/login` - Login user
- `GET /api/auth/profile` - Get profile
- `PUT /api/auth/profile` - Update profile

### Workouts
- `GET /api/workouts` - Get all workouts
- `POST /api/workouts` - Add workout
- `GET /api/workouts/:id` - Get workout
- `PUT /api/workouts/:id` - Update workout
- `DELETE /api/workouts/:id` - Delete workout
- `GET /api/workouts/stats` - Get statistics
- `GET /api/workouts/prs` - Get personal records

## Technologies Used

- Express.js - Web framework
- MongoDB - Database
- Mongoose - ODM
- JWT - Authentication
- Bcryptjs - Password hashing
- CORS - Cross-origin requests

## Project Structure

```
├── models/
│   ├── User.js
│   └── Workout.js
├── routes/
│   ├── auth.js
│   └── workouts.js
├── controllers/
│   ├── authController.js
│   └── workoutController.js
├── middleware/
│   └── auth.js
├── config/
│   └── db.js
├── server.js
└── .env.example
```

## Testing with cURL

### Register
```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"name":"John","email":"john@example.com","password":"pass123","weight":75,"height":180}'
```

### Login
```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"john@example.com","password":"pass123"}'
```

### Add Workout
```bash
curl -X POST http://localhost:5000/api/workouts \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer TOKEN" \
  -d '{"exerciseName":"Bench Press","muscleGroup":"chest","workoutType":"strength","sets":3,"reps":10,"weight":80,"duration":45}'
```

## Deployment

### Heroku
1. Install Heroku CLI
2. Login: `heroku login`
3. Create app: `heroku create app-name`
4. Set environment: `heroku config:set JWT_SECRET=your_secret`
5. Deploy: `git push heroku main`

### Railway, Render, etc.
1. Connect GitHub repo
2. Set environment variables
3. Deploy

## Troubleshooting

### MongoDB Connection Error
- Check connection string in `.env`
- Ensure MongoDB is running
- For Atlas, whitelist your IP

### Port Already in Use
```bash
PORT=5001 npm run dev
```

### CORS Errors
- Check `CLIENT_URL` in `.env`
- Ensure frontend is running on correct port

## Support

For issues and questions, please open an issue on GitHub.
