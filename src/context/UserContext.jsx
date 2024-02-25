import { createContext, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const UserContext = createContext();

export function UserProvider({ children }) {
    const [userdata, setUserData] = useState({
        jwt: "",
        nombre: "",
        apellido: "",
        email: "",
        usuario: "",
        telefono: "",
        contrato: "",
        rol: ""
    });

    const setDataUser = (data) => {
        if(data){
					setUserData({
            jwt: data.token || '',
            nombre: data.usuario.nombre || '',
            apellido: data.usuario.apellido || '',
            email: data.usuario.email || '',
            usuario: data.usuario.usuario || '',
            telefono: data.usuario.telefono || '',
            contrato: data.usuario.contrato || '',
            rol: data.usuario.rol
        })
        AsyncStorage.setItem('userStorage', JSON.stringify(data))
				}else{
					console.log('No hay data');
				}
    }

		console.log(userdata);

    return (
        <UserContext.Provider value={{ userdata, setDataUser }}>
            {children}
        </UserContext.Provider>
    )
}