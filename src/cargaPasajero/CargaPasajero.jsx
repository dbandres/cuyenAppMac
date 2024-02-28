import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native"
import { Header } from "../muro/Header"
import { SafeAreaView } from "react-native-safe-area-context"
import { useContext, useEffect, useState } from "react"
import { Form } from "./Form"
import { UserContext } from "../context/UserContext";
import { useDispatch, useSelector } from "react-redux"
import { getPasajero } from "../slices/getPasajeroSlice"

export function CargaPasajero({ navigation }) {

	const [showForm, setShowForm] = useState(false)
	const { userdata } = useContext(UserContext)
	const dispatch = useDispatch()
	const pasajero =	useSelector((state) =>state.pasajero.pasajero, (prev, next) => prev === next)

	useEffect(()=>{
		dispatch(getPasajero(userdata.id))
	},[])

	const agregarPasajero = () => {
		setShowForm(!showForm)
	}

	console.log('PASAJERO: ',pasajero.length);
	return (
		<SafeAreaView style={{ flex: 1 }}>
			<ScrollView style={styles.container}>
				<View style={{
					flex: 1, display: "flex",
					alignItems: "center",
					justifyContent: "flex-start"
				}}>
					<Header
						children="Registro de pasajero"
						navigation={navigation}
					/>
					{
						pasajero.length !== 0 ?
						<>
							<Text>
								Pasajero nuevo
							</Text>	
						</>
						:
						null
					}	
					{
						showForm !== false ?
						<>
							<Form agregarPasajero={agregarPasajero}/>
						</>
						: null
					}
					<View style={{ height: 90 }}>
						<TouchableOpacity onPress={agregarPasajero} style={{ width: 331, height: 47, backgroundColor: "#FFFFFF", borderRadius: 10, top: 20, justifyContent: "center", alignItems: "center", }}>
							<Text style={{ color: "#334EA2", fontWeight: "600", fontSize: 12, lineHeight: 14, textAlign: "center" }}>
								Agregar Pasajero
							</Text>
						</TouchableOpacity>
					</View>
				</View>
			</ScrollView>
		</SafeAreaView>
	)
}

const styles = StyleSheet.create({
	container: {
		backgroundColor: "#D2DCEB",
		flex: 1,

	}
})
