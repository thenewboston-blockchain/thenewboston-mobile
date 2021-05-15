import React, { ReactElement } from "react";

import { FloatingLabelInput } from "react-native-floating-label-input";
import Style from './Style'

type InputProps = {
  staticLabel?: boolean;
  labelText: string;
  onChangeText: any;
  autoCapitalize: string;
  value: any;
  name: any;
  isPassword?:boolean;
};

const CustomInput = ({
  staticLabel,
  labelText,
  onChangeText,
  value,
  isPassword
}: InputProps) => {
  return (
    <FloatingLabelInput
      label={labelText}
      value={value}
      staticLabel={staticLabel}
      labelStyles={Style.labelStyles}
      containerStyles={Style.containerStyles}
      customLabelStyles={{
        colorFocused: "#62737E",
        fontSizeFocused: 10,
      }}
      inputStyles={Style.inputStyles}
      onChangeText={onChangeText}
      isPassword={isPassword}
    />
  );
};

export default CustomInput;
