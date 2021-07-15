import { StyleSheet } from "react-native";
import { Typography } from "../../../styles";

const Styles = StyleSheet.create({
  container: {
    paddingVertical: "0%",  
  },
  formView: { 
    alignItems: "center",
    width:'100%' 
  },  
  heading: {
    marginTop: "6%",
    fontSize: Typography.FONT_SIZE_28,
    fontWeight: Typography.FONT_WEIGHT_BOLD,
    textAlign: "center",
  },
  message: { 
    marginTop: "6%",
    marginBottom: '3%',
    fontSize: Typography.FONT_SIZE_12, 
    textAlign: "center",
    justifyContent: 'center',
    width: '90%'
  },
  subName: {
    color: "#FFF",
    fontSize: Typography.FONT_SIZE_12,
    fontWeight: "bold",  
    alignSelf: "flex-start",
    marginTop:7,
  },
  subHeading: {
    color: "#62737E",
    fontSize: 11,
    alignSelf: "flex-start",
    fontWeight: "bold",
    marginTop:3,
  },
  contentView:{   
    paddingVertical: 20, 
    paddingHorizontal: 10,
    flexDirection:'row',   
    width:'90%', 
    borderBottomWidth:1,
    borderBottomColor:"#62737E"
  },
  buttonView:{   
    flexDirection:'row',   
    width:'80%', 
  },
  yesButton: {   
    fontSize: Typography.FONT_SIZE_12,  
    alignItems: 'center',
    justifyContent: 'center',   
    width:'80%',
    marginLeft: 0, 
    backgroundColor: "transparent",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.5)",
  },
  noButton: {   
    fontSize: Typography.FONT_SIZE_12,  
    alignItems: 'center',
    justifyContent: 'center',  
    width:'80%', 
    marginLeft: '20%',  
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
