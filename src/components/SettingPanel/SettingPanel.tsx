// @flow
import React from "react";
import {
  Text,
  View,
  TouchableOpacity,
  TouchableHighlight,
  Platform,
} from "react-native"; 
import { Custom } from "../../styles";
import Style from "./Style";

// svg 
import Vector from "../../assets/svg/Vector.svg";
import ManUser from "../../assets/svg/man-user.svg";
import Circle from "../../assets/svg/man-circle.svg";


interface SettingPanelProps {
  nickname: string;
  onEditAccount: Function;
}

const SettingPanel = ({ nickname, onEditAccount}: SettingPanelProps) => { 

  return (
    <View style={Style.container}>
       <View style={Style.actionContainer}>
       
        <View  style={Style.manuser}> 
            <Circle />
        </View>
        <View  style={Style.subText}>
          <Text style={Style.subHeading}>Your nickname</Text>
          <Text style={Style.numberText}>{nickname}</Text> 
        </View>
          
        <View style={Style.actions}> 
          <TouchableOpacity onPress={() => onEditAccount()}>
            <Vector />
          </TouchableOpacity>
        </View>
      </View>
      
    </View>
  );
};

export default SettingPanel;
