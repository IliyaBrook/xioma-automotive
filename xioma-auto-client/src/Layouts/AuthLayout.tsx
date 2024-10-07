import { type ReactNode } from 'react'
import styles from './authLayout.module.scss'

export const AuthLayout = ({children}: {children: ReactNode}) => {
	return (
		<div className={styles.layout}>
			{children}
		</div>
	)
}

export default AuthLayout