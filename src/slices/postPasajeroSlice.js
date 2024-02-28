import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { API_URL, token } from '../api';

export const pasajeroPost = createAsyncThunk('pasajeroPost', async (data) => {
  try {
    const response = await axios.post(`${API_URL}/pasajero`,data,
      {
        headers: {
          'x-access-token': `${token}`,
          "Content-Type": "application/json",
        }
      })
    if (response.status === 200) {
      console.log(response.data);
      return response.status;
    }
  } catch (error) {
    throw error
  }
})

const postPasajeroSlice = createSlice({
  name: 'postPasajeroSlice',
  initialState: {
    postPasajero: '',
    loading: false,
    error: null,
  },
  extraReducers: (buider) => {
    buider
      .addCase(pasajeroPost.pending, (state) => {
        state.loading = true,
          state.error = null
      })
      .addCase(pasajeroPost.fulfilled, (state, action) => {
        state.loading = false,
          state.postPasajero = action.payload
      })
      .addCase(pasajeroPost.rejected, (state, action) => {
        state.loading = false,
          state.error = action.error.message
      })
  }
})

const postPasajeroReducer = postPasajeroSlice.reducer;
export default postPasajeroReducer;
