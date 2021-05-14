import React from "react";
import { View, Text, StyleSheet } from "react-native";
import Style from "./Style";

type errorMessageProps = {
  errorValue: any;
};
const ErrorMessage = ({ errorValue }: errorMessageProps) => (
  <View>
    <Text style={Style.errorText}>{errorValue}</Text>
  </View>
);

export default ErrorMessage;
