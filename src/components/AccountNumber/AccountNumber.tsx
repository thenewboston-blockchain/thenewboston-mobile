import {
  Platform,
  Text,
  TouchableHighlight,
  TouchableOpacity,
  View,
} from "react-native";

import { Avatar } from "react-native-elements";
import { Custom } from "../../styles";
import React from "react";
import Style from "./Style";

interface AccountNumberProps {
  accountNumber: string;
  title: string
  icons: any
}

const AccountNumber = ({ accountNumber, title, icons }: AccountNumberProps) => {
  const Icons = () => {
    //TODO specify action via props
    return icons.map((icon: any, index: number) => {
      return (
        <TouchableOpacity style={{ marginRight: 10 }} key={index}>
        {icon}
        </TouchableOpacity>)
      
    })
  }
  return (
    <View style={Style.container}>
      <View style={[Custom.row,Style.actionContainer]}>
        <Text style={Style.subHeading}>{ title}</Text>
        <View style={[Custom.row, Style.actions]}>
          <Icons/>
        </View>
      </View>
      <Text style={[Custom.mt10,Style.numberText]}>{accountNumber}</Text>
    </View>
  );
};

export default AccountNumber;

//TODO: rename to panel
