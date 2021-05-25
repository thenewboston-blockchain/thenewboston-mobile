import {
    StyleSheet,
    Platform
  } from "react-native";

const Style = StyleSheet.create({
    buttonItem: {
      borderRadius: 50,
      alignItems: "center",
      justifyContent: "center",
    },
    activeButton: {
      marginLeft: 8,
      borderRadius: 50,
    },
    container: {
      flexDirection: "row",
      alignItems: "center",
      height: 32,
      paddingHorizontal: 12,
    },
    text: {
      fontSize: 15,
      fontWeight: "400",
      lineHeight: 18,
      color: "#999999",
      ...Platform.select({ web: { textOverflow: "clip" }, default: {} }),
    },
    textActive: {
      color: "#FF9D5C",
    },
    listItemStyle:{
        borderWidth: 1,
        borderStyle: "dashed",
        borderColor: "white",
        borderTopColor: "white",
        borderRadius: 500,
        height: 56,
        width: 56,
        alignItems: "center",
        justifyContent: "center",
    }
  });
  
  
export default Style