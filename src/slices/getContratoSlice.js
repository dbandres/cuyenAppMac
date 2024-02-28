import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { API_URL, token } from '../api';

export const getContrato = createAsyncThunk('getContrato', async(num)=>{
  try {
    const response = await axios.get(`${API_URL}/contrato/${num}`,{
      headers: {
        'x-access-token': `${token}`,
        "Content-Type": "application/json",
      }
    })
    if(response.status === 200){
      console.log(response.data);
      return response.data;
    }
  } catch (error) {
    throw error
  }
})


const contratoSlice = createSlice({
  name: 'contratoSlice',
  initialState: {
    contrato: [],
    loading: false,
    error: null,
  },
  extraReducers: (buider) => {
    buider
      .addCase(getContrato.pending, (state) => {
        state.loading = true,
          state.error = null
      })
      .addCase(getContrato.fulfilled, (state, action) => {
        state.loading = false,
          state.contrato = action.payload
      })
      .addCase(getContrato.rejected, (state, action) => {
        state.loading = false,
          state.error = action.error.message
      })
  }
})

const contratoReducer = contratoSlice.reducer
export default contratoReducer;