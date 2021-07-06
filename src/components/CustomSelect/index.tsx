import React, { useState } from "react";
import { View, StyleSheet, Text} from "react-native";
import RNPickerSelect from "react-native-picker-select";
import { Colors } from "../../styles";
import Style from "./Style";
import ArrowUp from "../../assets/svg/ArrowUp.svg";
import ArrowDown from "../../assets/svg/ArrowDown.svg";

type SelectProps = {
  options: any;
  selected: any;
  updateSelected: any;
  customStyle: any;
  placeholder: any;
  required: boolean;
};

const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
      fontSize: 16,
      paddingVertical: 12,
      paddingHorizontal: 10,
      borderWidth: 1,
      borderColor: 'gray',
      borderRadius: 4,
      color: 'white',
      paddingRight: 30, // to ensure the text is never behind the icon
  },
  inputAndroid: {
      fontSize: 16,
      paddingHorizontal: 10,
      paddingVertical: 8,
      borderWidth: 0.5,
      borderColor: 'gray',
      borderRadius: 8,
      color: 'white',
      paddingRight: 30, // to ensure the text is never behind the icon 
      
  }, 
  });

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
      <View style={Style.containerStyles}> 
        <RNPickerSelect
          value={selected}
          fixAndroidTouchableBug={true} 
          placeholder={placeholder} 
          onValueChange={(itemValue, itemIndex) => updateSelected(itemValue)}
          items={options}
          style={pickerSelectStyles}  
          Icon={() =>(
            <View style={{ 
              alignItems: "center",
              justifyContent: "center",
              marginTop:23,
              marginRight: 10,
              }}>
              <ArrowDown/>
            </View>
            
          ) 
          }
        > 
        </RNPickerSelect> 
        
      </View>
      
    </View>
  );
};


export default CustomSelect;
