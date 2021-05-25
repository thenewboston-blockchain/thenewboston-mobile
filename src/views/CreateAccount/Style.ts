import { StyleSheet } from "react-native";
import { Typography } from "../../styles";

const Styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  formView: {
    marginTop: "10%",
    alignItems: "center",
    width:'100%'
  },
  heading: {
    fontSize: Typography.FONT_SIZE_28,
    fontWeight: Typography.FONT_WEIGHT_BOLD,
    textAlign: "center",
  },
  labelStyle: {
    textTransform: "uppercase",
    color: "#62737E",
    zIndex: 100,
    fontWeight: "bold",
    fontSize: 10,
  }
});

export default Styles;