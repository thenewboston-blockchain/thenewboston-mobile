import React, { ReactElement } from "react";

import { FloatingLabelInput } from "react-native-floating-label-input";
import Style from "./Style";

type InputProps = {
  staticLabel?: boolean;
  labelText: string;
  onChangeText: any;
  autoCapitalize: string;
  value: any;
  name: any;
  isPassword?: boolean;
  customStyles?: any;
  customInputStyle?: any;
  keyboardType?:any; 
  numberOfLines?:number;
  multiline?:boolean;
};

const CustomInput = ({
  staticLabel,
  labelText,
  onChangeText,
  value,
  isPassword,
  customStyles,
  customInputStyle,
  keyboardType,
  numberOfLines,
  multiline,
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
      keyboardType={keyboardType}  
      numberOfLines={numberOfLines ? numberOfLines : 1}
      multiline={multiline ? multiline : false}
    />
  );
};

export default CustomInput;
