// noinspection DuplicatedCode

import { Request, Response, NextFunction } from 'express';

const loggerMiddleware = (req: Request, res: Response, next: NextFunction) => {
	const { method, originalUrl, body } = req;
	
	console.log(`[${new Date().toISOString()}] ${method} request to ${originalUrl}`);
	
	if (body && Object.keys(body).length) {
		console.log('Request body:', body);
	} else {
		console.log('Request body: No body provided');
	}
	
	next();
};

export default loggerMiddleware;
