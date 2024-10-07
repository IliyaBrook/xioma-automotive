import dotenv from 'dotenv';
import express from 'express';
import { createProxyMiddleware, fixRequestBody } from 'http-proxy-middleware';
import axios from 'axios';
import cookieParser from 'cookie-parser';


dotenv.config();

const app = express();
app.use(cookieParser());
app.use(express.json());

app.use((_req, res, next) => {
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Methods", "GET,HEAD,PUT,PATCH,POST,DELETE");
	res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization, Cookie");
	next();
});

const { API_GATEWAY_PORT, AUTH_SERVICE_URL, TASK_SERVICE_URL } = process.env;

const checkTokenWithAuthService = async (req: express.Request) => {
	const token = req.cookies.token;
	if (!token) {
		throw new Error('unauthorized');
	}
	
	
	const response = await axios.get(`${AUTH_SERVICE_URL}/api/auth/`, {
		headers: {
			Cookie: `token=${token}`,
		},
	});
	
	if (response?.data?.message === "unauthorized") {
		throw new Error('unauthorized');
	}
	
	return response.data;
};

app.use('/api/auth', createProxyMiddleware({
	target: AUTH_SERVICE_URL,
	changeOrigin: true,
	logger: console,
	pathRewrite: async function (path) {
		return '/api/auth' + path;
	},
	on: {
		proxyReq: fixRequestBody
	}
}));

app.use('/', async (req, res, next) => {
	try {
		await checkTokenWithAuthService(req);
		next();
	} catch (error) {
		if (error && typeof error === 'object' && 'message' in error) {
			return res.status(401).json({ message: error.message });
		} else {
			return res.status(401).json({ message: 'unauthorized' });
		}
	}
}, createProxyMiddleware({
	target: TASK_SERVICE_URL,
	changeOrigin: true,
	logger: console,
	pathRewrite: function (path) {
		return path;
	},
	on: {
		proxyReq: fixRequestBody
	}
}));

app.listen(API_GATEWAY_PORT, () => {
	console.log(`API Gateway is running on port ${API_GATEWAY_PORT}`);
});
