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
import Visible from "../../assets/svg/Visible.svg";
import Copy from "../../assets/svg/Copy.svg";
import Download from "../../assets/svg/Download.svg";

interface SignKeyProps {
  signKey: string;
}

const SignKey = ({ signKey }: SignKeyProps) => {
  return (
    <View style={Style.container}>
      <View style={[Custom.row, Style.actionContainer]}>
        <Text style={Style.subHeading}>MY SIGN KEY</Text>
        <View style={[Custom.row, Style.actions]}>
          <TouchableOpacity style={{ marginRight: 10 }}>
            <Download />
          </TouchableOpacity>
          <TouchableOpacity style={{ marginRight: 10 }}>
            <Visible />
          </TouchableOpacity>
          <TouchableOpacity>
            <Copy />
          </TouchableOpacity>
        </View>
      </View>
      <Text style={[Custom.mt10, Style.numberText]}>{signKey}</Text>
    </View>
  );
};

export default SignKey;
