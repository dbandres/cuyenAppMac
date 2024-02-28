import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { API_URL, token } from '../api';

export const getDestino = createAsyncThunk('getDestino', async(num)=>{
  try {
    const response = await axios.get(`${API_URL}/nuevoviaje/${num}`,{
      headers: {
        'x-access-token': `${token}`,
        "Content-Type": "application/json",
      }
    })
    if(response.status === 200){
      return response.data;
    }
  } catch (error) {
    throw error
  }
})


const destinoSlice = createSlice({
  name: 'destinoSlice',
  initialState: {
    destino: [],
    loading: false,
    error: null,
  },
  extraReducers: (buider) => {
    buider
      .addCase(getDestino.pending, (state) => {
        state.loading = true,
          state.error = null
      })
      .addCase(getDestino.fulfilled, (state, action) => {
        state.loading = false,
          state.destino = action.payload
      })
      .addCase(getDestino.rejected, (state, action) => {
        state.loading = false,
          state.error = action.error.message
      })
  }
})

const destinoReducer = destinoSlice.reducer
export default destinoReducer;