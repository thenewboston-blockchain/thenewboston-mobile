import { Text, TouchableOpacity, View } from 'react-native';

import Avatar from "../../assets/svg/Avatar.svg";
import { Colors } from '../../styles';
import CustomButton from '../../components/CustomButton';
import Edit from "../../assets/svg/Edit.svg";
import React from 'react';
import Style from './Style'

interface settings {
  navigation: any
}

const SettingsScreen = ({ navigation }:settings) => {

  const handleExit = () => {
    console.log("Exit App");
  };
  const goToEditAccount = () => {
    navigation.navigate("editAccount");
  };
    return (
      <View>
        <View style={{ alignItems: "center" }}>
          <Text style={Style.heading}>Settings</Text>
        </View>
        <View style={Style.body}>
          <View style={Style.myAccount}>
            <View style={Style.avatarName}>
              <Avatar />
              <View style={Style.nameGroup}>
                <Text style={Style.nickname}>Your nickname</Text>
                <Text style={Style.accountName}>John Doe</Text>
              </View>
            </View>
            <TouchableOpacity onPress={goToEditAccount}>
              <Edit />
            </TouchableOpacity>
          </View>
          <View style={Style.containExit}>
            <CustomButton
              title="Exit"
              onPress={handleExit}
              buttonColor={Colors.WHITE}
              loading={false}
              customStyle={Style.exit}
            />
          </View>
        </View>
        </View>
    );
};
 
export default SettingsScreen