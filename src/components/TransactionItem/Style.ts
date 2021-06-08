import { Colors } from "styles";
import { StyleSheet } from "react-native";

const Style = StyleSheet.create({
  container: {
    backgroundColor: "transparent",
    paddingVertical: 15,
  },
  dateContainer: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    backgroundColor: "#62737E",
    borderRadius: 99,
    alignSelf: "flex-start",
    fontWeight: "bold",
    marginVertical: 12,
  },
  dateText: {
    color: Colors.WHITE,
    fontSize: 11,
  },
  transactionContent: {
    flexDirection: "row",
    paddingVertical: 10,
    flex: 1,
    paddingHorizontal: 10,
  },
  openContent: {
    backgroundColor: "#1D2731",
    borderTopColor: "#2B4150",
    borderBottomColor: "#2B4150",
    borderBottomWidth: 1,
    borderTopWidth: 1,
  },
  subHeading: {
    color: "#62737E",
    fontSize: 10,
    alignSelf: "flex-start",
    fontWeight: "bold",
  },
  heading: {
    color: "#FFF",
    fontSize: 14,
    fontWeight: "bold",
  },
  detailsContainer: {
    paddingHorizontal: 10,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#1D2731",
  },
});

export default Style;
