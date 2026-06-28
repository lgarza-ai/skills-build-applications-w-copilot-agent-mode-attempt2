import express, { type Request, type Response } from 'express';
import {
  ActivityModel,
  LeaderboardEntryModel,
  TeamModel,
  UserModel,
  WorkoutModel,
} from './models';
import { connectDatabase } from './config/database';

const app = express();
const port = Number(process.env.PORT || 8000);
const codespaceName = process.env.CODESPACE_NAME?.trim();
const apiBaseUrl = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev`
  : 'http://localhost:8000';

app.use(express.json());

app.get('/api/health', (_req: Request, res: Response) => {
  res.json({
    status: 'ok',
    service: 'octofit-backend',
    apiUrl: apiBaseUrl,
    routes: ['/api/users/', '/api/teams/', '/api/activities/', '/api/leaderboard/', '/api/workouts/'],
  });
});

app.get(['/api/users', '/api/users/'], async (_req: Request, res: Response) => {
  const users = await UserModel.find({}).lean();
  res.json(users);
});

app.post(['/api/users', '/api/users/'], async (req: Request, res: Response) => {
  const user = await UserModel.create(req.body);
  res.status(201).json(user);
});

app.get(['/api/teams', '/api/teams/'], async (_req: Request, res: Response) => {
  const teams = await TeamModel.find({}).populate('members').lean();
  res.json(teams);
});

app.post(['/api/teams', '/api/teams/'], async (req: Request, res: Response) => {
  const team = await TeamModel.create(req.body);
  res.status(201).json(team);
});

app.get(['/api/activities', '/api/activities/'], async (_req: Request, res: Response) => {
  const activities = await ActivityModel.find({}).populate('userId').lean();
  res.json(activities);
});

app.post(['/api/activities', '/api/activities/'], async (req: Request, res: Response) => {
  const activity = await ActivityModel.create(req.body);
  res.status(201).json(activity);
});

app.get(['/api/leaderboard', '/api/leaderboard/'], async (_req: Request, res: Response) => {
  const leaderboard = await LeaderboardEntryModel.find({}).populate('userId').lean();
  res.json(leaderboard);
});

app.post(['/api/leaderboard', '/api/leaderboard/'], async (req: Request, res: Response) => {
  const entry = await LeaderboardEntryModel.create(req.body);
  res.status(201).json(entry);
});

app.get(['/api/workouts', '/api/workouts/'], async (_req: Request, res: Response) => {
  const workouts = await WorkoutModel.find({}).lean();
  res.json(workouts);
});

app.post(['/api/workouts', '/api/workouts/'], async (req: Request, res: Response) => {
  const workout = await WorkoutModel.create(req.body);
  res.status(201).json(workout);
});

async function startServer() {
  await connectDatabase();

  app.listen(port, '0.0.0.0', () => {
    console.log(`OctoFit backend listening on port ${port}`);
    console.log(`API base URL: ${apiBaseUrl}`);
  });
}

startServer().catch((error) => {
  console.error('Failed to start server', error);
  process.exit(1);
});
