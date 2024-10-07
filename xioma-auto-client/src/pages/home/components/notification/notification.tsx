import { CloseOutlined } from '@ant-design/icons'
import { useAppDispatch, useAppSelector } from '@src/hooks/reduxHooks.tsx'
import { notificationSelector } from '@src/store/selectors'
import {
	toggleDrawer
} from '@src/store/slices/notification.slice.ts'
import { openModal } from '@src/store/slices/taskModal.slice.ts'
import { fetchNotificationsThunk, markNotificationAsReadThunk, deleteNotificationThunk } from '@src/store/thunks/notification.thunk.ts'
import { INotification } from '@src/types/notification.types.ts'
import { Drawer, List, message, Popconfirm } from 'antd'
import classNames from 'classnames'
import { ReactElement, useEffect, useRef } from 'react'
import styles from './notification.module.scss'


const Notification = (): ReactElement => {
	const dispatch = useAppDispatch();
	const { isDrawerVisible, notifications, userId, tasks } = useAppSelector(notificationSelector);
	// const observerRef = useRef<IntersectionObserver | null>(null);
	const lastNotificationRef = useRef<HTMLDivElement | null>(null);
	
	useEffect(() => {
		if (userId) {
			dispatch(fetchNotificationsThunk(userId));
		}
	}, [dispatch, userId]);
	
	
	const handleNotificationClick = async (notification: INotification) => {
		dispatch(markNotificationAsReadThunk(notification));
		if (notification.task) {
			if (typeof notification.task === 'string') {
				const task = tasks.find((task) => task._id === notification.task);
				if (task) {
					dispatch(openModal({ mode: 'edit', task }));
				}
			}else {
				dispatch(openModal({ mode: 'edit', task: notification.task }));
			}
		}
	};
	
	const handleDeleteNotification = async (notification: INotification) => {
		try {
			dispatch(deleteNotificationThunk(notification))
			message.success('Notification deleted successfully');
		} catch (error) {
			message.error('Failed to delete notification');
		}
	};
	
	return (
		<Drawer
			title="Unread Notifications"
			placement="right"
			onClose={() => dispatch(toggleDrawer())}
			open={isDrawerVisible}
			width={350}
		>
			<List
				itemLayout="horizontal"
				dataSource={notifications}
				renderItem={(notification, index) => (
					<>
						<List.Item
							className={classNames(styles.notificationItemLi, {
								[styles.unreadNotification]: notification.isUnread
							})}
							actions={[
								<Popconfirm
									className={styles.deleteNotifyBtn}
									title='Are you sure to delete this notification?'
									onConfirm={(event) => {
										if (event) event.stopPropagation()
										void handleDeleteNotification(notification)
									}}
									okText='Yes'
									cancelText='No'
								>
									<CloseOutlined className={styles.deleteIcon} onClick={(event) => event.stopPropagation()} />
								</Popconfirm>
							]}
							onClick={() => handleNotificationClick(notification)}
						>
							<List.Item.Meta
								className={styles.notificationItem}
								title={notification.details}
								description={new Date(notification.datetime).toLocaleString()}
							/>
						</List.Item>
						{index === notifications.length - 1 && (
							<div ref={lastNotificationRef} />
						)}
					</>
				)}
			/>
		</Drawer>
	);
};

export default Notification;
