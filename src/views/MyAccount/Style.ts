import { Colors, Typography } from "styles";

import { StyleSheet } from "react-native";

const Styles = StyleSheet.create({
  container: {
    // paddingVertical: "10%",
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
    height: 50,
    justifyContent: "flex-start",
    paddingHorizontal: 20,
  },
});

export default Styles;
