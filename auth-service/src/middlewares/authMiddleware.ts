import type { RequestWithUser } from '@src/types/user.types';
import { NextFunction, Response, Request } from 'express';
import jwt from 'jsonwebtoken';

export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
	const request = req as unknown as RequestWithUser;
	const token = request.cookies?.token;
	
	if (!token) {
		return res.status(200).json({ message: 'unauthorized' });
	}
	
	try {
		const decoded = jwt.verify(token, process.env.JWT_SECRET!) as { id: string };
		request.user = decoded.id;
		next();
	} catch (error) {
		return res.status(200).json({ message: 'unauthorized' });
	}
};
