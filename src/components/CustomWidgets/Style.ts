import { StyleSheet } from "react-native";
import { Typography } from "styles";

const Styles = StyleSheet.create({
  container: {
    paddingVertical: "10%", 
  },
  formView: { 
    alignItems: "center",
    width:'100%' 
  }, 
  heading: {
    marginTop: "4%",
    fontSize: Typography.FONT_SIZE_28,
    fontWeight: Typography.FONT_WEIGHT_BOLD,
    textAlign: "center",
  },
  message: { 
    marginTop: "5%",
    fontSize: Typography.FONT_SIZE_12, 
    textAlign: "center",
    justifyContent: 'center',
    width: '90%'
  },
  button: { 
    fontSize: Typography.FONT_SIZE_14,  
    alignItems: 'center',
    justifyContent: 'center',
    width: '40%', 
    marginLeft: '30%',
    marginRight: '30%',
    marginTop: "12%",
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
