import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '../store'

interface PostState {
  posts: any,
}

// Define the initial state using that type
const initialState: PostState = {
    posts: [],
}

export const PostSlice = createSlice({
  name: 'post',
  initialState,
  reducers: {
    setAllPosts: (state, action: PayloadAction<any>) => {
      state.posts = action.payload
    },

    setAddPost: (state, action: PayloadAction<any>) => {
      state.posts.unshift(action.payload); 
    },
    
  },
})

export const { setAllPosts , setAddPost} = PostSlice.actions

export const getPosts = (state: RootState) => state.post

export default PostSlice.reducer