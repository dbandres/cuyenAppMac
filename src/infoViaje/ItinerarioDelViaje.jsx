import { View, Text, StyleSheet, SafeAreaView, ScrollView, Image } from "react-native";
import { Header } from "../muro/Header";
import { useContext } from "react";
import { UserContext } from "../context/UserContext";

export function ItineratioDelViaje({ navigation }) {

	const { userdata } = useContext(UserContext)
	console.log(userdata);

	return (
		<SafeAreaView style={styles.container}>
			<View style={{justifyContent:"center", alignItems:"center"}}>
				<Header children="Itinerario de viaje" navigation={navigation} />
				<ScrollView>
					<View style={{ width: 360, height: 91, backgroundColor: "#FFFFFF", marginTop: 20, borderRadius: 10, alignItems: "center", justifyContent: "flex-start", display: "flex", flexDirection: "row", padding: 20 }}>
						<View style={{ width: 48, height: 48, borderRadius: 10, backgroundColor: "#FF3D00", alignItems: "center", justifyContent: "center" }}>
							<Image
								source={require('../assets/destino.png')}
								style={{ width: 24, height: 24 }}
							/>
						</View>
						<View style={{ marginLeft: 15, height: 48, alignItems: "center", justifyContent: "center" }}>
							<Text style={{ color: "#564C71", fontWeight: "800", fontSize: 12, lineHeight: 14, marginBottom: 6 }}>
								Destino
							</Text>
							<Text style={{ color: "#564C71", fontWeight: "400", fontSize: 16, lineHeight: 19 }}>
								destino
							</Text>
						</View>
					</View>
					<View style={{display:"flex", justifyContent:"center", alignItems:"center", marginBottom:10}}>
					<View style={{ width: 331, height: 88, backgroundColor: "#FFFFFF", borderRadius: 10, marginTop: 20, alignItems: "center", justifyContent: "flex-start", display: "flex", flexDirection: "row", padding: 20, marginBottom: 10 }}>
						<View style={{ width: 44, height: 44, borderRadius: 50, backgroundColor: "#3FA9F5", alignItems: "center", justifyContent: "center" }}>
							<Image
								source={require('../assets/info.png')}
								style={{ width: 20, height: 20 }}
							/>
						</View>
						<View style={{ height: 48, width: "85%", alignItems: "center", justifyContent: "center", marginLeft:10 }}>
							<Text style={{ color: "#564C71", fontWeight: "400", fontSize: 10, lineHeight: 12 }}>El día y horario de las excursiones puede varias según las condiciones climáticas o las necesidades de cada grupo.</Text>
						</View>
					</View>
					</View>
				</ScrollView>
			</View>
		</SafeAreaView>
	)
}


const styles = StyleSheet.create({
	container: {
		backgroundColor: "#D2DCEB",
		flex: 1,
		display: "flex",
	}
})