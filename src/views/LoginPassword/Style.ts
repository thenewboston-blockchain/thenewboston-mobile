import { StyleSheet } from "react-native";
import { Custom, Typography, Colors } from "styles";

const Styles = StyleSheet.create({
  container: {
    paddingVertical: "10%",
  },
  formView: {
    marginTop: "10%",
    alignItems: "center",
    width:'100%'
  },
  heading: {
    fontSize: Typography.FONT_SIZE_28,
    fontWeight: Typography.FONT_WEIGHT_BOLD,
  },
  labelStyle: {
    textTransform: "uppercase",
    color: "#62737E",
    zIndex: 100,
    fontWeight: "bold",
    fontSize: 10,
  },
  customStyle:{
    borderWidth: 0.3,
    paddingHorizontal: 10,
    backgroundColor: "#1E323A",
    borderColor: "#62737E",
    borderRadius: 12,
    zIndex: 1,
    height: 70,
    marginBottom: 20,
  },
});

export default Styles;
