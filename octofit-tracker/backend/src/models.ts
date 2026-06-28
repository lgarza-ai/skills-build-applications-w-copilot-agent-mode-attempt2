import mongoose, { Schema } from 'mongoose';

const userSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  role: { type: String, default: 'member' },
  age: Number,
  location: String,
  fitnessGoal: String,
});

const teamSchema = new Schema({
  name: { type: String, required: true },
  members: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  focus: String,
  city: String,
});

const activitySchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  type: { type: String, required: true },
  durationMinutes: { type: Number, required: true },
  calories: Number,
  date: { type: Date, default: Date.now },
  notes: String,
});

const leaderboardSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  username: { type: String, required: true },
  score: { type: Number, default: 0 },
  rank: { type: Number, default: 1 },
  streakDays: { type: Number, default: 0 },
});

const workoutSchema = new Schema({
  title: { type: String, required: true },
  durationMinutes: { type: Number, required: true },
  difficulty: { type: String, default: 'moderate' },
  focus: String,
  equipment: [String],
  description: String,
});

export const UserModel = mongoose.model('User', userSchema);
export const TeamModel = mongoose.model('Team', teamSchema);
export const ActivityModel = mongoose.model('Activity', activitySchema);
export const LeaderboardEntryModel = mongoose.model('LeaderboardEntry', leaderboardSchema);
export const WorkoutModel = mongoose.model('Workout', workoutSchema);
