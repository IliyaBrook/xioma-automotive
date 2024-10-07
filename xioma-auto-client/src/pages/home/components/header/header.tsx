import { NotificationFilled } from '@ant-design/icons';
import { headerSelector } from '@src/store/selectors'
import { Avatar, Badge, Col, Row, Layout } from 'antd';
import { useAppSelector, useAppDispatch } from '@src/hooks/reduxHooks';
import { toggleDrawer } from '@src/store/slices/notification.slice';
import { ReactElement } from 'react';
import styles from './header.module.scss';
const { Header: AntHeader } = Layout;

const Header = (): ReactElement => {
	const dispatch = useAppDispatch();
	const { userName, unreadCount } = useAppSelector(headerSelector);
	
	return (
		<AntHeader className={styles.header}>
			<Row className={styles.headerRow}>
				<Col span={12}>
					<div className={styles.loggedInUserWrapper}>
						<span>Welcome, <span>{userName}</span></span>
					</div>
				</Col>
				<Col span={12}>
					<div className={styles.notificationWrapper}>
						<div className={styles.badgeWrapper}>
							<div onClick={() => dispatch(toggleDrawer())}>
								<Badge count={unreadCount} overflowCount={99}>
									<Avatar icon={<NotificationFilled />} />
								</Badge>
							</div>
						</div>
					</div>
				</Col>
			</Row>
		</AntHeader>
	);
};

export default Header;
