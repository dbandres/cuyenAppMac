import { View, Text, StyleSheet, SafeAreaView, ScrollView } from "react-native";
import { Header } from "../muro/Header";
import { Informacion } from "./componentes/Informacion";
import { Destino } from "./componentes/Destino";
import { Hotel } from "./componentes/Hotel";
import { Contingente } from "./componentes/Contingente";


export function InfoDelViaje({ navigation }) {
	return (
		<SafeAreaView style={{ flex: 1 }}>
			<ScrollView style={{ flex: 1, backgroundColor: "#D2DCEB" }}>
				<View style={styles.container}>
					<Header children="Informacion del viaje" navigation={navigation} />
					<Destino />
					<Informacion />
					<Contingente navigation={navigation} />
					<Hotel />
				</View>
			</ScrollView>
		</SafeAreaView>
	)
}

const styles = StyleSheet.create({
	container: {
		backgroundColor: "#D2DCEB",
		flex: 1,
		display: "flex",
		alignItems: "center"
	}
})