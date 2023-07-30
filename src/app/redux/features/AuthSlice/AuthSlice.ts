import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import User from '../../../types/User'
import type { RootState } from '../../store'


type AuthState = {
  user: User | null
}

const initialState: AuthState = {
  user: null,
}

export const authSlice = createSlice({
  name: 'authSlice',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<User | null>) => {
      state.user = action.payload
    },
  },
})

export const { setUser } = authSlice.actions
export default authSlice.reducer

export const selectUser = (state: RootState) => state.authSlice.user
