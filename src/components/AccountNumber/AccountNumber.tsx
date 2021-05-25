// @flow
import React from "react";
import {
  Text,
  View,
  TouchableOpacity,
  TouchableHighlight,
  Platform,
} from "react-native";
import { Avatar } from "react-native-elements";
import { Custom } from "../../styles";
import Style from "./Style";

// svg
import Share from "../../assets/svg/Share.svg";
import Copy from "../../assets/svg/Copy.svg";

interface AccountNumberProps {
  accountNumber: string;
}

const AccountNumber = ({ accountNumber }: AccountNumberProps) => {
  return (
    <View style={Style.container}>
      <View style={[Custom.row,Style.actionContainer]}>
        <Text style={Style.subHeading}>MY ACCOUNT NUMBER</Text>
        <View style={[Custom.row, Style.actions]}>
          <TouchableOpacity style={{ marginRight: 10 }}>
            <Share />
          </TouchableOpacity>
          <TouchableOpacity>
            <Copy />
          </TouchableOpacity>
        </View>
      </View>
      <Text style={[Custom.mt10,Style.numberText]}>{accountNumber}</Text>
    </View>
  );
};

export default AccountNumber;
