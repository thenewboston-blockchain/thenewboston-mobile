import { Colors, Typography } from "styles";

import { StyleSheet } from "react-native";

const Styles = StyleSheet.create({
  container: {
    // paddingVertical: "10%",
    flex:1,
  },
  balanceContainer: {
    marginTop: 10,
  },
  heading: {
    fontSize: Typography.FONT_SIZE_28,
    fontWeight: Typography.FONT_WEIGHT_BOLD,
    color: Colors.WHITE,
  },
  subHeading: {
    fontSize: 12,
    color: "#62737E",
    marginBottom: 10,
    fontWeight: "bold",
  },
  refreshbutton: {
    position: "absolute",
    bottom: 0,
    right: 0,
  },
  deleteButton: {
    backgroundColor: "transparent",
    borderWidth: 1,
    borderColor: "#1E323A",
    marginTop: 2,
    height: 60,
    justifyContent: "flex-start",
    paddingHorizontal: 20,
  },
  bottomArea: {
    backgroundColor: "transparent", 
    marginTop: 2,
    height: 60,
    justifyContent: "flex-start",
    paddingHorizontal: 20,
  },
  modalContainer:{
    height: '75%',
    marginTop: 'auto',
    borderTopRightRadius:50,
    borderTopLeftRadius:50,
    backgroundColor:'#1D2731',
    overflow: 'hidden',
    padding:15
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
  
  header: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerText: {
    color: 'black',
    fontSize: 18,
    padding: 26,
  },
  absolute: {
    position: "absolute",
    top: 0,
    left: 0,
    bottom: 0,
    right: 0
  },
  noteHeader: {
    backgroundColor: '#42f5aa',
    alignItems: 'center',
    justifyContent: 'center',
    borderTopLeftRadius: 50,
    borderTopRightRadius: 50,
  },
  footer: {
    flex: 1,
    backgroundColor: '#ddd',
    bottom: 0,
    left: 0,
    right: 0,
    zIndex: 10,
  },
  addButton: {
    position: 'absolute',
    zIndex: 11,
    right: 20,
    bottom: 90,
    backgroundColor: '#98B3B7',
    width: 70,
    height: 70,
    borderRadius: 35,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 8,
  },
  addButtonText: {
    color: '#fff',
    fontSize: 18,
  },
  actions: {
    right: 0,
    position: "absolute",
  },
  actionContainer: {
    alignItems: "center",
  },
  numberText: {
    fontSize: 16,
    color: "#63737E",
    // fontWeight: "bold",
  },

});

export default Styles;
