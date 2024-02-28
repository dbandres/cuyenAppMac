import axios from 'axios';
import { RouteInto } from "../intoScreen/RouteInto";
import { useContext, useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { UserContext } from "../context/UserContext";
import { Login } from '../loginScreen/Login';
import { Register } from '../registerScreen/Register';
import { RegisterOk } from '../registerScreen/RegisterOk';
import { ForgotPassword } from '../forgotPass/ForgotPassword';
import { ForgotPassword1 } from '../forgotPass/ForgotPassword1';
import ForgotPassword2 from '../forgotPass/ForgotPassword2';
import { ForgotPassword3 } from '../forgotPass/ForgotPassword3';
import { FinishForgotPass } from '../forgotPass/FinishForgotPass';
import auth from "@react-native-firebase/auth";
import DrawerNavigator from './DrawerNavigator';


const { createStackNavigator } = require("@react-navigation/stack");

const Stack = createStackNavigator()
axios.defaults.baseURL = 'https://www.turismocuyen.com.ar'

export default function AuthNavigator() {

	//verificamos si el usser esta autenticado.
	const { setUserData } = useContext(UserContext)
	const [initializing, setInitializing] = useState(true)
	const [user, setUser] = useState(null)

	const showData = async () => {
		const data = await AsyncStorage.getItem("userStorage")
		const parseado = JSON.parse(data)
		if (parseado !== null) {
			setUserData({
				jwt: parseado.token,
        nombre: parseado.usuario.nombre,
        apellido: parseado.usuario.apellido,
        email: parseado.usuario.email,
        usuario: parseado.usuario.usuario,
        telefono: parseado.usuario.telefono,
        contrato: parseado.usuario.contrato,
        rol: parseado.usuario.rol,
        id: parseado.usuario.id
			})
		}
	}

	useEffect(() => {
		showData()
	}, [])

	function onAuthStateChange(user) {
		showData()
		setUser(user)
		if (initializing) setInitializing(false)
	}
	useEffect(() => {
		const subscribe = auth().onAuthStateChanged(onAuthStateChange)
		return subscribe
	}, [])
	if (initializing) return null;

	return (
		<Stack.Navigator
		>
			{
				user ?
					<Stack.Screen name="landing" component={DrawerNavigator} options={{ headerShown: false }} />
					:
					<>

						<Stack.Screen name="introScreen" component={RouteInto} options={{ headerShown: false }} />
						<Stack.Screen name="login" component={Login} options={{ headerShown: false }} />
						<Stack.Screen name="register" component={Register} options={{ headerShown: false }} />
						<Stack.Screen name="registerOk" component={RegisterOk} options={{ headerShown: false }} />
						<Stack.Screen name="forgotPass" component={ForgotPassword} options={{ headerShown: false }} />
						<Stack.Screen name="forgotPassOne" component={ForgotPassword1} options={{ headerShown: false }} />
						<Stack.Screen name="forgotPasstwo" component={ForgotPassword2} options={{ headerShown: false }} />
						<Stack.Screen name="forgotPassthree" component={ForgotPassword3} options={{ headerShown: false }} />
						<Stack.Screen name="finishForgotPass" component={FinishForgotPass} options={{ headerShown: false }} />
					</>
			}
		</Stack.Navigator>
	)
}