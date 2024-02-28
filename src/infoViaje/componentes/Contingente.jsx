import { useFocusEffect } from "@react-navigation/native";
import React, { useContext, useEffect, useRef, useState } from "react";
import { Image, Text, TouchableOpacity, View, Animated, Dimensions } from "react-native"
import { useDispatch, useSelector } from "react-redux";
import { UserContext } from "../../context/UserContext";

const { height } = Dimensions.get('window');
const { width } = Dimensions.get('window');

export function Contingente({ navigation }) {

  const [isExpanded, setIsExpanded] = useState(false);
  const [heightAnim] = useState(new Animated.Value(88));

  const contentRef = useRef(null);
  const { userdata } = useContext(UserContext)
  const dispatch = useDispatch()

  const [newValue, setNewValue] = useState("")
  const [expandedStates, setExpandedStates] = useState(false);
  const [isAnyExpanded, setIsAnyExpanded] = useState(false);

  useFocusEffect(
    React.useCallback(() => {
      console.log('Pantalla enfocada Contingente. Puedes ejecutar operaciones aquí.');

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

  useEffect(() => {
    if (isExpanded) {
      // Mide la altura del contenido cuando se expande
      contentRef.current.measure((x, y, width, height) => {
        console.log("he: ", height)
        Animated.timing(heightAnim, {
          toValue: newValue === "" ? 0 * 80 + 200 : newValue, // Ajusta según tus necesidades
          //toValue: height + 480,
          duration: 100,
          useNativeDriver: false,
        }).start();
      });
    } else {
      setIsExpanded(false)
      expandedHijo("")
      // Cuando se colapsa, simplemente usa la altura mínima
      Animated.timing(heightAnim, {
        toValue: height * 0.1, // Altura mínima
        duration: 200,
        useNativeDriver: false,
      }).start();
    }
  }, [isExpanded, newValue]);

  const agregarPasajero = () => {
    navigation.navigate('carga-pasajero');
    toggleExpand()
  }

  const expandedHijo = (value) => {
    setNewValue(value)
  }

  const handleItemPress = (index) => {
    console.log("Se presionó el elemento en el índice:", index);
    // Realiza cualquier otra acción que desees con el índice aquí
    const newExpandedStates = [...expandedStates];
    newExpandedStates[index] = !newExpandedStates[index];
    setExpandedStates(newExpandedStates);

    // Verificar si algún componente está expandido
    const anyExpanded = newExpandedStates.some((expanded) => expanded);
    setIsAnyExpanded(anyExpanded);
  };


  return (
    <Animated.View ref={contentRef} style={{ height: heightAnim, width: width * 0.9, backgroundColor: "white", marginTop: "5%", borderRadius: 10, padding: "2%", justifyContent: "flex-start", alignItems: "center" }}>
      <View style={{ width: width * 0.8, display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between", height: isExpanded ? 91 : "100%" }}>
        <View style={{ display: "flex", flexDirection: "row" }}>
          <View style={{ width: 48, height: 48, borderRadius: 10, backgroundColor: "#FF3D00", alignItems: "center", justifyContent: "center" }}>
            <Image
              source={require('../../assets/contingente.png')}
              style={{ width: 24, height: 24 }}
            />
          </View>
          <View style={{ marginLeft: 15, height: 48, alignItems: "flex-start", justifyContent: "center", }}>
            <Text style={{ color: "#564C71", fontWeight: "800", fontSize: 12, lineHeight: 14, marginBottom: 6 }}>
              Contingente
            </Text>
            <Text style={{ color: "#564C71", fontWeight: "400", fontSize: 16, lineHeight: 19 }}>
              Pasajeros
            </Text>
          </View>
        </View>
        <View>
          <View>
            <TouchableOpacity style={{ alignItems: 'center' }} onPress={toggleExpand}>
              {/* Botón flecha */}
              <Text>{isExpanded ? <Image source={require("../../assets/Not_more.png")} style={{ width: 24, height: 24 }} /> : <Image source={require("../../assets/expand_more.png")} style={{ width: 24, height: 24 }} />}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
      {
        isExpanded &&
        <>
          <View style={{ height: 70 }}>
            <TouchableOpacity onPress={agregarPasajero} style={{ width: width * 0.8, height: 47, backgroundColor: "#FFFFFF", borderRadius: 10, top: 25, justifyContent: "center", alignItems: "center", borderWidth: 1, borderColor: "#334EA2" }}>
              <Text style={{ color: "#334EA2", fontWeight: "600", fontSize: 12, lineHeight: 14, textAlign: "center" }}>
                Agregar Pasajero +
              </Text>
            </TouchableOpacity>
          </View>
        </>
      }
    </Animated.View>
  )
}