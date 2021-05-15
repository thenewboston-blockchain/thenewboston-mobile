import { Button } from "react-native-elements";
import { Colors } from "../../styles";
import React from "react";
import Style from "./Style";
import { View } from "react-native";

type SelectProps = {
  title: any;
  buttonType?: any;
  buttonColor?: any;
  buttonStyle?: any;
  customStyle?: any;
  containerStyle?: any;
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
