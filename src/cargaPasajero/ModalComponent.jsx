import { Dimensions, Modal, Text, View } from "react-native";
import { ButtonCustom } from "../components/ButtomCustom";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../context/UserContext";
import { useDispatch, useSelector } from "react-redux";
import { pasajeroPost, resetPostPasajero } from "../slices/postPasajeroSlice";
import { useNavigation } from "@react-navigation/native";
import AwesomeAlert from "react-native-awesome-alerts";

const { height } = Dimensions.get('window');
const { width } = Dimensions.get('window');

export function ModalComponent({ visible, onClose, data, inputChanged, agregarPasajero }) {

  const [totalCuotas, setTotalCuotas] = useState("")
  const [fecha, setFecha] = useState("")
  const [showAlert2, setShowAlert2] = useState(false)
  const [importe, setImporte] = useState("")

  const { userdata } = useContext(UserContext)
  const postPasajero = useSelector((state) => state.postPasajero.postPasajero)
  const loading = useSelector((state) => state.postPasajero.loading)

  const dispatch = useDispatch()
  const navigation = useNavigation()

  const getAlert = () => {
    return (
      <AwesomeAlert
        show={loading}
        showProgress={true}
        progressColor="black"
        progressSize={50}
      />
    )
  }

  useEffect(() => {
    if (data) {
      setImporte(parseInt(data?.verifyPasajero?.monto))
      let total = parseInt(data?.verifyPasajero?.monto) / data?.cuotaSeleccionada
      setTotalCuotas(total.toFixed(2));
      if (data.importe) {
        let total = parseInt(data.importe) / data?.cuotas
        setTotalCuotas(total.toFixed(2));
      }
    }
    if (data.newDate) {
      const meses = {
        ene: 1, feb: 2, mar: 3, abr: 4, may: 5, jun: 6,
        jul: 7, ago: 8, sep: 9, oct: 10, nov: 11, dic: 12
      };

      const [dia, mes, año] = data.newDate.split('/');
      const numeroMes = meses[mes.toLowerCase()];
      const fechaFormateada = `${año}-${numeroMes}-${dia}`;

      setFecha(fechaFormateada);
    }
  }, [data])

  const pasPost = () => {
    const dato = {
      nombre: data.data.username,
      apellido: data.data.userlastname,
      dni: data.data.userdni,
      email: data.data.useremail,
      contrato: userdata.contrato,
      rol: "Pasajero",
      estado: true,
      login: "",
      fechaNac: fecha,
      importe: importe,
      cuotas: data.cuotaSeleccionada,
      loginId: userdata.id
    }
    dispatch(pasajeroPost(dato))
  }

  useEffect(()=>{
    if(postPasajero == '200'){
      onClose()
      dispatch(resetPostPasajero())
      navigation.navigate('Información del viaje')
    }
  },[postPasajero])

  console.log('post: ',postPasajero);

  const transparent = "rgba(0,0,0,0.5)"

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: transparent }}>
        <View style={{ borderRadius: 10, width: width * 0.95, height: height * 0.7, backgroundColor: "white", justifyContent: 'center', alignItems: 'center' }}>
          <View style={{ width: 275, height: height * 0.13, alignItems: "center", justifyContent: "center" }}>
            {
              data?.data ?
                <Text style={{ color: "#564C71", fontWeight: "500", fontSize: 16, lineHeight: 19, textAlign: "center" }}>
                  Se va a dar de alta el pasajero y se crearán las cuotas del viaje.
                  ¿Desea confirmar?
                </Text>
                :
                <Text style={{ color: "#564C71", fontWeight: "500", fontSize: 16, lineHeight: 19, textAlign: "center" }}>
                  Se cambiarán los datos del pasajero.
                  ¿Desea confirmar?
                </Text>
            }
          </View>
          <View style={{ width: 306, height: height * 0.32, justifyContent: "center", alignItems: "center", marginBottom: 10 }}>
            {
              data.data ?
                <>
                  <Text style={{ fontWeight: "700", fontSize: 12, color: "#949AAF", lineHeight: 30 }}>
                    {data?.data?.username}, {data?.data?.userlastname}
                  </Text>
                  <Text style={{ fontWeight: "700", fontSize: 12, color: "#949AAF", lineHeight: 30 }}>
                    DNI {data?.data?.userdni}
                  </Text>
                  <Text style={{ fontWeight: "700", fontSize: 12, color: "#949AAF", lineHeight: 30 }}>
                    Fecha de Nacimiento {data?.newDate}
                  </Text>
                  <Text style={{ fontWeight: "700", fontSize: 12, color: "#949AAF", lineHeight: 30 }}>
                    Importe ${importe.toLocaleString('es-ES', { style: 'decimal' })}
                  </Text>
                  <Text style={{ fontWeight: "700", fontSize: 12, color: "#949AAF", lineHeight: 30 }}>
                    Cuotas {data?.cuotaSeleccionada} de ${totalCuotas}
                  </Text>
                </>
                :
                <>
                  <Text style={{ fontWeight: "700", fontSize: 12, color: "#949AAF", lineHeight: 30 }}>
                    {data?.formValues?.nombre}, {data?.formValues?.apellido}
                  </Text>
                  <Text style={{ fontWeight: "700", fontSize: 12, color: "#949AAF", lineHeight: 30 }}>
                    DNI {data?.formValues?.dni}
                  </Text>
                  <Text style={{ fontWeight: "700", fontSize: 12, color: "#949AAF", lineHeight: 30 }}>
                    Fecha de Nacimiento {data?.formValues?.fechaNac}
                  </Text>
                  <Text style={{ fontWeight: "700", fontSize: 12, color: "#949AAF", lineHeight: 30 }}>
                    Importe ${data?.importe}
                  </Text>
                  <Text style={{ fontWeight: "700", fontSize: 12, color: "#949AAF", lineHeight: 30 }}>
                    Cuotas {data?.cuotas} de {totalCuotas}
                  </Text>
                </>
            }
          </View>
          <View style={{ height: height * 0.075, width: 331, borderRadius: 10, marginBottom: 5 }}>
            <ButtonCustom
              text="Aceptar"
              color="#FF3D00"
              register={false}
              onPress={pasPost}
            />
          </View>
          <View style={{ borderColor: "#334EA2", height: height * 0.075, width: 331, borderRadius: 10, borderWidth: 1 }}>
            <ButtonCustom
              text="Cancelar"
              color="#FFFF"
              register={true}
              onPress={onClose}
            />
          </View>
        </View>
      </View>
      {loading ? getAlert() : null}
    </Modal>
  )
}