import { StyleSheet } from "react-native";

const Style = StyleSheet.create({
  container: {
    borderRadius: 16,
    backgroundColor: "#1D2731",
    marginBottom: 15,
    borderWidth: 2,
    borderColor: 'rgba(43, 65, 80, 0.99)',    
    padding: 15,
    width:'100%'
  },
  manuser: { 
    flex: 0.2,
    alignItems: "center",  
  },
  subText: { 
    flex: 0.7,
    bottom: 0,
    paddingLeft: 12,
    paddingRight:12, 
  }, 
  subHeading: {
    fontSize: 15,
    color: "#62737E",
    fontWeight:"600",
  },
  actions: {
    right: 0,
    flex: 0.1,  
  },
  actionContainer: {
    flexDirection:'row',
    flex: 1,
    alignItems: "center", 
  },
  numberText: {
    fontSize: 18,
    fontWeight:"600",
    color: "white",
    marginTop:3,
    // fontWeight: "bold",
  },
});

export default Style;
