import { Button } from "react-native-elements";
import { Colors } from "../../styles";
import React from "react";
import Style from "./Style";
import { View, Text} from "react-native";
import { TouchableOpacity, TouchableWithoutFeedback } from "react-native-gesture-handler";

type SelectProps = {
  title: any;
  buttonType?: any;
  buttonColor?: any;
  buttonStyle?: any;
  customStyle?: any;
  containerStyle?: any;
  onPress: Function;
  disabled?: boolean;
  isDisable?: boolean;
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
  isDisable,
  loading,
  ...rest
}: SelectProps) => (
  // <TouchableOpacity 
  //   onPress={()=>onPress()} 
  //   disabled = {isDisable} 
  //   containerStyle={Style.containerStyle} 
  //   style ={[Style.buttonStyle, customStyle]}
  //   activeOpacity={0.95}>
  //  <Text style={{fontSize: 16, fontFamily: "Inter-Regular", color: buttonColor}}>
  //  {title}
  //  </Text>
  // </TouchableOpacity>
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
    disabled = {isDisable}
    loading={loading}
    onPress={()=>onPress()}
  />
);

export default CustomButton;
