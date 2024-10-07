import type { RootState } from '@src/store/store.ts'

export const selectTasks = (state: RootState) => state.tasks.tasks
export const selectTaskIsLoading = (state: RootState) => state.tasks.isLoading
export const selectTaskHasMore = (state: RootState) => state.tasks.hasMore