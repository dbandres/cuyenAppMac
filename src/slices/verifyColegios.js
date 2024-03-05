import { createSlice, createAsyncThunk, isRejectedWithValue } from '@reduxjs/toolkit';
import axios from 'axios';
import { API_URL, token } from '../api';

export const resetcolegioVerify = () => ({
  type: 'colegioVerify/reset'
});

export const postVerifyColegio = createAsyncThunk('postVerifyColegio', async (data) => {
  try {
    console.log('data... ',data);
    const response = await axios.post(`${API_URL}/colegios/verify`,
      {
        contrato: data.contrato,
        colegio: data.colegioSeleccionado.nombre
      },
      {
        headers: {
          'x-access-token': `${token}`,
          "Content-Type": "application/json",
        }
      })
    .then((res)=>{
      return res.status
    })
  } catch (error) {
    throw error
  }
})


const verifycolegioSlice = createSlice({
  name: 'colegioVerify',
  initialState: {
    colegioVerify: '',
    loading: false,
    error: null,
  },
  reducers: {
    resetColegioVerifyState: (state) => {
      state.colegioVerify = '';
      state.loading = false;
      state.error = null;
    }
  },
  extraReducers: (buider) => {
    buider
      .addCase(postVerifyColegio.pending, (state) => {
        state.loading = true,
          state.error = null
      })
      .addCase(postVerifyColegio.fulfilled, (state, action) => {
        state.loading = false,
          state.colegioVerify = action.payload
      })
      .addCase(postVerifyColegio.rejected, (state, action) => {
        state.loading = false,
          state.error = 'No hay ningun contrato para ese colegio.';
      })
  }
})

const colegioVerifyReducer = verifycolegioSlice.reducer
export const { resetColegioVerifyState } = verifycolegioSlice.actions;
export default colegioVerifyReducer;