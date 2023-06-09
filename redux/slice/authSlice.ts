import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '../store'

interface AuthState {
  user: any,
  loading: boolean
}

// Define the initial state using that type
const initialState: AuthState = {
  user: null,
  loading: false,
}

export const AuthSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<any>) => {
      state.user = action.payload
    },
    setLoading: (state, action: PayloadAction<any>) => {
      state.loading = action.payload
    },
    logOut: (state) => {
      localStorage.clear();
      state.user = null;
    }
  },
})

export const { setUser, setLoading, logOut } = AuthSlice.actions

export const getAuth = (state: RootState) => state.auth

export default AuthSlice.reducer