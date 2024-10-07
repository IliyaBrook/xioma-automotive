import { useAppDispatch, useAppSelector } from '@src/hooks/reduxHooks'
import { useNotification } from '@src/hooks/useNotification.tsx'
import { taskModalSelector } from '@src/store/selectors'
import {
	closeModal,
	updateAssignee,
	updateDescription,
	updateLocation,
	updateStatus,
	updateTitle
} from '@src/store/slices/taskModal.slice'
import { fetchAuthUsers } from '@src/store/thunks/authUser.thunk.ts'
import { addTaskThunk, fetchLocation, updateTaskThunk } from '@src/store/thunks/task.thunk.ts'
import { ITaskStatus } from '@src/types/task.type.ts'
import type { IUserDataUser } from '@src/types/userData.types.ts'
import { GMAP_API_KEY } from '@src/utils/constants.ts'
import { Col, Input, Modal, Row, Select, Typography } from 'antd'
import { useEffect } from 'react'
import styles from './taskModal.module.scss'
import GeoAutocompleteForm from 'geo-autocomplete-form'
const {Text} = Typography

export const TaskModal = () => {
	const dispatch = useAppDispatch();
	const {
		visible,
		title,
		description,
		location,
		loadingLocation,
		status,
		authUsers,
		usersLoading,
		hasMoreUsers,
		assigneeData,
		mode,
		task,
		defaultUserId,
		defaultUserName
	} = useAppSelector(taskModalSelector)
	
	const {contextHolder, openNotification} = useNotification()
	
	useEffect(() => {
		if (visible) {
			dispatch(fetchAuthUsers())
			if (!location.name && mode === 'add') {
				dispatch(fetchLocation())
			}
		}
	}, [visible, dispatch])
	
	const handleSaveTask = async () => {
		const taskData = {
			title,
			description,
			location: location ?? { name: '', longitude: 0, latitude: 0 },
			status,
			assignee: {
				_id: assigneeData?._id || defaultUserId,
				name: assigneeData?.name || defaultUserName,
			},
		};
		
		if (!taskData.title) {
			openNotification({
				message: 'Error',
				description: 'Title is required',
				type: 'error',
				placement: 'topLeft'
			});
			return;
		}
		if (!taskData.description) {
			openNotification({
				message: 'Error',
				description: 'Description is required',
				type: 'error',
				placement: 'topLeft'
			});
			return;
		}
		
		if (mode === 'add') {
			dispatch(addTaskThunk({task: taskData, userId: defaultUserId }))
		} else if (mode === 'edit' && task?._id) {
			dispatch(updateTaskThunk({ task: taskData, taskId: task._id, userId: defaultUserId }));
		}
		
		dispatch(closeModal());
	};
	
	return (
		<>
			<Modal
				title='Add Task'
				open={visible}
				onCancel={() => dispatch(closeModal())}
				onOk={handleSaveTask}
				className={styles.modal}
			>
				<Row gutter={[5, 5]}>
					<Col span={18}>
						<Input
							placeholder='Task Title'
							value={title}
							className={styles.taskTitleInput}
							onChange={(e) => dispatch(updateTitle(e.target.value))}
						/>
					</Col>
					<Col span={6}>
						<Select
							className={styles.select}
							value={status}
							onChange={(value) => dispatch(updateStatus(value))}
						>
							<Select.Option value={ITaskStatus.NEW}>New</Select.Option>
							<Select.Option value={ITaskStatus.IN_PROGRESS}>In progress</Select.Option>
							<Select.Option value={ITaskStatus.COMPLETED}>Completed</Select.Option>
							<Select.Option value={ITaskStatus.ON_HOLD}>On hold</Select.Option>
							<Select.Option value={ITaskStatus.CANCELLED}>Cancelled</Select.Option>
						</Select>
					</Col>
					<Col span={18} className={styles.locationCol}>
						{loadingLocation ? (
							<Text>Getting your location...</Text>
						) : location.name ? (
							<Text strong>{location.name}</Text>
						) : mode === 'add' ? (
							<GeoAutocompleteForm
								API_KEY={GMAP_API_KEY}
								onFinish={(location) => {
									dispatch(updateLocation(location))
								}}
								cityStyle={{ width: '100%' }}
								countryStyle={{ width: '100%' }}
								submitStyle={{ width: '100%' }}
								formRowGutter={[5, 5]}
							/>
						) : null}
					</Col>
					<Col span={6}>
						<Select
							style={{ width: '100%' }}
							value={assigneeData?.name || defaultUserName}
							onChange={(value) => {
								const selectedUser = authUsers.find((user: IUserDataUser) => user.name === value)
								if (selectedUser) dispatch(updateAssignee(selectedUser))
							}}
							onPopupScroll={() => hasMoreUsers && dispatch(fetchAuthUsers())}
							loading={usersLoading}
						>
							{authUsers.map((user:IUserDataUser) => (
								<Select.Option key={user._id} value={user.name}>
									{user.name}
								</Select.Option>
							))}
						</Select>
					</Col>
					<Col span={24}>
						<Input.TextArea
							autoSize={{ minRows: 3, maxRows: 10 }}
							placeholder='Description'
							value={description}
							onChange={(e) => dispatch(updateDescription(e.target.value))}
						/>
					</Col>
				</Row>
			</Modal>
			{contextHolder}
		</>
	);
};