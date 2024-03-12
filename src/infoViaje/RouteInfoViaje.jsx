import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import { createStackNavigator } from '@react-navigation/stack';
import { ItineratioDelViaje } from "./ItinerarioDelViaje";
import { InfoDelViaje } from "./InfoDelViaje";
import { EstadoDePagos } from "./EstadoDePagos";
import { Image, Text, View } from "react-native";
import { CargaPasajero } from "../cargaPasajero/CargaPasajero";

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

export const RouteInfoViaje = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarLabel: ({ focused, color }) => {
          const formattedName = route.name === 'Información del viaje'
            ? 'Información\n del viaje' // Agrega el salto de línea para esta pestaña
            : route.name === 'Itinerario del viaje'
              ? 'Itinerario\n del viaje'
              : route.name === 'Estado de pagos'
                ? 'Estado\n de pagos'
                : route.name;

          return (
            <Text style={{
              color: focused ? '#FF3D00' : '#FFFFFF',
              fontSize: 12,
              textAlign: 'center',
              height: 30,
              fontWeight: focused ? "700" : "400"
              // Agrega cualquier otro estilo necesario aquí
            }}>
              {formattedName}
            </Text>
          );
        },
        tabBarIcon: ({focused}) => {
          let iconName;

          if (route.name === 'Contrato') {
            iconName = <Image source={require(`../assets/contract.png`)} style={{width:24, height:24}}/>;
          }
          else if(route.name === 'Información del viaje'){
            iconName = <Image source={require(`../assets/concierge.png`)} style={{width:24, height:24}}/>;
          }
          else if(route.name === 'Itinerario del viaje'){
            iconName = <Image source={require(`../assets/airport_shuttle.png`)} style={{width:24, height:24}}/>;
          }
          else{
            iconName = <Image source={require(`../assets/account_balance_wallet.png`)} style={{width:24, height:24}}/>;
          }
          // Agrega más condiciones según las otras pestañas

          return (
            <View style={{ alignItems: 'center' }}>
              {iconName}
            </View>
          );
        },
        tabBarStyle: {
          height: 85, // Ajusta la altura
          paddingBottom: 20,
          backgroundColor: "#162962",
        },
      })}
    >
      <Tab.Screen name="Información del viaje" component={InfoDelViaje} options={{ headerShown: false }} />
      <Tab.Screen name="Itinerario del viaje" component={ItineratioDelViaje} options={{ headerShown: false }} />
      <Tab.Screen name="Estado de pagos" component={EstadoDePagos} options={{ headerShown: false }} />
    </Tab.Navigator>
  )
}

export function Stack1Navigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="CargaPasajero" component={CargaPasajero} options={{ headerShown: false }}/>
    </Stack.Navigator>
  );
}