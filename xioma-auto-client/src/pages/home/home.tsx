import { useAppDispatch, useAppSelector } from '@src/hooks/reduxHooks.tsx'
import { useNotification } from '@src/hooks/useNotification.tsx'
import Header from '@src/pages/home/components/header/header.tsx'
import Notification from '@src/pages/home/components/notification/notification.tsx'
import { taskColumns } from '@src/pages/home/components/taskColumns.tsx'
import { TaskModal } from '@src/pages/home/components/taskModal/taskModal.tsx'
import { homePageSelector } from '@src/store/selectors'
import { addNotification, updateNotificationDetails } from '@src/store/slices/notification.slice.ts'
import { addTask } from '@src/store/slices/task.slice.ts'
import { openModal } from '@src/store/slices/taskModal.slice.ts'
import { deleteTaskThunk, fetchTasksThunk } from '@src/store/thunks/task.thunk.ts'
import type { ITaskNotification } from '@src/types/notification.types.ts'
import { Button, Col, Layout, Row, Table } from 'antd'
import axios from 'axios'
import { ReactElement, useEffect, useMemo, useRef } from 'react'
import io from 'socket.io-client'
import styles from './home.module.scss'

const { Content } = Layout
const socket = io('http://localhost:4000')

export const Home = (): ReactElement => {
	
	const dispatch = useAppDispatch()
	const { tasks, notifications, isLoading, hasMore, userId } = useAppSelector(homePageSelector)
	const { contextHolder, openNotification } = useNotification()
	const observerRef = useRef<IntersectionObserver | null>(null)
	const lastTaskRef = useRef<HTMLDivElement | null>(null)
	
	useEffect(() => {
		socket.on('task_notification', (data: ITaskNotification) => {
			console.log("task_notification data", data)
			
			if (data?.userId !== userId) {
				dispatch(addTask(data.task))
			}
			if (data.method === 'create') {
				openNotification({
					message: 'New Task',
					description: 'A new task was assigned to you',
					type: 'info',
					placement: 'topLeft'
				})
				if (data.notification) {
					dispatch(addNotification({
						_id: data.notification._id,
						datetime: data.notification.datetime,
						user: data.notification.user,
						task: data.notification.task,
						details: data.notification.details,
						isUnread: data.notification.isUnread
					}));
				}
			}else if (data.method === 'update') {
				openNotification({
					message: 'Task Updated',
					description: 'A task assigned to you has been updated',
					type: 'info',
					placement: 'topLeft'
				})
				if (data?.notification) {
					console.log("is notification socket")
					
					if (data?.userId !== userId) {
						console.log("is data?.userId socket")
						const notification = notifications.find((n) => n._id === data.notification._id);
						console.log("notification socket found", notification)
						
						if (!notification) {
							dispatch(addNotification(data.notification));
						}
					}
					dispatch(
						updateNotificationDetails({
							notificationId: data.notification._id,
							newDetails: data.notification.details,
						})
					);
				}
			}
		})

		socket.emit('join_room', userId)

		return () => {
			socket.off('task_notification')
			socket.emit('leave_room', userId)
		}
	}, [userId])
	
	useEffect(() => {
		if (observerRef.current) observerRef.current.disconnect()
		
		observerRef.current = new IntersectionObserver(
			(entries) => {
				if (entries[0].isIntersecting && hasMore && !isLoading) {
					dispatch(fetchTasksThunk(userId))
				}
			},
			{ threshold: 1 }
		)
		
		if (lastTaskRef.current) {
			observerRef.current.observe(lastTaskRef.current)
		}
		
		return () => {
			if (observerRef.current) observerRef.current.disconnect()
		}
	}, [dispatch, hasMore, isLoading, userId])
	
	const columns = useMemo(() => taskColumns({
		handleEdit: (task) => dispatch(openModal({ mode: 'edit', task })),
		handleDelete: async (taskId) => void dispatch(deleteTaskThunk(taskId))
	}), [dispatch, tasks.length])
	
	const handleLogout = async () => {
		try {
			await axios.post('/api/auth/logout')
			openNotification({
				message: 'Logged out',
				description: 'You have been successfully logged out',
				type: 'success',
				placement: 'top',
			})
			setTimeout(() => window.location.reload(), 2000)
		} catch (error) {
			openNotification({
				message: 'Error',
				description: 'Error logging out',
				type: 'error',
				placement: 'top',
			})
		}
	}
	
	return (
		<Layout className={styles.home}>
			<Header />
			<Notification />
			<Content className={styles.content}>
				<Row gutter={5} className={styles.buttonsRow}>
					<Col xl={2} className={styles.addTaskBtnCol}>
						<Button type='primary' size='large' onClick={() => dispatch(openModal({ mode: 'add' }))}>
							Add Task
						</Button>
					</Col>
					<Col xl={2} className={styles.logoutBtnCol}>
						<Button type='primary' size='large' danger onClick={handleLogout}>
							Logout
						</Button>
					</Col>
				</Row>
				<Table
					columns={columns}
					dataSource={tasks}
					rowKey='_id'
					pagination={false}
					rowClassName={(_record, index) => (index === tasks.length - 1 ? 'last-row' : '')}
				/>
				<div ref={lastTaskRef} />
			</Content>
			<TaskModal />
			{contextHolder}
		</Layout>
	)
}

export default Home
