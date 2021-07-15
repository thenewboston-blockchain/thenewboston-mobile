// @flow
import React from "react";
import {
  Text,
  View,
  TouchableOpacity,
  TouchableHighlight,
  Platform,
  Share,  
} from "react-native";
import Clipboard from '@react-native-community/clipboard'
import { Avatar } from "react-native-elements";
import { Custom } from "../../styles";
import Style from "./Style"; 

// svg
import Shares from "../../assets/svg/Share.svg";
import Copy from "../../assets/svg/Copy.svg";

interface AccountNumberProps {
  navigator: any;
  accountNumber: string;
} 

const AccountNumber = ({ navigator, accountNumber }: AccountNumberProps) => {

  const onShare = async () => {
    try {
      const result = await Share.share({
        message: accountNumber,
      });
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
        } else {
          // shared
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
      }
    } catch (error) {
      alert(error.message);
    }
  };

  const copyToClipboard = () => {
    Clipboard.setString(accountNumber)
  }

  return (
    <View style={Style.container}>
      <View style={[Custom.row,Style.actionContainer]}>
        <Text style={Style.subHeading}>MY ACCOUNT NUMBER</Text>
        <View style={[Custom.row, Style.actions]}>
          <TouchableOpacity style={{ marginRight: 10 }} onPress={onShare}>
            <Shares />
          </TouchableOpacity>
          <TouchableOpacity onPress={copyToClipboard}>
            <Copy />
          </TouchableOpacity>
        </View>
      </View>
      <Text style={[Custom.mt10,Style.numberText]}>{accountNumber}</Text>
    </View>
  );
};

export default AccountNumber;
