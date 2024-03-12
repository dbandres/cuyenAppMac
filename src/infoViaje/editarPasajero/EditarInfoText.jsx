import { Dimensions, Text, TouchableOpacity, View } from "react-native";
import { InfoPasajero } from "../../cargaPasajero/InfoPasajero";
import { useState } from "react";
import { FormEditarDatos } from "./FormEditarDatos";


const { height } = Dimensions.get('window');
const { width } = Dimensions.get('window');

export function EditarInfoText({ pasajero }) {

  const [seteoData, setSeteoData] = useState(false)
  const [editing, setEditing] = useState(false)
  const [inputChanged, setInputChanged] = useState(false);
  const [newDate, setNewDate] = useState("")

  const [formValues, setFormValues] = useState({
    dni: pasajero[0].dni,
    nombre: pasajero[0].nombre,
    apellido: pasajero[0].apellido,
    fechaNac: pasajero[0].fechaNac,
  });
  const [adjuntos] = useState({
    ficha_med: pasajero[0].ficha_med,
    dec_jurada: pasajero[0].dec_jurada,
    image_dni: pasajero[0].image_dni,
    obra_soc: pasajero[0].obra_soc
  })


  const changeInputs = () => {
    setSeteoData(true)
    setEditing(true)
    setFormValues({
      dni: pasajero[0].dni,
      nombre: pasajero[0].nombre,
      apellido: pasajero[0].apellido,
      fechaNac: pasajero[0].fechaNac,
    })
  }

  const changeInputsCancel = () => {
    setSeteoData(false)
    setEditing(false)
    setInputChanged(false)
    setFormValues({
      dni: '',
      nombre: '',
      apellido: '',
      fechaNac: '',
    })
    setNewDate("")
  }

  return (
    <View style={{ justifyContent: "center", alignItems: 'center' }}>
      {
        editing === false ?
          <View style={{ width: width * 0.8, justifyContent: "center", alignItems: 'center' }}>
            <InfoPasajero
              info={pasajero[0]}
            />
          </View>
          :
          <FormEditarDatos
            info={pasajero[0]}
            setInputChanged={setInputChanged}
            formValues={formValues}
            setFormValues={setFormValues}
            newDate={newDate}
            setNewDate={setNewDate}
          />
      }
      {
        seteoData === false ?
          <TouchableOpacity onPress={changeInputs} style={{ width: width * 0.8, height: 47, borderRadius: 10, borderWidth: 1, borderColor: "#334EA2", justifyContent: "center", alignItems: "center" }}>
            <Text style={{ fontWeight: "600", fontSize: 12, lineHeight: 14, color: "#334EA2" }}>
              Editar datos
            </Text>
          </TouchableOpacity>
          :
          <>
            <TouchableOpacity disabled={inputChanged === true || newDate.length !== 0 ? false : true} style={{ width: width * 0.8, height: 47, borderRadius: 10, justifyContent: "center", alignItems: "center", backgroundColor: inputChanged === true || newDate.length !== 0 ? "#FF3D00" : "#CDD1DF", marginBottom: 15, marginTop: 10 }}>
              <Text style={{ fontWeight: "600", fontSize: 12, lineHeight: 14, color: "#FFFFFF" }}>
                Guardar cambios
              </Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={changeInputsCancel} style={{ width: width * 0.8, height: 47, borderRadius: 10, borderWidth: 1, borderColor: "#334EA2", justifyContent: "center", alignItems: "center" }}>
              <Text style={{ fontWeight: "600", fontSize: 12, lineHeight: 14, color: "#334EA2" }}>
                Cancelar
              </Text>
            </TouchableOpacity>
          </>
      }
    </View>
  )
}