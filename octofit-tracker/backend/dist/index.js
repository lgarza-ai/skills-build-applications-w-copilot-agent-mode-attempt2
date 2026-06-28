"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const models_1 = require("./models");
const database_1 = require("./config/database");
const server_1 = require("./server");
const app = (0, express_1.default)();
const port = Number(process.env.PORT || 8000);
const apiBaseUrl = (0, server_1.getApiBaseUrl)();
app.use(express_1.default.json());
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    res.header('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS');
    if (req.method === 'OPTIONS') {
        res.sendStatus(204);
        return;
    }
    next();
});
app.get('/api/health', (_req, res) => {
    res.json({
        status: 'ok',
        service: 'octofit-backend',
        apiUrl: apiBaseUrl,
        routes: ['/api/users/', '/api/teams/', '/api/activities/', '/api/leaderboard/', '/api/workouts/'],
    });
});
app.get(['/api/users', '/api/users/'], async (_req, res) => {
    const users = await models_1.UserModel.find({}).lean();
    res.json(users);
});
app.post(['/api/users', '/api/users/'], async (req, res) => {
    const user = await models_1.UserModel.create(req.body);
    res.status(201).json(user);
});
app.get(['/api/teams', '/api/teams/'], async (_req, res) => {
    const teams = await models_1.TeamModel.find({}).populate('members').lean();
    res.json(teams);
});
app.post(['/api/teams', '/api/teams/'], async (req, res) => {
    const team = await models_1.TeamModel.create(req.body);
    res.status(201).json(team);
});
app.get(['/api/activities', '/api/activities/'], async (_req, res) => {
    const activities = await models_1.ActivityModel.find({}).populate('userId').lean();
    res.json(activities);
});
app.post(['/api/activities', '/api/activities/'], async (req, res) => {
    const activity = await models_1.ActivityModel.create(req.body);
    res.status(201).json(activity);
});
app.get(['/api/leaderboard', '/api/leaderboard/'], async (_req, res) => {
    const leaderboard = await models_1.LeaderboardEntryModel.find({}).populate('userId').lean();
    res.json(leaderboard);
});
app.post(['/api/leaderboard', '/api/leaderboard/'], async (req, res) => {
    const entry = await models_1.LeaderboardEntryModel.create(req.body);
    res.status(201).json(entry);
});
app.get(['/api/workouts', '/api/workouts/'], async (_req, res) => {
    const workouts = await models_1.WorkoutModel.find({}).lean();
    res.json(workouts);
});
app.post(['/api/workouts', '/api/workouts/'], async (req, res) => {
    const workout = await models_1.WorkoutModel.create(req.body);
    res.status(201).json(workout);
});
async function startServer() {
    await (0, database_1.connectDatabase)();
    app.listen(port, '0.0.0.0', () => {
        console.log(`OctoFit backend listening on port ${port}`);
        console.log(`API base URL: ${apiBaseUrl}`);
    });
}
startServer().catch((error) => {
    console.error('Failed to start server', error);
    process.exit(1);
});
