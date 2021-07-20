import { StyleSheet } from "react-native";
import { Typography } from "styles";

const Styles = StyleSheet.create({
  container: { 
    height:'100%',
    paddingBottom:'5%'
  },
  centerText: {
    flex: 1,
    fontSize: 18,
    padding: 32,
    color: '#777'
  },
  textBold: {
    fontWeight: '500',
    color: '#000'
  },
  buttonText: {
    fontSize: 21,
    color: 'rgb(0,122,255)'
  },
  buttonTouchable: {
    padding: 16
  },
  cameraRatioBackground:{
     
    width: 100,
    height: 40,
    alignSelf:'center',
    justifyContent:'center',
    alignItems:'center'
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
  doModalContainer:{
    height: '60%',
    width:'94%', 
    marginLeft:'3%',
    marginRight:'3%',
    marginTop: 'auto',
    marginBottom:'auto',
    borderRadius:50, 
    backgroundColor:'linear-gradient(20.23deg, rgba(29, 39, 49, 0.9) -4.86%, rgba(53, 96, 104, 0.9) 114.68%)',
    overflow: 'hidden',
    padding:15,  
    borderColor: 'rgba(53, 96, 104, 0.9)',
    borderWidth: 1,
  },
});

export default Styles;
