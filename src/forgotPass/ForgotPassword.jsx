import { View, Text } from "react-native";
import { ContainerWithBackground } from "../components/ContainerWithBackground";
import { InputLogin } from "../loginScreen/InputLogin";
import { useForm } from "react-hook-form";
import { ButtonCustom } from "../components/ButtomCustom";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { postResetPassForm } from "../slices/forgotPass";
import AwesomeAlert from "react-native-awesome-alerts";

export function ForgotPassword({navigation}) {

  const dispatch = useDispatch()
  const { control, handleSubmit, setValue, watch } = useForm()
  const [inputValue, setInputValue] = useState(false)
  const [showAlert2, setShowAlert2] = useState(false)
  const [showAlert, setShowAlert] = useState(false)

  const dataForgot = useSelector((state) => state.forgotPass.forgotPas)
	const errorLogin = useSelector((state) => state.forgotPass.error)
	const loadingLogin = useSelector((state) => state.forgotPass.loading)

  const getAlert = () => {
		return (
			<AwesomeAlert
				show={showAlert2}
				showProgress={true}
				progressColor="black"
				progressSize={50}
			/>
		)
	}

  const showAlerts = (show, setShow, titulo, msg, text) => {
		return (
			<AwesomeAlert
				show={show}
				showProgress={false}
				title={titulo}
				message={msg}
				closeOnTouchOutside={true}
				closeOnHardwareBackPress={false}
				showConfirmButton={true}
				confirmText={text}
				confirmButtonColor="#DD6B55"
				onConfirmPressed={() => setShow(false)}
			/>
		);
	}

  useEffect(() => {
		const dniValue = watch("dniUser");
		if(dniValue){
			setInputValue(true)
		}else{
      setInputValue(false)
    }
	}, [watch("dniUser")])

  useEffect(()=>{
		if(loadingLogin === true && errorLogin === null){
			setShowAlert2(true)
		}
		else if(errorLogin !== null){
			setShowAlert2(false)
			setShowAlert(true)
		}else if(dataForgot.length !== 0){
      setShowAlert2(false)
      navigation.navigate("forgotPassOne", {
        datos: {
          jwt: dataForgot.token,
          idUser: dataForgot.idUsuario,
          numAleatorio: dataForgot.numeroAleatorio,
          email: dataForgot.email
        }
      })
    }
	},[errorLogin, loadingLogin, dataForgot])



  const recuperarContraseña = (data) =>{
    dispatch(postResetPassForm(data))
  }

  console.log(dataForgot);

  return (
    <ContainerWithBackground>
      <View style={{ height: 450, width: "100%", alignItems: "center" }}>
        <View style={{ height: "100%", width: "90%", justifyContent: "center", top: 80, alignItems: "center" }}>
          <Text style={{ color: "#334EA2", fontSize: 16, fontWeight: "500", lineHeight: 19, marginBottom: "15%" }}>
            Recupero de contraseña
          </Text>
          <Text style={{ fontSize: 12, fontWeight: "600", lineHeight: 14, color: "#949AAF", marginBottom: "10%" }}>
            Ingrese el DNI con el que se creó su cuenta.
          </Text>
          <InputLogin
            control={control}
						placeholder="DNI"
						name="dniUser"
						numeric="numeric"
						secureTextEntry={true}
          />
          <View style={{ top: 70, width: "100%" }}>
						<View style={{ height: "22%", width: "100%" }}>
							<ButtonCustom
								text="Continuar"
								color={inputValue !== false ? "#FF3D00" : "#CDD1DF"}
								disabled={inputValue !== false ? false : true}
								onPress={handleSubmit(recuperarContraseña)}
							/>
						</View>
						<View style={{ height: "22%", marginTop: "2%", width: "100%", borderColor: "#3462BF", borderWidth: 1, borderRadius: 10 }}>
							<ButtonCustom
								text="volver"
								color="#FFFFFF"
								register={true}
								onPress={() => { navigation.navigate("register") }}
							/>
						</View>
					</View>
        </View>
      </View>
      {showAlerts(showAlert, setShowAlert, "Error!", "Es posible que el DNI ingresado sea incorrecto o no este registrado, verifícalo", "Ok")}
      {showAlert2 ? getAlert() : null}
    </ContainerWithBackground>
  )
}