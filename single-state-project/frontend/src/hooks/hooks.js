import {TypeUseSelectorHook, useDispatch, useSelector} from 'react-redux'
import {RootState, AppDispatch} from '@/store/store'

export const useAppDispatch: () => AppDispatch = useDispatch
export const useAppSelector: TypeUseSelectorHook<RootState> = useSelector