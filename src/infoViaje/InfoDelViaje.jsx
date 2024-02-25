import { View, Text, StyleSheet, SafeAreaView } from "react-native";
import { Header } from "../muro/Header";


export function InfoDelViaje({ navigation }) {
	return (
		<SafeAreaView>
			<View style={styles.container}>
				<Header children="Informacion del viaje" navigation={navigation} />
				<Text>
					Contrato
				</Text>
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