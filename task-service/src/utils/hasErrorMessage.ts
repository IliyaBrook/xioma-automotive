const hasErrorMessage = (error: unknown): error is { message: string } => {
	return !!(error && typeof error === 'object' && 'message' in error);
};
export default hasErrorMessage;