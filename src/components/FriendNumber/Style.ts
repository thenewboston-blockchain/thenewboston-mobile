import { StyleSheet } from "react-native";

const Style = StyleSheet.create({
  container: {
    borderRadius: 16,
    backgroundColor: "#1D2731",
    marginBottom: 15,
    borderWidth: 1,
    borderColor: "#62737E",
    padding: 15,
  },
  subHeading: {
    fontSize: 12,
    color: "#62737E",
    fontWeight: "bold",
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

export default Style;
