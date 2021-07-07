import { StyleSheet } from "react-native";
import { Custom, Typography, Colors } from "styles";

const Styles = StyleSheet.create({
  container: {
    paddingVertical: "10%",
  },
  formView: {
    marginTop: "10%",
    alignItems: "center",
    width: "100%",
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
  inputContainerStyle: {
    borderWidth: 0.3,
    paddingHorizontal: 10,
    backgroundColor: "#1E323A",
    borderColor: "#62737E",
    borderRadius: 12,
    zIndex: 1,
    height: 81,
    textAlign: "center",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 20,
  },
  inputStyle: {
    fontSize: 32,
    textAlign: "center",
    color: "#FFF",
  },
  absolute: {
    position: "absolute",
    top: 0,
    left: 0,
    bottom: 0,
    right: 0
  },
  doInofContainer:{
    height: '38%',
    width:'80%', 
    marginLeft:'10%',
    marginRight:'10%',
    marginTop: 'auto',
    marginBottom:'auto',
    borderRadius:30, 
    backgroundColor:'linear-gradient(20.23deg, rgba(29, 39, 49, 0.9) -4.86%, rgba(53, 96, 104, 0.9) 114.68%)',
    overflow: 'hidden',
    padding:15,  
    borderColor: 'rgba(53, 96, 104, 0.9)',
    borderWidth: 1,
  },
  bottomArea: {
    backgroundColor: "transparent", 
    borderColor: "#1E323A",
    marginTop: 2,
    height: 30,
    justifyContent: "flex-start",
    paddingHorizontal: 20,
  },
  balanceContainer: {
    alignItems: "center",
    justifyContent: "center",
  },
  balanceHeading: {
    color: "#62737E",
    margin: 5,
    fontWeight: "bold",
  },
  horizontalLine: {
    marginVertical: 20,
    backgroundColor: "#557E99",
    height: 0.3,
    width: "100%",
  },
  innerText: {
    fontWeight: "500",
    color: "#FFF",
  },
  alignRight: {
    position: "absolute",
    bottom: 0,
    right: 0,
    color: "#62737E",
  },
});

export default Styles;
