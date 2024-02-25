import {applyMiddleware, configureStore} from "@reduxjs/toolkit"
import promoReducer from "../slices/ejemploSlice"
import infoReducer from "../slices/infoImportante"
import formContactReducer from "../slices/contactFormSlice"
import { thunk } from "redux-thunk"
import loginReducer from "../slices/loginSlice"
import contratosReducer from "../slices/numeroContrato"
import registerReducer from "../slices/registerSlice"
import forgotPassReducer from "../slices/forgotPass"

export const store = configureStore({
  reducer:{
    promo: promoReducer,
    info: infoReducer,
    formContact: formContactReducer,
    login: loginReducer,
    contratos: contratosReducer,
    register: registerReducer,
    forgotPass: forgotPassReducer
  }
}, applyMiddleware(thunk))