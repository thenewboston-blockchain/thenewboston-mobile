import React from "react";
import { Button } from "react-native-elements";
import { View } from "react-native";
import Style from "./Style";
import { Colors } from "../../styles";

type SelectProps = {
  title: any;
  buttonType: any;
  buttonColor: any;
  buttonStyle: any;
  customStyle: any;
  containerStyle: any;
  onPress: Function;
  disabled: boolean;
  loading: boolean;
};

const CustomButton = ({
  title,
  buttonType,
  buttonColor,
  buttonStyle,
  customStyle,
  containerStyle,
  onPress,
  disabled,
  loading,
  ...rest
}: SelectProps) => (
  <Button
    {...rest}
    type={buttonType}
    title={title}
    titleStyle={{
      color: buttonColor,
      fontSize: 16,
      fontFamily: "Inter-Regular",
    }}
    buttonStyle={[Style.buttonStyle, customStyle]}
    loadingProps={{ color: Colors.WHITE }}
    containerStyle={Style.containerStyle}
    // disabled={disabled}
    loading={loading}
    onPress={()=>onPress()}
  />
);

export default CustomButton;
