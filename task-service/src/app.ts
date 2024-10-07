// noinspection DuplicatedCode

import notificationRoutes from '@routes/notificationRoutes';
import express from 'express';
import mongoose from 'mongoose';
import taskRoutes from './routes/taskRoutes';
import dotenv from 'dotenv';
import http from 'http';
dotenv.config();
const { MONGO_URI, SERVER_PORT, API_GATEWAY_URL } = process.env;
import cookieParser from 'cookie-parser';
import { initNotificationSocket } from './websocket/notificationSocket';

const app = express();
const server = http.createServer(app);

app.use((_req, res, next) => {
	res.header("Access-Control-Allow-Origin", API_GATEWAY_URL);
	res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
	next();
});

app.use(express.json());
app.use(cookieParser());
app.use('/api/tasks', taskRoutes);
app.use('/api/notifications', notificationRoutes);

mongoose.connect(MONGO_URI!, {
	serverSelectionTimeoutMS: 5000,
	socketTimeoutMS: 45000
})
	.then(() => console.log('MongoDB connected'))
	.catch((err) => console.error('MongoDB connection error:', err));

mongoose.connection.on('connected', () => {
	console.log('Mongoose connected to database');
});

mongoose.connection.on('error', (err) => {
	console.error(`Mongoose connection error: ${err}`);
});

mongoose.connection.on('disconnected', () => {
	console.log('Mongoose disconnected');
});

initNotificationSocket(server);

server.listen(SERVER_PORT, () => {
	console.log('Task service running on port', SERVER_PORT);
});
