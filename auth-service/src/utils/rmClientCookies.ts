import { Response } from 'express';

const rmClientCookies = (res: Response): void => {
	try {
		res.clearCookie('token', {
			httpOnly: true,
			// in production, set secure to true when using https protocol
			secure: false,
			sameSite: 'lax'
		});
	}catch (e) {
		 console.error('clear cookie error', e);
		 throw new Error('Failed to clear cookies');
	}
}

export default rmClientCookies;