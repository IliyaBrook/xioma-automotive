import { Button, Result } from 'antd'
import { ReactElement, type ReactNode } from 'react'
import { useNavigate } from 'react-router-dom'
import styles from './goHomeError.module.scss'

interface GoHomeErrorProps <T, S> {
	title: T
	subTitle: S
}

export const GoHomeError = <T, S>({subTitle, title}: GoHomeErrorProps<T, S>): ReactElement => {
	const navigate = useNavigate();
	
	return (
		<Result
			className={styles.goHomeError}
			status="error"
			title={title as ReactNode}
			subTitle={subTitle as ReactNode}
			extra={
				<Button type="primary" onClick={() => navigate('/')}>
					Go to Home Page
				</Button>
			}
		/>
	)
}

export default GoHomeError