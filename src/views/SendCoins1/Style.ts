import { StyleSheet } from "react-native";
import { Custom, Typography, Colors } from "styles";

const Styles = StyleSheet.create({
  container: {
    paddingVertical: "10%",
  },
  formView: {
    // marginTop: "10%",
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
  buttonContainerStyle:{
    borderWidth: 0.3,
    paddingHorizontal: 10,
    backgroundColor: "#1E323A",
    borderColor: "#62737E",
    borderRadius: 12,
    zIndex: 1,
    height: 55,
    marginBottom: 20,  
  },
  menuItemTextStyle:{  
    fontSize: 14,
    color:'white',
    fontWeight:'200', 
  },
  placeholderTextStyle:{  
    fontSize: 15,
    color:'white',
    fontWeight:'200',
    left:-10,
  },
  menuBarContainerStyle:{  
    borderWidth: 0.3,
    backgroundColor: "#1E323A",
    borderColor: "#62737E",
    borderRadius: 12,
    top:-18,
    marginBottom: 10,
  },
});

export default Styles;
