import { useContext, useEffect, useRef, useState } from "react";
import { Image, Text, TouchableOpacity, View, Animated, Dimensions, Platform } from "react-native"
import { useDispatch, useSelector } from "react-redux";
import { getDestino } from "../../slices/getDestinoSlice";
import { UserContext } from "../../context/UserContext";
import { InfoContext } from "../InfoContext";

const { height } = Dimensions.get('window');
const { width } = Dimensions.get('window');

export function Destino() {

  const [isExpanded, setIsExpanded] = useState(false);
  const [heightAnim] = useState(new Animated.Value(88));

  const destino = useSelector((state) => state.destino.destino)
  const dispatch = useDispatch()
  const contentRef = useRef(null);

  const { miInfo, setMiInfo } = useContext(InfoContext)
  const { userdata } = useContext(UserContext)

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
          toValue: Platform.OS === 'ios' ? height * 3 : height * 2.5, // Ajusta según tus necesidades
          //toValue: height + 480,
          duration: 100,
          useNativeDriver: false,
        }).start();
      });
    } else {
      setIsExpanded(false)
      // Cuando se colapsa, simplemente usa la altura mínima
      Animated.timing(heightAnim, {
        toValue: height * 0.1, // Altura mínima
        duration: 200,
        useNativeDriver: false,
      }).start();
    }
  }, [isExpanded]);

  useEffect(() => {
    dispatch(getDestino(userdata.contrato[0]))
  }, [])

  useEffect(() => {
    if (destino.length !== 0) {
      // Función para cambiar el valor de hotel id
        setMiInfo(prevState => ({
          ...prevState,
          hotelId: destino.hotelId
        }))
    }

  }, [destino])



  return (
    <Animated.View ref={contentRef} style={{ height: heightAnim, width: width * 0.9, backgroundColor: "white", marginTop: "5%", borderRadius: 10, padding: "2%", justifyContent: "flex-start", alignItems: "center" }}>
      <View style={{ width: width * 0.8, display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between", height: isExpanded ? 91 : "100%" }}>
        <View style={{ display: "flex", flexDirection: "row" }}>
          <View style={{ width: 48, height: 48, borderRadius: 10, backgroundColor: destino.length !== 0 ? "#FF3D00" : "#D2DCEB", alignItems: "center", justifyContent: "center" }}>
            <Image
              source={require('../../assets/destino.png')}
              style={{ width: 24, height: 24 }}
            />
          </View>
          <View style={{ marginLeft: 15, height: 48, alignItems: "flex-start", justifyContent: "center", }}>
            <Text style={{ color: "#564C71", fontWeight: "800", fontSize: 12, lineHeight: 14, marginBottom: 6 }}>
              Destino
            </Text>
            {
              destino?.destino ?
                <Text style={{ color: "#564C71", fontWeight: "400", fontSize: 16, lineHeight: 19 }}>
                  {destino.destino}
                </Text>
                :
                <Text style={{ color: "#564C71", fontWeight: "400", fontSize: 16, lineHeight: 19 }}>
                  Sin destino disponible.
                </Text>
            }
          </View>
        </View>
        <View>
          <View>
            {
              destino.length !== 0 ?
                <TouchableOpacity style={{ alignItems: 'center' }} onPress={toggleExpand}>
                  {/* Botón flecha */}
                  <Text>{isExpanded ? <Image source={require("../../assets/Not_more.png")} style={{ width: 24, height: 24 }} /> : <Image source={require("../../assets/expand_more.png")} style={{ width: 24, height: 24 }} />}</Text>
                </TouchableOpacity>
                : null
            }
          </View>
        </View>
      </View>
      {
        isExpanded &&  destino.length !== 0 ?
        <View style={{width:width * 0.8, height:95, borderRadius:20, borderWidth:1, borderColor:'#949AAF', justifyContent:'center', alignItems:'center'}}>
          <Text style={{fontWeight:'800', fontSize:12, lineHeight:14, textAlign:'center', marginBottom:10}}>
            Salida
          </Text>
          <Text style={{fontWeight:'700', fontSize:16, lineHeight:19, textAlign:'center'}}>
            {
              destino.salida
            }
          </Text>
        </View>
        :
        null
      }
    </Animated.View>
  )
}