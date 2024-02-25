import { View, Text, StyleSheet, SafeAreaView } from "react-native";
import { Header } from "../muro/Header";

export function EstadoDePagos({ navigation }) {
  return (
    <SafeAreaView>
      <View style={styles.container}>
        <Header children="Estado de pagos" navigation={navigation} />
        <Text>
          EstadoDePagos
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