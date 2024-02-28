import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { API_URL, token } from '../api';

export const verifyPas = createAsyncThunk('verifyPas', async(data)=>{
  try {
    const response = await axios.get(`${API_URL}/pasajero/verify/${data.dni}/${data.userdata.contrato[0]}`,{
      headers: {
        'x-access-token': `${token}`,
        "Content-Type": "application/json",
      }
    })
    if(response.status === 200){
      return response.data;
    }
  } catch (error) {
    return error.response.data
  }
})


const verifyPasajeroSlice = createSlice({
  name: 'verifyPasajeroSlice',
  initialState: {
    verifyPasajero: [],
    loading: false,
    error: null,
  },
  extraReducers: (buider) => {
    buider
      .addCase(verifyPas.pending, (state) => {
        state.loading = true,
          state.error = null
      })
      .addCase(verifyPas.fulfilled, (state, action) => {
        state.loading = false,
          state.verifyPasajero = action.payload
      })
      .addCase(verifyPas.rejected, (state, action) => {
        state.loading = false,
          state.error = action.error.message
      })
  }
})

const verifyPasajeroReducer = verifyPasajeroSlice.reducer
export default verifyPasajeroReducer;