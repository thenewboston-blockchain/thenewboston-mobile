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
  activeAccountHeading: {
    fontSize: Typography.FONT_SIZE_24,
    fontWeight: Typography.FONT_WEIGHT_BOLD,
    color: Colors.WHITE,
    textAlign: 'left',
    marginVertical:20
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
  acountNumber: {
    marginVertical:20
  },
});

export default Styles;