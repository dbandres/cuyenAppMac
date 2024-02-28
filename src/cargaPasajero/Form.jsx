import { Text, TouchableOpacity, View, Animated, Image, Dimensions, Platform } from "react-native";
import { useForm } from "react-hook-form";
import { useContext, useEffect, useRef, useState } from "react";
import CheckBox from "@react-native-community/checkbox";
import axios from "axios";
import AwesomeAlert from "react-native-awesome-alerts";
import DatePicker from 'react-native-date-picker'
import { UserContext } from "../context/UserContext";
import { CustomInput } from "../intoScreen/CustomInput";
import { ButtonCustom } from "../components/ButtomCustom";
import { verifyPas } from "../slices/verifyPasajero";
import { useDispatch, useSelector } from "react-redux";
import { ModalComponent } from "./ModalComponent";

const { height } = Dimensions.get('window');
const { width } = Dimensions.get('window');

export function Form({ agregarPasajero }) {

  const { control, handleSubmit, setValue, watch, trigger } = useForm()
  const [itemsArray, setItemsArray] = useState([1])
  const [toggleCheckBox, setToggleCheckBox] = useState(false)
  const [showAlert2, setShowAlert2] = useState(false)
  const { userdata } = useContext(UserContext)
  const [dataPasajero, setDataPasajero] = useState("")

  let dni = watch('userdni'); // Observa el campo del DNI

  const [date, setDate] = useState(new Date())
  const [open, setOpen] = useState(false)
  const [newDate, setNewDate] = useState("")

  const [heightAnim] = useState(new Animated.Value(50)); // Inicia con la altura mínima
  const contentRef = useRef(null);
  const [isExpanded, setIsExpanded] = useState(false);
  const [cuotaSeleccionada, setCuotaSeleccionada] = useState(null);
  const fechaMax = new Date(2019, 0, 1);
  const fechaMin = new Date(2000, 0, 1)

  const [modalVisible, setModalVisible] = useState(false);
  const [datosTotales, setDatosTotales] = useState({})

  const dispatch = useDispatch()
  const verifyPasajero = useSelector((state) => state.verifyPasajero.verifyPasajero)
  const load = useSelector((state) => state.verifyPasajero.loading)


  const openModal = () => {
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
  };


  const getAlert = () => {
    return (
      <AwesomeAlert
        show={load}
        showProgress={true}
        progressColor="black"
        progressSize={50}
      />
    )
  }

  const handleCuotaPress = (cuota) => {
    setCuotaSeleccionada(cuota);
    setIsExpanded(!isExpanded)
  };

  const handleSubmitcarga = (data) => {
    setDatosTotales({ data, cuotaSeleccionada, newDate, verifyPasajero })
    openModal();
  }

  console.log(datosTotales);

  useEffect(() => {
    const data = { dni, userdata }
    if (dni !== undefined && dni.length === 8) {
      //  setShowAlert2(true)
      dispatch(verifyPas(data))
    } else {
      console.log("es undefined");
    }
  }, [dni])

  useEffect(() => {
    if (date.getFullYear() < 2024) {
      console.log(date.getFullYear());
      // Dividir la cadena por la barra "/"
      // Crear un objeto Date
      const fechaObjeto = new Date(date);

      // Obtener el nombre abreviado del mes
      const mesesAbreviados = [
        "ene", "feb", "mar", "abr", "may", "jun",
        "jul", "ago", "sep", "oct", "nov", "dic"
      ];
      const nombreMesAbreviado = mesesAbreviados[fechaObjeto.getUTCMonth()];

      // Formatear la fecha en el formato deseado
      const fechaFormateada = `${fechaObjeto.getUTCDate()}/${nombreMesAbreviado}/${fechaObjeto.getUTCFullYear()}`;
      setNewDate(fechaFormateada)
    }
  }, [date])

  useEffect(() => {
    if (isExpanded) {
      // Mide la altura del contenido cuando se expande
      contentRef.current.measure((x, y, width, height) => {
        Animated.timing(heightAnim, {
          toValue: 165, // Ajusta según tus necesidades
          //toValue: height + 480,
          duration: 100,
          useNativeDriver: false,
        }).start();
      });
    } else {
      setIsExpanded(false)
      // Cuando se colapsa, simplemente usa la altura mínima
      Animated.timing(heightAnim, {
        toValue: 50, // Altura mínima
        duration: 300,
        useNativeDriver: false,
      }).start();
    }
  }, [isExpanded]);

  const toggleExpand = () => {
    // Envía el índice del componente al padre para gestionar la expansión individual
    setIsExpanded(!isExpanded);
  };

  return (
    <View style={{ width: width * 0.95, height: isExpanded === true ? 850 : 758, backgroundColor: "#FFFFFF", marginTop: 15, borderRadius: 10, justifyContent: "center", alignItems: "center" }}>
      <View style={{ height: 50 }}>
        <Text style={{ color: "#334EA2", fontWeight: "500", fontSize: 16 }}>
          Datos del pasajero
        </Text>
      </View>
      <View style={{ width: 330, justifyContent: "center", alignItems: "center" }}>
        <CustomInput
          control={control}
          trigger={trigger}
          placeholder="Ingresa tu DNI"
          name="userdni"
          numeric="numeric"
          rules={{
            required: true,
            pattern: { value: /^[0-9]+$/, message: "El DNI es incorrecto" },
            minLength: {
              value: 7,
              message: "El DNI ingresado no es válido."
            },
            maxLength: {
              value: 8,
              message: "El DNI ingresado no es válido."
            }
          }}
        />
        <CustomInput
          control={control}
          name="username"
          placeholder="Nombre"
          trigger={trigger}
          rules={{
            required: true,
            pattern: { value: /^[a-zA-ZáéíóúÁÉÍÓÚüÜñÑ\s]+$/, message: "El Nombre es incorrecto" },
            minLength: {
              value: 2,
              message: "El Nombre no es válido."
            },
            maxLength: {
              value: 15,
              message: "El Nombre no es válido."
            }
          }}
        />
        <CustomInput
          control={control}
          name="userlastname"
          placeholder="Apellido"
          trigger={trigger}
          rules={{
            required: true,
            pattern: { value: /^[a-zA-ZáéíóúÁÉÍÓÚüÜñÑ\s]+$/, message: "El Apellido es incorrecto" },
            minLength: {
              value: 2,
              message: "El Apellido no es válido."
            },
            maxLength: {
              value: 15,
              message: "El Apellido no es válido."
            }
          }}
        />
        <View style={{
          width: "100%",
          flexDirection: 'row',
          alignItems: 'center',
          borderWidth: 1,
          borderColor: '#CDD1DF',
          borderRadius: 10,
          height: 50,
          marginBottom: 20,
        }}>
          <TouchableOpacity style={{ width: "100%", display: "flex", flexDirection: "row", alignItems: "center" }} onPress={() => setOpen(true)}>
            <Image source={require("../assets/calendar_month.png")} style={{ width: 20, height: 19, marginLeft: 5 }} />
            {
              newDate ?
                <Text style={{
                  paddingLeft: 10,
                  alignItems: "center",
                  fontWeight: "600",
                  fontSize: 14,
                  lineHeight: 16,
                  borderRadius: 8,
                  color: "#564C71"
                }}>
                  {newDate}
                </Text>
                :
                <Text style={{
                  paddingLeft: 10,
                  alignItems: "center",
                  fontWeight: "600",
                  fontSize: 14,
                  lineHeight: 16,
                  borderRadius: 8,
                  color: "#CDD1DF",
                  marginLeft: 2
                }}>
                  Fecha de nacimiento
                </Text>
            }
          </TouchableOpacity>
          <DatePicker
            modal
            open={open}
            date={date}
            onConfirm={(date) => {
              setOpen(false);
              setDate(date);
            }}
            onCancel={() => {
              setOpen(false);
            }}
            mode="date"
            title="Seleccione su fecha de nacimiento"
            confirmText="Confirmar"
            cancelText="Cancelar"
            locale="es"
            maximumDate={fechaMax}
            minimumDate={fechaMin}
          />
        </View>
        <CustomInput
          control={control}
          name="useremail"
          placeholder="Email"
          trigger={trigger}
          rules={{
            required: true,
            pattern: { value: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/, message: "El Email ingresado no es válido." }
          }}
        />
        <View style={{
          width: "100%",
          flexDirection: 'row',
          alignItems: 'center',
          borderWidth: 1,
          borderColor: '#CDD1DF',
          borderRadius: 10,
          height: 50,
          padding: 5,
          marginBottom: 20

        }}>
          <Image
            source={require("../assets/attach_money.png")}
            style={{ width: 10, height: 18 }}
          />
          <Text style={{ color: "#564C71", marginLeft: 5 }}>
            {verifyPasajero.monto}
          </Text>
        </View>
        <View>
          <Animated.View ref={contentRef} style={{
            height: heightAnim, width: 331, backgroundColor: "white", borderRadius: 10, padding: "2%", justifyContent: "space-between", alignItems: "flex-start", flexDirection: 'column',
            borderWidth: 1,
            borderColor: '#CDD1DF',
          }}>
            <View style={{ width: "100%", justifyContent: "space-between", display: "flex", flexDirection: "row", borderBottomWidth: isExpanded === true ? 1 : 0, borderColor: "#CDD1DF" }}>
              <View style={{ width: "80%", height: 30, justifyContent: "flex-start", display: "flex", flexDirection: "row", alignItems: "center" }}>
                <Image source={require("../assets/request_quote.png")} style={{ width: 16, height: 20 }} />
                {
                  cuotaSeleccionada ?
                    <Text style={{ color: "#564C71", fontWeight: "600", fontSize: 14, lineHeight: 16, marginLeft: 7 }}>
                      {cuotaSeleccionada === 1 ? cuotaSeleccionada + " Cuota" : cuotaSeleccionada + " Cuotas"}
                    </Text>
                    :
                    <Text style={{ color: "#CDD1DF", fontWeight: "600", fontSize: 14, lineHeight: 16, marginLeft: 7 }}>
                      Cantidad de cuotas
                    </Text>
                }
              </View>
              <TouchableOpacity onPress={toggleExpand} style={{ alignItems: 'center', top: Platform.OS === 'ios' ? 10 : 0 }}>
                {/* Botón flecha */}
                <Text>{isExpanded ? <Image source={require("../assets/Not_more.png")} style={{ width: 24, height: 24 }} /> : <Image source={require("../assets/expand_more.png")} style={{ width: 24, height: 24 }} />}</Text>
              </TouchableOpacity>
            </View>
            <View style={{ width: "100%", height: "80%", marginTop: 10 }}>
              {
                isExpanded === true && verifyPasajero.length !== 0 ?
                  verifyPasajero.cuotas.map((cuota, index) => (
                    cuota === 1 ?
                      <TouchableOpacity onPress={() => handleCuotaPress(cuota)} key={index} style={{ backgroundColor: cuota === cuotaSeleccionada ? "#E5EBFF" : null, borderRadius: 10, height: 24, justifyContent: "center" }}>
                        <Text style={{ fontWeight: "600", fontSize: 14, lineHeight: 16, color: cuota === cuotaSeleccionada ? "#564C71" : "#CDD1DF", marginLeft: 5 }}>
                          {cuota} Cuota
                        </Text>
                      </TouchableOpacity>
                      :
                      <TouchableOpacity onPress={() => handleCuotaPress(cuota)} key={index} style={{ backgroundColor: cuota === cuotaSeleccionada ? "#E5EBFF" : null, borderRadius: 10, height: 24, justifyContent: "center" }}>
                        <Text style={{ fontWeight: "600", fontSize: 14, lineHeight: 16, color: cuota === cuotaSeleccionada ? "#564C71" : "#CDD1DF", marginLeft: 5 }}>
                          {cuota} Cuotas
                        </Text>
                      </TouchableOpacity>
                  ))
                  :
                  null
              }
            </View>
          </Animated.View>
        </View>
        <View style={{ height: "5%", display: "flex", flexDirection: "row", marginTop: 15 }}>
          <View>
            <CheckBox
              disabled={false}
              value={toggleCheckBox}
              onValueChange={(newValue) => setToggleCheckBox(newValue)}
              tintColors={true ? "black" : "black"}
            />
          </View>
          <View style={{ marginLeft: "3%" }}>
            <Text style={{ fontSize: 12, color: "#949AAF" }}>
              Estoy de acuerdo con los
            </Text>
            <Text style={{ fontWeight: "bold", fontSize: 11.5, color: "#949AAF" }}>
              Términos de Servicios y Política de privacidad.
            </Text>
          </View>
        </View>
        <View style={{ height: 47, width: 331, marginTop: "5%" }}>
          <ButtonCustom
            disabled={toggleCheckBox === true ? false : true}
            text="Agregar"
            color={toggleCheckBox === true ? "#FF3D00" : "#CDD1DF"}
            onPress={handleSubmit(handleSubmitcarga)}
          />
        </View>

        <ModalComponent
          visible={modalVisible} onClose={closeModal} data={datosTotales} agregarPasajero={agregarPasajero}
        />

        <View style={{ height: 47, width: 331, marginTop: "2%", borderColor: "#3462BF", borderWidth: 1, borderRadius: 10 }}>
          <ButtonCustom
            text="Cancelar"
            color="#FFFFFF"
            register={true}
            onPress={agregarPasajero}
          />
        </View>
      </View>
      {load === true ? getAlert() : null}
    </View>
  )
}