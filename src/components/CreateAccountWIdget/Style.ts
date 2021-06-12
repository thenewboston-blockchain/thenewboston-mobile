import { Colors, Custom, Typography } from "styles";

import { StyleSheet } from "react-native";

const Styles = StyleSheet.create({
  container: {
    paddingVertical: "10%",
  },
  formView: {
    marginTop: "10%",
    alignItems: "center",
    width:"100%"
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
    switch: {
        width: "100%",
        flex: 1,
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