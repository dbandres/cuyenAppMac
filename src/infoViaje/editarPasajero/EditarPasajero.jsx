import { Dimensions, Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Header } from "../../muro/Header";
import { useFocusEffect, useNavigation, useRoute } from "@react-navigation/native";
import { getPasajero, resetPasajero } from "../../slices/getPasajeroSlice";
import React, { useContext, useState } from "react";
import { UserContext } from "../../context/UserContext";
import { useDispatch, useSelector } from "react-redux";
import { InfoXpasajero } from "../componentes/InfoXpasajero";
import { InfoPasajero } from "../../cargaPasajero/InfoPasajero";
import { EditarInfoText } from "./EditarInfoText";

const { height } = Dimensions.get('window');
const { width } = Dimensions.get('window');

export function EditarPasajero() {

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
        dispatch(resetPasajero())
      };
    }, []))

  // console.log(JSON.stringify(pasajero, null, 3));

  return (
    <SafeAreaView style={{ flex: 1, justifyContent: 'center' }}>
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
          <View style={{ height: 700, width: width * 0.9, backgroundColor: "white", marginTop: "5%", borderRadius: 10, padding: "2%", justifyContent: "flex-start", alignItems: "center", marginBottom: 10 }}>
            <View style={{ display: "flex", flexDirection: "row", justifyContent: "space-between", alignItems: "center", height: 80, width: "90%" }}>
              <View style={{ display: "flex", flexDirection: "row" }}>
                <View style={{ width: 48, height: 48, borderRadius: 10, backgroundColor: "#FFB800", alignItems: "center", justifyContent: "center" }}>
                  <Image
                    source={require('../../assets/attribution.png')}
                    style={{ width: 24, height: 24 }}
                  />
                </View>
                <View style={{ marginLeft: 15, height: 48, alignItems: "flex-start", justifyContent: "center" }}>
                  <Text style={{ color: "#564C71", fontWeight: "800", fontSize: 12, lineHeight: 14, marginBottom: 6 }}>
                    Pasajero
                  </Text>
                  <Text style={{ color: "#564C71", fontWeight: "400", fontSize: 16, lineHeight: 19 }}>
                    {pasajero[0].nombre}, {pasajero[0].apellido}
                  </Text>
                </View>
              </View>
            </View>
            <EditarInfoText
              pasajero={pasajero}
            />
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