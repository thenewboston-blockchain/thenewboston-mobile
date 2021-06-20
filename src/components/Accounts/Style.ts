import {
    StyleSheet,
    Dimensions,
  } from "react-native";
const ACCOUNTS_ICON_WIDTH = 44;
const ACCOUNTS_BUTTON_WIDTH = 130;
const SCREEN_WIDTH = Dimensions.get("screen").width;

const Style = StyleSheet.create({
    button: {
      marginLeft: 15,
      borderRadius: 500,
    },
    container: {
      width: SCREEN_WIDTH,
      flexDirection: "row",
      paddingTop: 10,
      alignItems:'center',
      justifyContent:'space-evenly'
    },
    stickyItem: {
      position: "absolute",
      zIndex: 1,
      right: 10,
      paddingRight: 8,
      backgroundColor: "transparent",
    },
    stickyItemMask: {
      minWidth: ACCOUNTS_ICON_WIDTH,
      marginLeft: -8,
      borderRadius: 8,
      overflow: "hidden",
      paddingTop: 5,
    },
    scrollView: {
      marginLeft: 10,
      height: 80,
    },
    scrollViewContent: {
      paddingRight: 10,
      paddingBottom: 13,
    },
    dropDownIcon: {
      marginRight: 6,
    },
    activeButton: {
      marginLeft: 8,
      borderRadius: 50,
    },
  });
  
  
export default Style