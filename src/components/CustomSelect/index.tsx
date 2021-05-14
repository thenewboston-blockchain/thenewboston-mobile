import React, { useState } from "react";
import { View, StyleSheet, Text } from "react-native";
import RNPickerSelect from "react-native-picker-select";
import { Colors } from "../../styles";
import Style from "./Style";

type SelectProps = {
  options: any;
  selected: any;
  updateSelected: any;
  customStyle: any;
  placeholder: any;
  required: boolean;
};

const CustomSelect = ({
  options,
  selected,
  updateSelected,
  customStyle,
  placeholder,
  required = false,
  ...rest
}: SelectProps) => {
  return (
    <View style={{ flex: 1, flexDirection: "row" }}>
      <View style={{ flex: 1 }}>
        <RNPickerSelect
          value={selected}
          fixAndroidTouchableBug={true}
          placeholder={placeholder}
          useNativeAndroidPickerStyle={true}
          style={Style}
          onValueChange={(itemValue, itemIndex) => updateSelected(itemValue)}
          items={options}
        />
      </View>
    </View>
  );
};


export default CustomSelect;
