// Seed the octofit_db database with test data
import mongoose from 'mongoose';
import {
  ActivityModel,
  LeaderboardEntryModel,
  TeamModel,
  UserModel,
  WorkoutModel,
} from '../models';

const mongoUri = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/octofit_db';

async function seed() {
  await mongoose.connect(mongoUri);
  console.log('Connected to MongoDB');

  await Promise.all([
    UserModel.deleteMany({}),
    TeamModel.deleteMany({}),
    ActivityModel.deleteMany({}),
    LeaderboardEntryModel.deleteMany({}),
    WorkoutModel.deleteMany({}),
  ]);

  const users = await UserModel.insertMany([
    {
      name: 'Ada Lovelace',
      email: 'ada@example.com',
      role: 'admin',
      age: 36,
      location: 'London',
      fitnessGoal: 'Marathon training',
    },
    {
      name: 'Grace Hopper',
      email: 'grace@example.com',
      role: 'member',
      age: 42,
      location: 'New York',
      fitnessGoal: 'Strength building',
    },
    {
      name: 'Katherine Johnson',
      email: 'katherine@example.com',
      role: 'member',
      age: 39,
      location: 'Chicago',
      fitnessGoal: 'Flexibility',
    },
  ]);

  const team = await TeamModel.create({
    name: 'Alpha Squad',
    members: users.map((user) => user._id),
    focus: 'Endurance',
    city: 'Seattle',
  });

  await ActivityModel.insertMany([
    {
      userId: users[0]._id,
      type: 'run',
      durationMinutes: 35,
      calories: 420,
      notes: 'Morning interval run',
    },
    {
      userId: users[1]._id,
      type: 'strength',
      durationMinutes: 50,
      calories: 510,
      notes: 'Upper body circuit',
    },
    {
      userId: users[2]._id,
      type: 'yoga',
      durationMinutes: 30,
      calories: 180,
      notes: 'Recovery flow',
    },
  ]);

  await LeaderboardEntryModel.insertMany([
    {
      userId: users[0]._id,
      username: 'ada',
      score: 1280,
      rank: 1,
      streakDays: 7,
    },
    {
      userId: users[1]._id,
      username: 'grace',
      score: 1160,
      rank: 2,
      streakDays: 4,
    },
    {
      userId: users[2]._id,
      username: 'katherine',
      score: 1090,
      rank: 3,
      streakDays: 6,
    },
  ]);

  await WorkoutModel.insertMany([
    {
      title: 'Morning Mobility',
      durationMinutes: 20,
      difficulty: 'easy',
      focus: 'mobility',
      equipment: ['mat'],
      description: 'Gentle mobility flow for the start of the day.',
    },
    {
      title: 'HIIT Intervals',
      durationMinutes: 25,
      difficulty: 'hard',
      focus: 'cardio',
      equipment: ['treadmill'],
      description: 'Short explosive intervals for cardio endurance.',
    },
    {
      title: 'Strength Builder',
      durationMinutes: 40,
      difficulty: 'moderate',
      focus: 'strength',
      equipment: ['dumbbells', 'bench'],
      description: 'Full-body strength workout with compound lifts.',
    },
  ]);

  console.log(`Seeded ${users.length} users, 1 team, activities, leaderboard entries, and workouts.`);
  await mongoose.disconnect();
}

seed().catch((error) => {
  console.error('Seed failed', error);
  process.exit(1);
});
