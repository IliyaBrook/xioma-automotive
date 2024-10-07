import Spinner from '@src/components/Spinner/Spinner.tsx'
import { useAppDispatch, useAppSelector } from '@src/hooks/reduxHooks.tsx'
import { fetchUserStatus } from '@src/store/thunks/authUser.thunk.ts'
import React, { ReactElement, ReactNode, useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

interface ProtectedRouteProps {
	children: ReactNode;
}

const RedirectByUserStatus: React.FC<ProtectedRouteProps> = ({children}): ReactElement | null => {
	const navigate = useNavigate();
	const location = useLocation();
	
	const dispatch = useAppDispatch();
	const { isAuth, loading } = useAppSelector((state) => state.auth);
	
	useEffect(() => {
		dispatch(fetchUserStatus());
	}, [dispatch]);
	
	useEffect(() => {
		if (!loading) {
			if (isAuth && (location.pathname === '/sign-in' || location.pathname === '/sign-up')) {
				navigate('/');
			} else if (!isAuth && location.pathname !== '/sign-in' && location.pathname !== '/sign-up') {
				navigate('/sign-in');
			}
		}
	}, [isAuth, loading, location, navigate]);
	
	if (loading) {
		return <Spinner />;
	}
	
	return isAuth || location.pathname === '/sign-in' || location.pathname === '/sign-up'
		? (children as ReactElement)
		: null;
};

export default RedirectByUserStatus;
