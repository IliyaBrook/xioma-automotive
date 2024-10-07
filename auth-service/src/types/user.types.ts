export interface RequestWithUser extends Request {
	user?: string;
	cookies?: {
		token: string;
	};
}