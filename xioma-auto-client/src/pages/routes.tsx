import RedirectByUserStatus from '@src/components/redirectByUserStatus.tsx'
import { ErrorPage } from '@src/pages/errorPage/errorPage.tsx'
import Home from '@src/pages/home/home.tsx'
import SignIn from '@src/pages/sign-in/sign-in.tsx'
import SignUp from '@src/pages/sign-up/sign-up.tsx'
import { createBrowserRouter } from 'react-router-dom'

const router = createBrowserRouter([
	{
		path: "/",
		element: (
			<RedirectByUserStatus>
				<Home />
			</RedirectByUserStatus>
		),
		errorElement: <ErrorPage />,
		
	},
	{
		path: "/sign-in",
		element: (
			<RedirectByUserStatus>
				<SignIn />
			</RedirectByUserStatus>
		),
		errorElement: <ErrorPage />
	},
	{
		path: "/sign-up",
		element: (
			<RedirectByUserStatus>
				<SignUp />
			</RedirectByUserStatus>
		),
		errorElement: <ErrorPage />
	},
]);

export default router;