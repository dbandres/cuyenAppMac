import { ScrollView, StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Header } from "../muro/Header";
import { useFocusEffect, useNavigation, useRoute } from "@react-navigation/native";
import { getPasajero } from "../slices/getPasajeroSlice";
import React, { useContext } from "react";
import { UserContext } from "../context/UserContext";
import { useDispatch, useSelector } from "react-redux";

export function EditarPasajero(){

  const pasajero = useSelector((state) => state.pasajero.pasajero)
  const loading = useSelector((state) => state.pasajero.loading)

  const navigation = useNavigation()
  const route = useRoute();
  const dispatch = useDispatch()

  const { userdata } = useContext(UserContext)
  const { id } = route.params;

  useFocusEffect(
    React.useCallback(() => {
      console.log('Pantalla enfocada Contingente. Puedes ejecutar operaciones aquí.');

      const data = {
        userdata: userdata.id,
        idPasajero: id
      }

      dispatch(getPasajero(data))
      // Puedes realizar otras operaciones aquí, como cargar datos, etc.
      return () => {
        // Este código se ejecuta cuando el componente se desenfoca o se desmonta
        console.log('Pantalla desenfocada. Limpieza o desmontaje aquí.');
      };
    }, []))

  const toggleExpand = () => {
    // Envía el índice del componente al padre para gestionar la expansión individual
    setIsExpanded(!isExpanded);
  };

  console.log(JSON.stringify(pasajero, null, 3));

  return(
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView style={styles.container}>
        <View
          style={{
            flex: 1, display: "flex",
            alignItems: "center",
            justifyContent: "flex-start"
          }}
        >
          <Header
						children="Editar pasajero"
						navigation={navigation}
					/>
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