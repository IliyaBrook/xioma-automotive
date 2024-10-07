import GoHomeError from '@src/components/GoHomeError/GoHomeError.tsx'
import { Navigate, useRouteError } from 'react-router-dom'

export const ErrorPage = () => {
	const error = useRouteError();
	
	if (typeof error === 'object' && error !== null && 'message' in error) {
		const errorMessage = (error as Error).message;
		if (errorMessage.includes("unauthorized")) {
			return <Navigate to="/sign-in" />;
		}
	}else if (error instanceof Response && error.status === 403) {
		return <Navigate to="/login" />;
	}
	
	if (typeof error === 'object' && error !== null && 'statusText' in error) {
		return GoHomeError({title: "Oops! Something went wrong.", subTitle: error.statusText || "Unknown error"});
	}
	
	return GoHomeError({title: "Oops! Something went wrong.", subTitle: "Unknown error"});
};
