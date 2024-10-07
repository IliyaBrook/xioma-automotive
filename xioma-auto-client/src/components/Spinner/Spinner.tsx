import { LoadingOutlined } from '@ant-design/icons'
import { Spin } from 'antd'
import { ReactElement } from 'react'
import styles from './spinner.module.scss'

export const Spinner = ({size = '100px'} :{size?:string}): ReactElement => {
	return (
		<div className={styles.spinnerWrapper}>
			<Spin
				className={styles.spinner}
				indicator={<LoadingOutlined spin  style={{fontSize: size}}/>}
			/>
		</div>
	)
}

export default Spinner