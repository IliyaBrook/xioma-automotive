// noinspection DuplicatedCode

import authRoutes from '@routes/authRoutes';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
import express from 'express';
import mongoose from 'mongoose';

dotenv.config();
const { MONGO_URI, SERVER_PORT, API_GATEWAY_URL } = process.env;

const app = express();

app.use((req, res, next) => {
	res.header("Access-Control-Allow-Origin", API_GATEWAY_URL);
	res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
	next();
});

app.use(cookieParser());
app.use(express.json());
app.use('/api/auth', authRoutes);

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

app.listen(SERVER_PORT, () => {
	console.log('Auth service running on port', SERVER_PORT);
});
