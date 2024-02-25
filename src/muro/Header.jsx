import { View, TouchableOpacity, Image, Text, StyleSheet, Dimensions } from "react-native"
import LinearGradient from "react-native-linear-gradient"

const Height = Dimensions.get("screen").height

export const Header = ({ children, navigation, noGoBack }) => {

  const openDrawer = () => {
    navigation.openDrawer();
  };

  const goBack = () => {
    navigation.goBack();
  }

  return (
    <View style={styles.containerBtn}>
      <LinearGradient
        start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} colors={['#FF3D00', '#FFB800']}
        style={styles.gradient}
      />
      <View style={styles.buttonOverlay}>
        {
          noGoBack !== undefined ?
            <View>
              <Text></Text>
            </View> :
            <TouchableOpacity style={{ justifyContent: "center", display: "flex", flexDirection: "row", alignItems: "center" }}
              onPress={goBack}
            >
              <Image
                source={require("../assets/arrow_back_ios.png")}
                style={{ width: 24, height: 24 }}
              />
              <Text style={{ fontWeight: '600', fontSize: 12, lineHeight: 14, color: "white", }}>Volver</Text>
            </TouchableOpacity>
        }
        <TouchableOpacity style={{ display: "flex", flexDirection: "row", alignItems: "center", paddingRight: "3%" }}>
          <Text style={{ fontWeight: '600', fontSize: 14, lineHeight: 17, color: "white", marginRight: "3%" }}>{children}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={{ justifyContent: "center" }} onPress={openDrawer}>
          <Image
            source={require("../assets/menuHmb.png")}
            style={{ width: 24, height: 24 }}
          />
        </TouchableOpacity>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  containerBtn: {
    height: Height * 6 / 100,
    width: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  buttonOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    justifyContent: 'space-around',
    flexDirection: "row",
  },
  gradient: {
    flex: 1,
    width: "100%"
  },
})