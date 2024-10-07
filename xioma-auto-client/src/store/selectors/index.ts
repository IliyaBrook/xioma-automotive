import { createSelector } from '@reduxjs/toolkit'
import { selectUserId, selectUserName } from '@src/store/selectors/authUser.selector.ts'
import {
	selectIsDrawerVisible,
	selectNotifications,
	selectUnreadCount
} from '@src/store/selectors/notification.selector.ts'
import { selectTaskHasMore, selectTaskIsLoading, selectTasks } from '@src/store/selectors/task.selector.ts'
import {
	selectAssigneeDataModal,
	selectAuthUsersModal,
	selectDescriptionModal,
	selectHasMoreUsersModal, selectLoadingLocationModal,
	selectLocationModal,
	selectModeModal,
	selectStatusModal, selectTaskModal,
	selectTitleModal,
	selectUsersLoadingModal,
	selectVisibleModal
} from '@src/store/selectors/taskModal.selector.ts'

export const homePageSelector = createSelector([
		selectTasks,
		selectNotifications,
		selectTaskIsLoading,
		selectTaskHasMore,
		selectUserId
	],
	(tasks, notifications, isLoading, hasMore, userId) => ({ userId, tasks, notifications, isLoading, hasMore })
)

export const taskModalSelector = createSelector([
	selectVisibleModal,
	selectTitleModal,
	selectDescriptionModal,
	selectLocationModal,
	selectLoadingLocationModal,
	selectStatusModal,
	selectAuthUsersModal,
	selectUsersLoadingModal,
	selectHasMoreUsersModal,
	selectAssigneeDataModal,
	selectModeModal,
	selectTaskModal,
	selectUserId,
	selectUserName
], (visible, title, description, location, loadingLocation, status, authUsers, usersLoading, hasMoreUsers, assigneeData, mode, task, userId, userName) => ({
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
	defaultUserId: userId,
	defaultUserName: userName
}));


export const notificationSelector = createSelector([
	selectIsDrawerVisible,
	selectNotifications,
	selectUserId,
	selectTasks
], (isDrawerVisible, notifications, userId, tasks) => ({
	notifications,
	isDrawerVisible,
	userId,
	tasks
}))

export const headerSelector = createSelector([
	selectUserName,
	selectUnreadCount
], (userName, unreadCount) => ({ userName, unreadCount }))