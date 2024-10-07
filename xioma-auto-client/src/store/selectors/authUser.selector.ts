import type { RootState } from '@src/store/store.ts'

export const selectUserId = (state: RootState) => state.auth._id
export const selectUserName = (state: RootState) => state.auth.name