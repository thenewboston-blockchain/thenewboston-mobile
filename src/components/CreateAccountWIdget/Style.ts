import { Colors, Custom, Typography } from "styles";

import { StyleSheet } from "react-native";
import { padding } from "styles/mixins";

const Styles = StyleSheet.create({
  container: {
    paddingVertical: "5%",
  },
  formView: {
    marginTop: "4%",
    alignItems: "center",
    width:"100%",
  },
  heading: {
    fontSize: Typography.FONT_SIZE_28,
    fontWeight: Typography.FONT_WEIGHT_BOLD,
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
  labelStyle: {
    textTransform: "uppercase",
    color: "#62737E",
    zIndex: 100,
    fontWeight: "bold",
    fontSize: 10,
    },
    switch: {
        width: "100%",
        // flex: 1,
        flexDirection: "row",
        justifyContent: "space-between",
        padding: 10,
        borderWidth: 1,
        borderColor: "#2B4150",
        borderRadius: 12,
        marginTop: 40,
        marginBottom: 40,
        alignItems:"center"
    },
    active: {
        color: "#fff",
        backgroundColor: "#1D2731",
        padding: 10,
        borderRadius: 9,
        width: "50%",
        textAlign: "center",
    },
    inactive: {
        color: "#62737E",
        width: "50%",
        textAlign: "center"
    }
});

export default Styles;