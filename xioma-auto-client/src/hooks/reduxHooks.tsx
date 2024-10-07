import type { AppDispatch, RootState } from '@src/store/store.ts'
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';

export const useAppDispatch = () => useDispatch<AppDispatch>();

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
