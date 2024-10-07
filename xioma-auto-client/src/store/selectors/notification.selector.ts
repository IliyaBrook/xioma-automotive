import type { RootState } from '@src/store/store.ts'

export const selectNotifications = (state: RootState) => state.notifications.notifications
export const selectUnreadCount = (state: RootState) => state.notifications.unreadCount
export const selectIsDrawerVisible = (state: RootState) => state.notifications.isDrawerVisible