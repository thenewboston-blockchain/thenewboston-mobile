import React, { ReactElement } from "react";

import { FloatingLabelInput } from "react-native-floating-label-input";
import Style from "./Style";

type InputProps = {
  staticLabel?: boolean;
  labelText: string;
  onChangeText: any;
  onTogglePassword?: any;
  autoCapitalize: string;
  value: any;
  name: any;
  isPassword?: boolean;
  customStyles?: any;
  customInputStyle?: any;
  keyboardType?:any; 
  numberOfLines?:number;
  multiline?:boolean;
  labelCenter?:boolean;
};

const CustomInput = ({
  staticLabel,
  labelText,
  onChangeText,
  onTogglePassword,
  value,
  isPassword,
  customStyles,
  customInputStyle,
  keyboardType,
  numberOfLines,
  multiline,
  labelCenter,
}: InputProps) => {
  return (
    <FloatingLabelInput
      label={labelText}
      value={value}
      staticLabel={staticLabel}
      labelStyles={Style.labelStyles}
      containerStyles={customStyles ? customStyles : Style.containerStyles}
      customLabelStyles={{
        colorFocused: "#62737E",
        fontSizeFocused: 10,   
      }}
      inputStyles={customInputStyle ? customInputStyle : Style.inputStyles}
      onChangeText={onChangeText}
      isPassword={isPassword} 
      onTogglePassword={onTogglePassword}
      keyboardType={keyboardType}  
      numberOfLines={numberOfLines ? numberOfLines : 1}
      multiline={multiline ? multiline : false} 
    />
  );
};

export default CustomInput;
