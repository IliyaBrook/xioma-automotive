import type { RootState } from '@src/store/store.ts'

export const selectVisibleModal = (state: RootState) => state.taskModal.visible;
export const selectTitleModal = (state: RootState) => state.taskModal.title;
export const selectDescriptionModal = (state: RootState) => state.taskModal.description;
export const selectLocationModal = (state: RootState) => state.taskModal.location;
export const selectLoadingLocationModal = (state: RootState) => state.taskModal.loadingLocation;
export const selectStatusModal = (state: RootState) => state.taskModal.status;
export const selectAuthUsersModal = (state: RootState) => state.taskModal.authUsers;
export const selectUsersLoadingModal = (state: RootState) => state.taskModal.usersLoading;
export const selectHasMoreUsersModal = (state: RootState) => state.taskModal.hasMoreUsers;
export const selectAssigneeDataModal = (state: RootState) => state.taskModal.assigneeData;
export const selectModeModal = (state: RootState) => state.taskModal.mode;
export const selectTaskModal = (state: RootState) => state.taskModal.task;
