// @flow
import React, {useState} from "react";
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
import Clipboard from '@react-native-community/clipboard';
import RNFS from 'react-native-fs';

// svg
import Visible from "../../assets/svg/Visible.svg";
import HideVisible from "../../assets/imgs/visible_hide.png";


import Copy from "../../assets/svg/Copy.svg";
import Download from "../../assets/svg/Download.svg";

interface SignKeyProps {
  signKey: string;
  writeKeyFunc?: Function;
} 
  

const SignKey = ({ signKey, writeKeyFunc}: SignKeyProps) => {

  const [secVisible, setSecVisible] = useState(true);    
  var secKey = "";
  for(var i = 0; i < signKey.length; i++){
    secKey = secKey + "*";
  }

  const copyToClipboard = () => {
    Clipboard.setString(signKey)
  }
 
  const writeKeyFile = () =>{
    var path = 'mnt/sdcard/download/sginKey.txt';
    if (Platform.OS === 'ios') {
      path = RNFS.DocumentDirectoryPath + '/sginKey.txt';
    } 
    RNFS.writeFile(path, signKey, 'utf8')
      .then((success) => {
        writeKeyFunc('SignKey donwload success!') 
      })
      .catch((err) => { 
        writeKeyFunc(err.message) 
      });
  }

  const onVisiblePassword = () => {
    setSecVisible(!secVisible);
  }

  return (
    <View style={Style.container}>
      <View style={[Custom.row, Style.actionContainer]}>
        <Text style={Style.subHeading}>MY SIGN KEY</Text>
        <View style={[Custom.row, Style.actions]}>
          <TouchableOpacity style={{ marginRight: 10 }} onPress={writeKeyFile}>
            <Download />
          </TouchableOpacity>
          <TouchableOpacity style={{ marginRight: 10 }} onPress={onVisiblePassword}>
            <Visible />  
          </TouchableOpacity>
          <TouchableOpacity onPress={copyToClipboard}>
            <Copy />
          </TouchableOpacity>
        </View>
      </View>
      <View>
        {!secVisible && <Text style={[Custom.mt10, Style.numberText]}>{signKey}</Text>}
        {secVisible && <Text style={[Custom.mt10, Style.setcureText]}>{secKey}</Text>}
      </View>
     
    </View>
  );
};

export default SignKey;
